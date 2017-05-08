const generateCredential = (name, awsAccessKeyId, awsSecretAccessKey) => `[${name}]
aws_access_key_id = ${awsAccessKeyId}
aws_secret_access_key = ${awsSecretAccessKey}`;

module.exports = credentials => Object.keys(credentials)
  .reduce((lines, profile) => {
    const { awsSecretAccessKey, awsAccessKeyId } = credentials[profile];
   
    return [
      ...lines,
      generateCredential(profile, awsAccessKeyId, awsSecretAccessKey),
    ];
  }, [])
  .join('\n\n');
