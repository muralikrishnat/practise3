var {
     sendResponse
} = require('./lib');
var {
    mongoTable
} = require('./db');
var tableNameMapper = [
    {
        TableName: 'Employee',
        UrlName: 'employee'
    },
    {
        TableName: 'Project',
        UrlName: 'project'
    },
    {
        TableName: 'Timesheet',
        UrlName: 'timesheet'
    },
    {
        TableName: 'EmployeeProjectAllocation',
        UrlName: 'employeeprojectaollocation'
    },
    {
        TableName: 'BusinessUnit',
        UrlName: 'businessunit'
    },
    {
        TableName: 'Holiday',
        UrlName: 'holiday'
    }
];
var tableHandler = ({ req, res, headers, routeParams, formParams, filterBy }) => {
    var resObject = {},
        tableName = null;
    if (routeParams.tablename && tableNameMapper.filter((g) => { if (g.UrlName === routeParams.tablename) { tableName = g.TableName; return true; } }).length > 0) {
        var record = formParams;
        mongoTable({ tableName, action: req.method.toUpperCase(), record, filterBy }).then(({ err, result }) => {
            sendResponse(res, headers, { data: result }, 200);
        });
    } else {
        sendResponse(res, headers, {}, 200);
    }
};

module.exports = {
    tableHandler,
    fallBackRoute: function (req, res, headers) {
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
        sendResponse(res, headers, resObject, 200);
    },
};