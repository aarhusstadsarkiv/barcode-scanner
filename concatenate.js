/**
 * Script to combine multiple JSON files into a single JSON file.
 */

const fs = require('fs');
const path = require('path');

const dir = './data';
const data = {};
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileData = JSON.parse(fileContent);
  Object.assign(data, fileData);
});

const jsonData = JSON.stringify(data, null, 2);
fs.writeFileSync('data.json', jsonData, 'utf8');

console.log('Data combined and saved as data.json');
