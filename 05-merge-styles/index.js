const path = require('path')
const fs = require('fs')

fs.readdir(path.resolve(__dirname, 'styles'), (err, styles) => {
  if (err) console.log(err);
  let bundle = fs.createWriteStream(path.resolve(__dirname, "project-dist/bundle.css"), 'utf-8')
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