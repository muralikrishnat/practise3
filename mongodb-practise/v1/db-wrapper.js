var { MongoClient, ObjectID } = require('mongodb');
var url = 'mongodb://localhost:27017/PractiseDB';


var ProjectManager = {
    getProjectById: (_id) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var table = db.collection('Project');
                    table.find({ _id: new ObjectID(_id) }).toArray((cErr, results) => {
                        res({ err: cErr, results });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    getProjects: () => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var table = db.collection('Project');
                    table.find().toArray((cErr, results) => {
                        res({ err: cErr, results });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    addProject: (pData) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var table = db.collection('Project');
                    table.insert([pData], (err, result) => {
                        res({ err, result });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    deleteProject: (pData) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, (err, db) => {
                if (!err) {
                    var table = db.collection('Project');
                    table.findAndRemove({ _id: new ObjectID(pData._id) }, (err, result) => {
                        res({ err, result });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    }
};

var EmployeeManager = {
    getEmployeesByProjectId: (ProjectId) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var table = db.collection('EmployeeProjectMapper');
                    table.find({ ProjectId: new ObjectID(ProjectId) }).toArray((eErr, results) => {
                        if (!eErr) {
                            console.log('results ', results);
                            res({ err: eErr, results });
                            db.close();
                        } else {
                            res({ eErr });
                            db.close();
                        }
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    getEmployeesById: (EmpId) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var EmpTable = db.collection('Employee');
                    EmpTable.find({ EmpId }).toArray((cErr, results) => {
                        res({ err: cErr, results });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    getEmployees: () => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var EmpTable = db.collection('Employee');
                    EmpTable.find().toArray((cErr, results) => {
                        res({ err: cErr, results });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    addEmployee: (empData) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var EmpTable = db.collection('Employee');
                    EmpTable.insert([empData], (err, result) => {
                        res({ err, result });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    deleteEmployee: (eData) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, (err, db) => {
                if (!err) {
                    var EmpTable = db.collection('Employee');
                    EmpTable.findAndRemove({ _id: new ObjectID(eData._id) }, (err, result) => {
                        res({ err, result });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    },
    addToProject: ({ EmpId, ProjectId }) => {
        return new Promise((res, rej) => {
            MongoClient.connect(url, function (err, db) {
                if (!err) {
                    var table = db.collection('EmployeeProjectMapper');
                    table.insert([{ EmpId, ProjectId }], (err, result) => {
                        res({ err, result });
                        db.close();
                    });
                } else {
                    res({ err });
                    db.close();
                }
            });
        });
    }
};

var dbWrapper = {};
dbWrapper.getEmployees = ({ EmpId = null, ProjectId = null }) => {
    return new Promise((res, rej) => {
        if (EmpId) {
            EmployeeManager.getEmployeesById(EmpId).then((resObj) => {
                res(resObj);
            });
        } else if (ProjectId) {
            EmployeeManager.getEmployeesByProjectId(ProjectId).then((resObj) => {
                res(resObj);
            });
        } else {
            EmployeeManager.getEmployees().then((resObj) => {
                res(resObj);
            });
        }

    });
};
dbWrapper.addEmployee = (eData) => {
    return new Promise((res, rej) => {
        EmployeeManager.addEmployee(eData).then((resObj) => {
            res(resObj);
        });
    });
};

dbWrapper.deleteEmployee = (eData) => {
    return new Promise((res, rej) => {
        EmployeeManager.deleteEmployee(eData).then((resObj) => {
            res(resObj);
        });
    });
};

dbWrapper.getProjects = ({ ProjectId }) => {
    return new Promise((res, rej) => {
        if (ProjectId) {
            ProjectManager.getProjectById(ProjectId).then((resObj) => {
                res(resObj);
            });
        } else {
            ProjectManager.getProjects().then((resObj) => {
                res(resObj);
            });
        }
    });
};

dbWrapper.addEmployeeToProject = ({ EmpId, ProjectId }) => {
    return new Promise((res, rej) => {
        EmployeeManager.addToProject({ EmpId, ProjectId }).then((resObj) => {
            res(resObj);
        });
    });
};

dbWrapper.addProject = (pData) => {
    return new Promise((res, rej) => {
        ProjectManager.addProject(pData).then((resObj) => {
            res(resObj);
        });
    });
};


module.exports = dbWrapper