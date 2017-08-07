const parseProfileName = profileName => profileName.match(/\[(.*)\]/)[1];
const parseAttribute = line => {
  const attributeKeyValue = line.replace(/ /g,'').split('=');
  return {[attributeKeyValue[0]]: attributeKeyValue[1]};
};

module.exports = file => Object.assign({}, ...file
  .split('\n\n')
  .map(block => block.split('\n'))
  .filter(lines => Boolean(lines[0]))
  .map(lines => ({
    [parseProfileName(lines[0])]: Object.assign({}, ...lines.slice(1).map(attributeLine => parseAttribute(attributeLine)))
  })));
