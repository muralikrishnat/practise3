module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "react-practise/dist/app.js": "react-practise/js/practise-jsx.jsx"
                }
            }
        }
    });

    grunt.registerTask("jsx2js", ["babel"]);
};