

var { readFileSync } = require('fs');
//contents of the file will return when file operation is don in synchronously
var contents = readFileSync('file.txt', 'utf8');
// this line is not reached until the read results are in
console.log(contents);
