var { MongoClient, ObjectID } = require('mongodb');
var mongodbUrl = 'mongodb://localhost:27017/PractiseDB';

var dbObject = null;
var checkAndConnect = () => {
    return new Promise((res, rej) => {
        if (!dbObject) {
            MongoClient.connect(mongodbUrl, function (err, db) {
                if (!err) {
                    dbObject = db;
                    res({ err, db });
                } else {
                    res({ err, db });
                }
            });
        } else {
            res({ db: dbObject });
        }
    });
};
module.exports = {
    mongoTable: ({ tableName, action, record }) => {
        return new Promise((res, rej) => {
            console.log('Incoming Data : ', tableName, action, record);
            checkAndConnect().then(({ err, db }) => {
                if (!err) {
                    switch (action) {
                        case 'GET':

                            break;
                        case 'POST':

                            break;
                        case 'DELETE':

                            break;
                        default:
                            break;
                    }
                    res({ result: {} });
                } else {
                    res({ err });
                }
            });
        });
    }
};