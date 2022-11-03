const fs = require('fs');
const path = require('path')

// const stream = new fs.ReadStream("01-read-file/text.txt", 'utf-8');
// stream.on('readable', function(){
//     const data = stream.read();
//     console.log(data);
// });

const readStream = fs.createReadStream(path.resolve(__dirname, "text.txt"), 'utf-8')
readStream.on("data", function(chunk){ 
    console.log(chunk);
});

