const parseProfileName = profileName => profileName.match(/\[(.*)\]/)[1];
const getValue = line => line.match(new RegExp('= (.*)'))[1];

module.exports = file => file
  .split('\n\n')
  .map(block => block.split('\n'))
  .filter(lines => Boolean(lines[0]))
  .reduce((credentials, lines) => lines ? Object.assign(credentials, {
      [parseProfileName(lines[0])]: Object.assign({
        awsAccessKeyId: getValue(lines[1]),
        awsSecretAccessKey: getValue(lines[2]),
      }, lines[3] ? { region: getValue(lines[3]) } : null)
    }) : credentials, {});
