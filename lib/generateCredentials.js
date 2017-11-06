const generateCredential = (name, profileCredentials) => [`[${name}]`]
  .concat(
    Object.keys(profileCredentials).map(credkey => `${credkey} = ${profileCredentials[credkey]}`)
  ).join('\n');

module.exports = credentials => Object.keys(credentials)
  .reduce((lines, profile) => [
    ...lines,
    generateCredential(profile, credentials[profile]),
  ], [])
  .join('\n\n');
