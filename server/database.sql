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

ALTER TABLE language 
RENAME COLUMN language_name TO name;

ALTER TABLE language 
RENAME COLUMN language_uid TO uid;

ALTER TABLE surgery 
RENAME COLUMN surgery_name TO name;

ALTER TABLE surgery 
RENAME COLUMN surgery_uid TO uid;


ALTER TABLE patient 
RENAME COLUMN patient_name TO name;

ALTER TABLE patient 
RENAME COLUMN patient_uid TO uid;

ALTER TABLE question
ADD COLUMN new_column_name data_type constraint;



SELECT patient.uid, patient.age, patient.sex, surgery.name as surgery, language.name as language FROM patient INNER JOIN surgery ON patient.surgery_uid=surgery.uid INNER JOIN language ON patient.language_uid=language.uid;