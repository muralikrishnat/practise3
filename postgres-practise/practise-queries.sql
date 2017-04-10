select * from employee where empid in (select  empid from employeeprojectallocation where projectid = '1')
select * from projects where id in (select projectid::numeric from employeeprojectallocation where empid = '943')

select projectid from employeeprojectallocation where empid = '943'
select * from employeeprojectallocation
insert into employeeprojectallocation (empid, projectid) values ('admin', '1')


select * from timesheets


select date_part('month', holidaydate) from holidays

insert into holidays (name, holidaydate, isoptional) values ('Sankranthi', '10/02/1989', 'YES')

select * from timesheets

delete from timesheets


INSERT INTO timesheets
(empid, projectid, taskid, loggedhours, isapproved, declinedcount, comment, isholiday, onleave, comboff, timesheetdate)
	VALUES 
('943', '1', '', 4, False, 0, '',False ,False ,False , '03/29/2017');


select * from timesheets where empid='943'

select * from timesheets

select * from projects
insert into projects(name, businessid, expectedstartdate, expectedenddate, actualstartdate, actualenddate)


select * from employeeprojectallocation


select * from employee

insert into employee (firstname, lastname, empid, password, role, emailid) values 
('admin', 'admin', 'admin', 'admin', 'admin', 'admin@evoketechnologies.com')
