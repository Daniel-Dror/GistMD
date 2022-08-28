-- after configuring the postgres DB server, we will set up the DB and his tabkes
-- type: \c gistmd
-- then copy paste all the queries below
-- make sure all the tables exists and you are good to go!



CREATE TABLE language (
uid uuid PRIMARY KEY NOT NULL,
name VARCHAR(100) NOT NULL
);

CREATE TABLE surgery (
uid uuid PRIMARY KEY NOT NULL,
name VARCHAR(100) NOT NULL
);

CREATE TABLE question (
    uid uuid PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    value VARCHAR(500) NOT NULL
);

CREATE TYPE age_group as ENUM('0', '1', '2', '3');
CREATE TYPE binary_sex as ENUM('Male', 'Female');

CREATE TABLE patient (
	uid uuid PRIMARY KEY NOT NULL,
	age age_group NOT NULL,
	sex binary_sex NOT NULL,
	surgery_uid uuid NOT NULL REFERENCES surgery(uid),
    language_uid uuid NOT NULL REFERENCES language(uid)
);

INSERT INTO surgery VALUES (uuid_generate_v4(), 'Urological Surgery');
INSERT INTO surgery VALUES (uuid_generate_v4(), 'Gynecological Surgery');
INSERT INTO surgery VALUES (uuid_generate_v4(), 'Thoracic Surgery');
INSERT INTO surgery VALUES (uuid_generate_v4(), 'Breast Surgery');
INSERT INTO surgery VALUES (uuid_generate_v4(), 'Colorectal Surgery');
INSERT INTO surgery VALUES (uuid_generate_v4(), 'Gallbladder removal (cholecystectomy)');


INSERT INTO language VALUES (uuid_generate_v4(), 'Mandarin Chinese');
INSERT INTO language VALUES (uuid_generate_v4(), 'Spanish');
INSERT INTO language VALUES (uuid_generate_v4(), 'English');
INSERT INTO language VALUES (uuid_generate_v4(), 'Hindi');
INSERT INTO language VALUES (uuid_generate_v4(), 'Bengali');
INSERT INTO language VALUES (uuid_generate_v4(), 'Portuguese');

INSERT INTO question VALUES (uuid_generate_v4(), 'Age', 'Please choose the patient age group.');
INSERT INTO question VALUES (uuid_generate_v4(), 'Sex', 'Please choose the patient Sex.');
INSERT INTO question VALUES (uuid_generate_v4(), 'Language', 'Please select the patient native language.');
INSERT INTO question VALUES (uuid_generate_v4(), 'Surgery', 'Please select the patient upcoming surgery.');