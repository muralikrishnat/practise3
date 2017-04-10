var { createServer } = require('http');
var { join } = require('path');
var url = require('url');
var headers = {},
    routings = [];

headers['Access-Control-Allow-Origin'] = 'http://web.evoke.com';
headers['Access-Control-Allow-Credentials'] = true;
headers['Access-Control-Allow-Headers'] = 'content-type';
headers['Access-Control-Allow-Methods'] = 'DELETE,GET,POST';


var formidable = require('formidable');

var fallBackRoute = function (req, res, headers) {
    headers["Content-Type"] = "text/json";
    res.writeHead(200, headers);
    var resObject = {};
    resObject.Body = {
        "Available Routes": [
            {
                "Url": "/login?username=val&password=val",
                "Methods": ["GET", "POST"],
                "Usage": "Authentication for Application"
            }
        ]
    };
    res.end(JSON.stringify(resObject));
};


var isAuthenticated = function (req) {
    return new Promise((res, rej) => {
        res();
    });
};

var RouteClass = function (u, fn) {
    this.Url = u;
    this.Fn = fn;
}

var sendResponse = (res, headers, resObject, resCode) => {
    headers["Content-Type"] = "text/json";
    res.writeHead(resCode, headers);
    res.end(JSON.stringify(resObject));
};

var { getEmployees, addEmployee, deleteEmployee, addProject, getProjects,
    addEmployeeToProject } = require('./db-wrapper');
var { Employee, EmployeeProjectMapper, Project } = require('./db-schema');

var parseRequestFields = function (req) {
    return new Promise((res, rej) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res({ err, fields });
        });
    });
};
var loginHandler = (req, res, headers) => {
    var resObject = {};
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (!err) {
            sendResponse(res, headers, { Status: 'Success', Fields: fields }, 200);
        } else {
            sendResponse(res, headers, { Status: 'Failed', Msg: 'Login Failed' }, 200);
        }
    });
};

var getQueryParamSync = function (name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    var queryParamVal = null;
    if (!results) {
        return queryParamVal;
    }
    if (!results[2]) {
        return queryParamVal;
    }
    queryParamVal = decodeURIComponent(results[2].replace(/\+/g, " "));
    return queryParamVal;
};
var employeeHandler = (req, res, headers) => {
    parseRequestFields(req).then(({ err, fields }) => {
        var reqPromise = null;
        switch (req.method.toUpperCase()) {
            case 'GET':
                reqPromise = getEmployees({ EmpId: getQueryParamSync('EmpId', req.url), ProjectId: getQueryParamSync('ProjectId', req.url) });
                break;
            case 'POST':
                var empData = new Employee(fields);
                reqPromise = addEmployee(empData);
                break;
            case 'DELETE':
                var empData = new Employee({ _id: getQueryParamSync('id', req.url) });
                reqPromise = deleteEmployee(empData);
                break;
            default:
                break;
        }

        if (reqPromise) {
            reqPromise.then((resp) => {
                sendResponse(res, headers, { Status: 'Success', Data: resp }, 200);
            });
        } else {
            sendResponse(res, headers, { Status: 'Success', Msg: 'Request Method is not supported' }, 200);
        }
    });
};

var projectsHandler = (req, res, headers) => {
    parseRequestFields(req).then(({ err, fields }) => {
        var reqPromise = null,
            Msg = null;
        if (this.action === 'E2P') {
            reqPromise = addEmployeeToProject({ EmpId: fields.EmpId, ProjectId: files.ProjectId });
        } else {
            switch (req.method.toUpperCase()) {
                case 'GET':
                    reqPromise = getProjects({ _id: getQueryParamSync('EmpId', req.url) });
                    break;
                case 'POST':
                    var rowData = new Project(fields);
                    reqPromise = addProject(rowData);
                    break;
                case 'DELETE':
                    //TODO:
                    var rowData = new Project({ _id: getQueryParamSync('id', req.url) });
                    reqPromise = deleteEmployee(rowData);
                    break;
                default:
                    break;
            }
        }

        if (reqPromise) {
            reqPromise.then((resp) => {
                sendResponse(res, headers, { Status: 'Success', Data: resp }, 200);
            });
        } else {
            sendResponse(res, headers, { Status: 'Success', Msg: Msg || 'Request Method is not supported' }, 200);
        }
    });
};

routings.push(new RouteClass('/login', loginHandler));
routings.push(new RouteClass('/employees', employeeHandler));
routings.push(new RouteClass('/projects', projectsHandler));
routings.push(new RouteClass('/addemptoproject', projectsHandler.bind({ action: "E2P" })));




createServer((req, res) => {
    var isRouteFound = false,
        fnToCall = null,
        reqUrl = url.parse(req.url);
    routings.forEach(function (lItem) {
        if (lItem.Url === reqUrl.pathname) {
            isRouteFound = true;
            fnToCall = lItem.Fn;
        }
    });

    if (isRouteFound && fnToCall) {
        fnToCall.call(null, req, res, headers);
    } else {
        fallBackRoute(req, res, headers);
    }
}).listen(1212, () => {
    console.log('API is listening on 1212');
});

