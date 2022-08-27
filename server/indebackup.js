const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Functions
//Check if its a uuid or a new String to add
const validateUuid = (uuid) => {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(uuid); // true/false
};

//Midlleware
app.use(cors());
app.use(express.json()); //req.body

//Routes
//GET all patients
app.get("/", async (req, res) => {
  try {
    const getAllPatients = await pool.query(
      "SELECT patient_uid, age, sex, surgery.surgery_name, language.language_name FROM patient NATURAL JOIN surgery NATURAL JOIN language; "
    );
    res.json(getAllPatients.rows);
  } catch (error) {
    res.json(err);
  }
});

//CREATE patient (includes language/surgey fields check)
app.post("/patient", async (req, res) => {
  try {
    let { age, sex, surgery_uid, language_uid } = req.body;
    let addLangStringToDb = false;
    let addSurStringToDb = false;
    //Check if all variables arent null
    if (
      Boolean(age) &&
      Boolean(sex) &&
      Boolean(surgery_uid) &&
      Boolean(language_uid)
    ) {
      //Surgery input check
      //Is it an existing surgery with a valid uuid
      if (validateUuid(surgery_uid)) {
        const uuidCheck = await pool.query(
          "SELECT surgery_uid FROM surgery WHERE surgery_uid =($1);",
          [surgery_uid]
        );
        //If this uuid relates to a surgery throw ERROR
        if (uuidCheck.rowCount === 0) {
          throw "ERROR: surgery_uid cannot be found.";
        }
      }
      //If it's a new surgery which comes as a string
      else {
        const stringCheck = await pool.query(
          "SELECT surgery_name FROM surgery where surgery_name = $1;",
          [surgery_uid]
        );
        //Check if that surgery_name exists in the DB
        if (stringCheck.rowCount > 0) {
          throw "ERROR: This surgery already exists, please scroll again until youll find it.";
        }
        //Turn on flag if its a new valid string
        else {
          addSurStringToDb = !addSurStringToDb;
        }
      }
      //language input check
      //Is it an existing language with a valid uuid
      if (validateUuid(language_uid)) {
        const uuidCheck = await pool.query(
          "SELECT language_uid FROM language WHERE language_uid =($1);",
          [language_uid]
        );
        //If this uuid related to a language throw ERROR
        if (uuidCheck.rowCount === 0) {
          throw "ERROR: language_uid cannot be found.";
        }
      }
      //Is it a new language which comes as a string
      else {
        const stringCheck = await pool.query(
          "SELECT language_name FROM language WHERE language_name = $1;",
          [language_uid]
        );
        //Check if that language_name exists in the DB
        if (stringCheck.rowCount > 0) {
          throw "ERROR: This language already exists, please scroll again until youll find it.";
        }
        //Turn on flag if its a new valid string
        else {
          addLangStringToDb = !addLangStringToDb;
        }
      }
    } else {
      throw "ERROR: Cannot add new patient, missing data, check if theres an empty field";
    }

    //Insert new addons Language/Surgery
    //Surgery
    if (addSurStringToDb) {
      const stringInsert = await pool.query(
        "INSERT INTO surgery VALUES (uuid_generate_v4(), $1) RETURNING surgery_uid;",
        [surgery_uid]
      );
      surgery_uid = stringInsert.rows[0].surgery_uid;
    }
    //Language
    if (addLangStringToDb) {
      const stringInsert = await pool.query(
        "INSERT INTO language VALUES (uuid_generate_v4(), $1) RETURNING language_uid;",
        [language_uid]
      );
      language_uid = stringInsert.rows[0].language_uid;
    }

    //Insert new patient with
    const addnewPatient = await pool.query(
      "INSERT INTO patient ( patient_uid, age, sex, surgery_uid, language_uid) VALUES(uuid_generate_v4(), $1, $2, $3, $4) RETURNING patient_uid;",
      [age, sex, surgery_uid, language_uid]
    );
    const newPatient = await pool.query(
      "SELECT patient_uid, age, sex, surgery.surgery_name, language.language_name FROM patient NATURAL JOIN surgery NATURAL JOIN language WHERE patient_uid =($1);",
      [addnewPatient.rows[0].patient_uid]
    );
    //Doesnt return any rows with data to display
    res.json(newPatient.rows[0]);
  } catch (err) {
    res.json(err);
  }
});

//GET all Surgerys & languages
app.get("/addpatient", async (req, res) => {
  try {
    const getLanguages = await pool.query(
      "SELECT DISTINCT language_name, language_uid FROM language;"
    );
    const getSurgeries = await pool.query(
      "SELECT DISTINCT surgery_name, surgery_uid FROM surgery;"
    );
    res.json({
      listOfSurgeries: getSurgeries.rows,
      listOfLanguages: getLanguages.rows,
    });
  } catch (err) {
    res.json(err);
  }
});

//Initialize server
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
