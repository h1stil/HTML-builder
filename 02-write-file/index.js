const { stdin, stdout } = require('process');
const path = require('path')
const fs = require('fs')
const intput = fs.createWriteStream(path.resolve(__dirname, "text.txt"), 'utf-8')
stdout.write('Write your text here \n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    bye();
  }
  intput.write(data)
});

process.on('SIGINT', bye);

function bye() {
  stdout.write('Goodbye');
  process.exit()
}