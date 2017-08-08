const generateCredential = (name, profileCredentials) => `[${name}]
${Object.keys(profileCredentials).map(credkey => `${credkey} = ${profileCredentials[credkey]}\n`).join('')}`;

module.exports = credentials => Object.keys(credentials)
  .reduce((lines, profile) => [
    ...lines,
    generateCredential(profile, credentials[profile]),
  ], [])
  .join('\n');
