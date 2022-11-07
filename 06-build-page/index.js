const path = require('path')
const fs = require('fs')

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) console.error(err);
});

// HTML 

const input = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8')
input.on("data", function(chunk){ 
  fs.readdir(path.resolve(__dirname, 'components'), (err, files) => {
    if (err) console.log(err);
    for (let component of files) {
      const fileName = component.split('.')[0];
      if(chunk.includes(`{{${fileName}}}`)) {
        const readStream = fs.createReadStream(path.resolve(__dirname, `components/${component}`), 'utf-8')
        readStream.on("data", function(text){ 
        chunk = chunk.replace(`{{${fileName}}}`, text.toString())
        const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist/index.html'), 'utf-8');
        output.write(chunk)
    });
      }
    }
  })
});

// CSS

fs.readdir(path.resolve(__dirname, 'styles'), (err, styles) => {
  if (err) console.log(err);
  let bundle = fs.createWriteStream(path.resolve(__dirname, "project-dist/style.css"), 'utf-8')
  for (const style of styles) {
    fs.stat(path.resolve(__dirname, `styles/${style}`), (error, stats) => {
      if ((stats.isFile()) && (path.extname(style) === '.css')) {
        const readStyles = fs.createReadStream(path.resolve(__dirname, `styles/${style}`), 'utf-8')
        readStyles.on('data', (data) => {
          bundle.write(data.toString() + '\n')
        })
      }
    });
  }
});

// Assets

const copyDir = (fileToCopy, copyFile) => {
  fs.mkdir(path.join(copyFile), {recursive: true}, (err) => {
    if (err) console.log(err);
  })
  fs.promises.readdir(fileToCopy, { withFileTypes: true})
    .then (files => files.forEach(file => {
      if (file.isFile()) {
        fs.promises.copyFile(path.resolve(fileToCopy, file.name), path.resolve(copyFile, file.name))
      } else if (file.isDirectory()) {
        copyDir(path.resolve(fileToCopy, file.name), path.resolve(copyFile, file.name))
      }
    }))
    .catch(err => {
      console.log(err)
    })
}

copyDir(path.resolve(__dirname, `assets`),  path.resolve(__dirname, `project-dist/assets`))