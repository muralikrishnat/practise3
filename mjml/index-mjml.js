var { mjml2html } = require('mjml'),
    { readFile, writeFile } = require('fs'),
    { join } = require('path');


var getFileNameFormat = (objToRead) => {
    return `${objToRead.Id}.html`;
};

var outputCompiledTemplate = (compiledTemplate, listItem) => {
    var fileToGenerate = join(__dirname, getFileNameFormat(listItem));
    if (compiledTemplate.errors.length > 0) {
        console.log(`${fileToGenerate} Failed to generate due to `, compiledTemplate.errors);
    } else {
        writeFile(fileToGenerate, compiledTemplate.html, () => {
            console.log(`${fileToGenerate}  Generated successfully`);
        });
    }
};
var generateTemplates = (templateStr, lists) => {
    if (lists && lists instanceof Array) {
        lists.forEach((emp) => {
            var interpolatedStr = templateStr.replace(/\${([^{}]*)}/g, (a, b) => {
                return emp[b] ? emp[b] : b;
            });

            var mjmlOutput = mjml2html(interpolatedStr);
            outputCompiledTemplate(mjmlOutput, emp);
        });
    }
};

var processMjmlFile = function (mjmlFilePath, employees) {
    readFile(mjmlFilePath, (err, data) => {
        if (!err) {
            var buffer = new Buffer(data);
            var emailTemplateString = buffer.toString();
            generateTemplates(emailTemplateString, employees);
        } else {
            console.log('Failed on loading mjml template file : ', err);
        }
    });
};

readFile(join(__dirname, 'employees.json'), (err, data) => {
    if (!err) {
        var buffer = new Buffer(data);
        var employeesString = buffer.toString();
        try {
            var fileJSON = JSON.parse(employeesString);
            processMjmlFile(join(__dirname, 'email-template.mjml'), fileJSON.employees);
        } catch (r){
            console.log('File is Not in correct JSON format');
        }
    } else {
        console.log('Failed on loading json file : ', err);
    }
});

