const { writeFile, writeFileSync, appendFile } = require('fs');

const data = '\nHI too';
appendFile('text.txt', data, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('written something');
});
