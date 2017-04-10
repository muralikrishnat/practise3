class DBTable {
    constructor(obj) {
        this._id = obj['_id'];
        this.AddedDate = obj['AddedDate'] || (new Date).getTime();
        this.AddedBy = obj['AddedBy'];
    }
}

class Employee extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.Name = obj['Name'];
        this.Password = obj['Password'];
        this.EmailId = obj['EmailId'];
        this.PersonalEmaild = obj['PersonalEmaild'];
        this.Designation = obj['Designation'];

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

class EmployeeProjectMapper extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.ProjectId = obj['ProjectId'];
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
        this.Position = obj['Position'];
        this.AllocationTime = obj['AllocationTime'];
    }
}

class Timesheet extends DBTable {
    constructor(obj) {
        super(obj);
        this.EmpId = obj['EmpId'];
        this.ProjectId = obj['ProjectId'];
        this.TaskId = obj['TaskId'];
        this.Comments = obj['Comments'];
        this.LoggedHours = obj['LoggedHours'];
        this.SheetDateTime = obj['SheetDateTime'];
        this.ApprovedBy = obj['ApprovedBy'];
        this.ApprovedDate = obj['ApprovedDate'];
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
    EmployeeProjectMapper,
    Timesheet,
    Holiday
}
