async function copyDir() {
  const fs = require('fs')
  const path = require('path')
  fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  fs.readdir(path.resolve(__dirname, 'files-copy'), (err, files) => {
    if (err) console.log(err);
    for (const file of files) {
      fs.unlink(path.resolve(__dirname, 'files-copy', file), err => {
        if (err) console.log(err);
      });
    }
  });
  fs.readdir(path.resolve(__dirname, 'files'), (err, file) => {
    if (err) console.log(err); 
    else {
      file.forEach(copyFile => {
        fs.copyFile(path.resolve(__dirname, 'files', copyFile), path.resolve(__dirname, 'files-copy', copyFile), (err)=> {
          console.log(`${copyFile} copied`)
          if (err) console.log(err);
        })
      })
    }
  })
}

copyDir()