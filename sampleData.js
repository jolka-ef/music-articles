const fs = require('fs');
const yaml = require('js-yaml');


const content = yaml.safeLoad(fs.readFileSync('./content.yaml', 'utf-8'));
module.exports = content;