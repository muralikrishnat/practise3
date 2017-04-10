

module.exports = {
    interpolate: (templateStr, obj) => {
        //finding the metches '${xxxx}' in string
        return  templateStr.replace(/\${([^{}]*)}/g, (a, b) => {
            //replacing the '${xxxx}' with respective object property data.
            return obj[b] ? obj[b] : '';
        });
    }
};