const generateCredential = (name, aws_access_key_id, aws_secret_access_key, region, output) => (`[${name}]
aws_access_key_id = ${aws_access_key_id}
aws_secret_access_key = ${aws_secret_access_key}\n` +
(region ? `region = ${region}\n` : '') +
(output ? `output = ${output}\n` : ''));

module.exports = credentials => Object.keys(credentials)
  .reduce((lines, profile) => {
    const { aws_secret_access_key, aws_access_key_id, region, output } = credentials[profile];

    return [
      ...lines,
      generateCredential(profile, aws_access_key_id, aws_secret_access_key, region, output),
    ];
  }, [])
  .join('\n');
