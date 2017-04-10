class DBTable {
    constructor(obj) {
        this._id = obj['_id'];
        this.Id = obj['Id'] || obj['_id'];
        this.AddedDate = obj['AddedDate'] || (new Date).getTime();
        this.AddedBy = obj['AddedBy'];
    }
}

class Designation extends DBTable {
    constructor(obj) {
        super(obj);
        this.Name = obj['Name'];
    }
}

class Employee extends DBTable {
    constructor(obj, skipPassword) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.Name = obj['Name'];
        if (!skipPassword) {
            this.Password = obj['Password'];
        }
        this.EmailId = obj['EmailId'];
        this.PersonalEmaild = obj['PersonalEmaild'];
        this.Designation = obj['Designation'];
        this.PractiseId = obj['PractiseId'];
    }
}

class EmployeeCreds extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.Password = obj['Password'];
    }
}

class Practise extends DBTable {
    constructor(obj) {
        super(obj);
        this.Name = obj['Name'];
        this.Manager = obj['Manager'];
        this.Lead = obj['Lead'];
    }
}

class BusinessUnit extends DBTable {
    constructor(obj) {
        super(obj);
        this.Name = obj['Name'];
    }
}

class Project extends DBTable {
    constructor(obj) {
        super(obj);
        this.Name = obj['Name'];
        this.BusinessId = obj['BusinessId'];
    }
}

class EmployeeProjectAllocation extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.ProjectId = obj['ProjectId'];
        this.IsBillable = obj['IsBillable'];
        this.StartDate = obj['StartDate'];
        this.EndDate = obj['EndDate'];
        this.Comments = obj['Comments'];
        this.Role = obj['Role'];
        this.AllocationTime = obj['AllocationTime'];
    }
}

class Timesheet extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.ProjectId = obj['ProjectId'];
        this.TaskId = obj['TaskId'];
        this.Comment = obj['Comment'];
        this.LoggedHours = obj['LoggedHours'];
        this.SheetDateTime = obj['SheetDateTime'];

        this.IsApproved = obj['IsApproved'];
        this.ApprovedBy = obj['ApprovedBy'];
        this.ApprovedDate = obj['ApprovedDate'];
        this.ManagerComments = obj['ManagerComments'];
    }
}

class TimesheetComments extends DBTable {
    constructor(obj) {
        super(obj);
        this.Comment = obj['Comment'];
        this.CommentBy = obj['CommentBy'];
        this.CommentDate = obj['CommentDate'];
        this.ViewCount = obj['ViewCount'];
        this.TimesheetId = obj['TimesheetId'];
    }
}


class Holiday extends DBTable {
    constructor(obj) {
        super(obj);
        this.Name = obj['Name'];
        this.HolidayDate = obj['HolidayDate'];
        this.Isoptional = obj['Isoptional'];
    }
}

module.exports = {
    Employee,
    Project,
    Timesheet,
    Holiday,
    EmployeeProjectAllocation,
    BusinessUnit,
    EmployeeCreds
}
