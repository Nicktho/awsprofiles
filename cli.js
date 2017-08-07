#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const { prompt } = require('inquirer');

const parseCredentials = require('./lib/parseCredentials');
const generateCredentials = require('./lib/generateCredentials');

const cli = meow(`
  Usage
    $ awsprofiles <profile>

  Options
    --credentials, -c Path to your credentials file (default: ~/.aws/credentials)

  Examples
    $ awsprofiles
    $ awsprofiles prod
    $ awsprofiles dev
`, {
  alias: { c: 'credentials' },
  default: { credentials: path.join(os.homedir(), '.aws', 'credentials') },
});

updateNotifier({ pkg: cli.pkg }).notify();

const credentialsFile = cli.flags.credentials;

Promise.resolve()
  .then(() => {
    const credentials = parseCredentials(fs.readFileSync(credentialsFile, 'utf8'));

    if (!credentials.default) {
      throw new Error('No default profile is set');
    }

    const currentDefaultProfile = Object.keys(credentials).find(profile => profile !== 'default' && credentials[profile].aws_access_key_id === credentials.default.aws_access_key_id);

    if (!currentDefaultProfile) {
      throw new Error('Current default profile is not named in profile list, please check README.md for valid configuration');
    }

    const profiles = Object.keys(credentials).filter(profile => profile !== 'default' && profile !== currentDefaultProfile);

    if (cli.input.length > 0) {
      const input = cli.input[0];

      if (input !== currentDefaultProfile && !profiles.includes(input)) {
        throw new Error(`Profile ${chalk.magenta(input)} does not exist in ${chalk.magenta(credentialsFile)}`);
      }

      return {
        profile: input,
        credentials,
      };
    }

    console.log('');
    console.log(`Current AWS profile ${chalk.magenta(currentDefaultProfile)}`);
    console.log('');

    const choices = [{
      name: `${currentDefaultProfile} - (current default)`,
      value: currentDefaultProfile,
    }].concat(profiles);

    const prompts = [
      {
        type: 'list',
        name: 'profile',
        message: 'Select AWS profile',
        choices,
        validate: input => profiles.includes(input) || `Profile ${input} does not exist in ${chalk.magenta(credentialsFile)}`,
      },
    ];

    return prompt(prompts).then(({ profile }) => ({ profile, credentials }));
  })
  .then(({ profile, credentials }) => {
    const newCredentials = Object.assign({}, credentials, {
      default: credentials[profile],
    });

    fs.writeFileSync(credentialsFile, generateCredentials(newCredentials), 'utf8');

    return profile;
  })
  .then(profile => {
    console.log('');
    console.log(`🔑  Changed default profile to ${chalk.magenta(profile)} in ${chalk.magenta(credentialsFile)}`);
  })
  .catch(err => {
    console.log('');
    console.log(`❌  ${err}`);
  });

