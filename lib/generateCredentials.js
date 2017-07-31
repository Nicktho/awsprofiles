const generateCredential = (name, awsAccessKeyId, awsSecretAccessKey, region) => `[${name}]
aws_access_key_id = ${awsAccessKeyId}
aws_secret_access_key = ${awsSecretAccessKey}
${region ? `region = ${region}\n` : ''}`;

module.exports = credentials => Object.keys(credentials)
  .reduce((lines, profile) => {
    const { awsSecretAccessKey, awsAccessKeyId, region } = credentials[profile];

    return [
      ...lines,
      generateCredential(profile, awsAccessKeyId, awsSecretAccessKey, region),
    ];
  }, [])
  .join('\n');
