const parseProfileName = profileName => profileName.match(/\[(.*)\]/)[1];
const parseAttribute = line => {
  const [ attributeKey, attributeValue ] = line.replace(/ /g,'').split('=');
  return { [attributeKey]: attributeValue };
};

module.exports = file => Object.assign({}, ...file
  .split('\n\n')
  .map(block => block.split('\n'))
  .filter(lines => Boolean(lines[0]))
  .map(lines => ({
    [parseProfileName(lines[0])]:
      Object.assign({}, ...lines.slice(1).map(attributeLine => attributeLine && parseAttribute(attributeLine)))
  })));
