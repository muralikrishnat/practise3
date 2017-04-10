-- Table: public.businessunit

-- DROP TABLE public.businessunit;

CREATE TABLE public.businessunit
(
    id integer NOT NULL DEFAULT nextval('businessunit_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    addedby integer,
    addeddate date,
    CONSTRAINT businessunit_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.businessunit
    OWNER to postgres;


-- Table: public.designation

-- DROP TABLE public.designation;

CREATE TABLE public.designation
(
    id integer NOT NULL DEFAULT nextval('designation_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT designation_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.designation
    OWNER to postgres;

-- Table: public.employee

-- DROP TABLE public.employee;

CREATE TABLE public.employee
(
    id integer NOT NULL DEFAULT nextval('employee_id_seq'::regclass),
    firstname character varying(150) COLLATE pg_catalog."default",
    lastname character varying(150) COLLATE pg_catalog."default",
    empid character varying(100) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    personalemailid character varying(100) COLLATE pg_catalog."default",
    emailid character varying(100) COLLATE pg_catalog."default",
    designation character varying(100) COLLATE pg_catalog."default",
    reportingmanger integer,
    practise character varying(100) COLLATE pg_catalog."default",
    practiserole character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT employee_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee
    OWNER to postgres;

-- Table: public.employeeprojectallocation

-- DROP TABLE public.employeeprojectallocation;

CREATE TABLE public.employeeprojectallocation
(
    id integer NOT NULL DEFAULT nextval('employeeprojectallocation_id_seq'::regclass),
    empid character varying(100) COLLATE pg_catalog."default",
    projectid character varying(100) COLLATE pg_catalog."default",
    startdate date,
    enddate date,
    isbillable character varying(20) COLLATE pg_catalog."default",
    role character varying(100) COLLATE pg_catalog."default",
    allocationtype character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT employeeprojectallocation_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employeeprojectallocation
    OWNER to postgres;

-- Table: public.holidays

-- DROP TABLE public.holidays;

CREATE TABLE public.holidays
(
    id integer NOT NULL DEFAULT nextval('holidays_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    holidaydate date,
    isoptional character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT holidays_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.holidays
    OWNER to postgres;

-- Table: public.practise

-- DROP TABLE public.practise;

CREATE TABLE public.practise
(
    id integer NOT NULL DEFAULT nextval('practise_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT practise_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.practise
    OWNER to postgres;


-- Table: public.projects

-- DROP TABLE public.projects;

CREATE TABLE public.projects
(
    id integer NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    businessid integer,
    expectedstartdate date,
    expectedenddate date,
    actualstartdate date,
    actualenddate date,
    CONSTRAINT projects_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.projects
    OWNER to postgres;

-- Table: public.tasks

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    expectedwork character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tasks
    OWNER to postgres;


-- Table: public.timesheetcomments

-- DROP TABLE public.timesheetcomments;

CREATE TABLE public.timesheetcomments
(
    id integer NOT NULL DEFAULT nextval('timesheetcomments_id_seq'::regclass),
    comment text COLLATE pg_catalog."default",
    commentby numeric,
    commentdate date,
    viewcount numeric,
    timesheetid numeric,
    CONSTRAINT timesheetcomments_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.timesheetcomments
    OWNER to postgres;


-- Table: public.timesheets

-- DROP TABLE public.timesheets;

CREATE TABLE public.timesheets
(
    id integer NOT NULL DEFAULT nextval('timesheets_id_seq'::regclass),
    empid character varying(100) COLLATE pg_catalog."default",
    projectid character varying(100) COLLATE pg_catalog."default",
    taskid character varying(100) COLLATE pg_catalog."default",
    loggedhours numeric,
    isapproved boolean,
    declinedcount numeric,
    comment text COLLATE pg_catalog."default",
    isholiday boolean,
    onleave boolean,
    comboff boolean,
    timesheetdate timestamp with time zone,
    CONSTRAINT timesheets_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.timesheets
    OWNER to postgres;

