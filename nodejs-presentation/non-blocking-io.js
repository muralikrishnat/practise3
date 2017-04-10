

var { readFile } = require('fs');
//callback will call when the read operation is done with file content
readFile('file.txt', 'utf8', function (err, data) {
    // called at a later time when the results are in
    console.log(data)
});
// readFile returns immediately and this line is reached right away
console.log('End of the File');
