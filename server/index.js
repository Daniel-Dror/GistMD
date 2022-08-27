//Imports - Requires
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

//Functions
//Checks if its the string is a valid uuid_v4 using regex expression
const validateUuid = (uuid) => {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(uuid); // true/false
};
//Cors options for safety allowing POST and GET req only from a specific URL
const corsOptions = {
  origin: process.env.FONTEND_URL,
  methods: "GET, POST",
  optionsSuccessStatus: 200,
};

//Midlleware
//Calls Cors
app.use(cors(corsOptions));
//req.body
app.use(express.json());

//Routes
//GET req from '/' returns all rows from patient table.
app.get("/", async (req, res) => {
  try {
    const getAllPatients = await pool.query(
      "SELECT patient.uid, patient.age, patient.sex, surgery.name as surgery, language.name as language FROM patient INNER JOIN surgery ON patient.surgery_uid=surgery.uid INNER JOIN language ON patient.language_uid=language.uid;"
    );
    res.json(getAllPatients);
  } catch (error) {
    res.json(err);
  }
});

//CREATE new patient (includes language/surgey fields check)
//types of data:
//age-number: 0-3.
//sex-string: 'Male', 'Female'.
//surgery-string: uuid_v4(for an existing surgery), string(for a new surgery to add).
//language-string: uuid_v4(for an existing language), string(for a new language to add).
//RETURN new patient or throw an error in the specific case.

app.post("/patient", async (req, res) => {
  try {
    //destructure req.body
    let { age, sex, surgery_uid, language_uid } = req.body;
    //FLAGS that will indicate if its a new string to add to DB
    let addLangStringToDb = false;
    let addSurStringToDb = false;
    //Check if all variables arent null
    if (
      Boolean(age) &&
      Boolean(sex) &&
      Boolean(surgery_uid) &&
      Boolean(language_uid)
    ) {
      //CHECKS for valid inputs for sex and age
      if (age < 0 || age > 3) {
        throw "ERROR: Invalid age input, please choose an age group between 0-3.";
      }
      if (sex != "Female" && sex != "Male") {
        throw "ERROR: Invalid sex input, please choose a valid sex input (Male / Female).";
      }

      //Surgery input check
      //is it a valid uuid? and does it exist already
      if (validateUuid(surgery_uid)) {
        const uuidCheck = await pool.query(
          "SELECT uid FROM surgery WHERE uid =($1);",
          [surgery_uid]
        );
        //If this uuid dosent relates to a surgery throw ERROR
        if (uuidCheck.rowCount === 0) {
          throw "ERROR: surgery.uid cannot be found.";
        }
      }
      //If it's a new surgery which comes as a string
      else {
        //Capitalaize every first letter of every word
        surgery_uid = surgery_uid
          .toLowerCase()
          .replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
            return letter.toUpperCase();
          });
        const stringCheck = await pool.query(
          "SELECT * FROM surgery where name = $1;",
          [surgery_uid]
        );
        //Check if that surgery_name exists in the DB if it does save the uid
        if (stringCheck.rowCount > 0) {
          surgery_uid = stringCheck.rows[0].uid;
        }
        //Turn on flag if its a new string that should be added to the db
        else {
          addSurStringToDb = !addSurStringToDb;
        }
      }
      //Language input check
      //is it a valid uuid? and does it exist already
      if (validateUuid(language_uid)) {
        const uuidCheck = await pool.query(
          "SELECT uid FROM language WHERE uid =($1);",
          [language_uid]
        );
        //If this uuid doesnt relates to a language throw ERROR
        if (uuidCheck.rowCount === 0) {
          throw "ERROR: language.uid cannot be found.";
        }
      }
      //if its a language which comes as a string
      else {
        //Capitalaize every first letter of every word
        language_uid = language_uid
          .toLowerCase()
          .replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
            return letter.toUpperCase();
          });
        const stringCheck = await pool.query(
          "SELECT * FROM language WHERE name = $1;",
          [language_uid]
        );
        //Check if that language_name exists in the DB, if so save the uid
        if (stringCheck.rowCount > 0) {
          language_uid = stringCheck.rows[0].uid;
        }
        //Turn on flag if its a new string that should be added to the DB
        else {
          addLangStringToDb = !addLangStringToDb;
        }
      }
    }
    //one or more of the variables that we want to add are NULL
    else {
      throw "ERROR: Cannot add new patient, missing data, check if theres an empty field";
    }

    //Insert new addons Language/Surgery
    //Surgery
    if (addSurStringToDb) {
      const stringInsert = await pool.query(
        "INSERT INTO surgery VALUES (uuid_generate_v4(), $1) RETURNING uid;",
        [surgery_uid]
      );
      //save uid
      surgery_uid = stringInsert.rows[0].uid;
    }
    //Language
    if (addLangStringToDb) {
      const stringInsert = await pool.query(
        "INSERT INTO language VALUES (uuid_generate_v4(), $1) RETURNING uid;",
        [language_uid]
      );
      //save uid
      language_uid = stringInsert.rows[0].uid;
    }

    //Insert new patient with all valid variables, returns new patient uid
    const addNewPatient = await pool.query(
      "INSERT INTO patient ( uid, age, sex, surgery_uid, language_uid) VALUES(uuid_generate_v4(), $1, $2, $3, $4) RETURNING patient.uid;",
      [age, sex, surgery_uid, language_uid]
    );
    //Using the uid to res the new patient
    const newPatient = await pool.query(
      "SELECT patient.uid, patient.age, patient.sex, surgery.name as surgery, language.name as language FROM patient INNER JOIN surgery ON patient.surgery_uid=surgery.uid INNER JOIN language ON patient.language_uid=language.uid WHERE patient.uid =($1);",
      [addNewPatient.rows[0].uid]
    );
    console.log(
      "A new patient has been added successfully. \nNew patient: \n",
      newPatient.rows
    );
    //res new patient
    res.json(newPatient.rows);
  } catch (err) {
    res.json(err);
  }
});

//GET all Surgerys, languages, Ages, Sex, Questions
app.get("/addpatient", async (req, res) => {
  try {
    //Languages
    const getLanguages = await pool.query(
      "SELECT DISTINCT name, uid FROM language;"
    );
    //Surgerys
    const getSurgeries = await pool.query(
      "SELECT DISTINCT name, uid FROM surgery;"
    );
    //Questions
    const getQuestions = await pool.query("SELECT * from question;");
    //getting sex ENUM options
    const getSex = await pool.query("SELECT enum_range(NULL::binary_sex);");
    //getting age ENUM options
    const getAgeGroup = await pool.query("SELECT enum_range(NULL::age_group);");

    res.json({
      listOfSurgeries: getSurgeries.rows,
      listOfLanguages: getLanguages.rows,
      listOfSex: getSex,
      listOfAgeGroups: getAgeGroup,
      listOfQuestions: getQuestions,
    });
  } catch (err) {
    res.json(err);
  }
});

//Initialize server
app.listen(process.env.PORT, () => {
  console.log("server has started, listening for requests.");
});
