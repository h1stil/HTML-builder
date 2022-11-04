const fs = require('fs')
const path = require('path')
fs.promises.readdir(path.resolve(__dirname, 'secret-folder'))
  .then(files => {
    for (let file of files) {
      fs.stat(path.resolve(__dirname, `secret-folder/${file}`), (error, stats) => {
        if (!stats.isDirectory()) {
          console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${(stats["size"]/1024).toFixed(2)} KB`);
        }
      });
    }
  })
  .catch(err => {
    console.log(err)
  })
