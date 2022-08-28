const { validateUuid } = require("../functions/validate");
const {
  getAllPatients,
  getLanguages,
  getSurgeries,
  getQuestions,
  getSex,
  getAgeGroup,
  getNewPatient,
  addNewPatient,
  surgery_StringInsert,
  language_StringInsert,
  language_StringCheck,
  language_UuidCheck,
  surgery_StringCheck,
  surgery_UuidCheck,
} = require("../services/patientService");

exports.getPatientTable = async (req, res) => {
  try {
    const allPatients = await getAllPatients();
    if (allPatients.rowCount > 0) {
      res.json(allPatients);
    } else {
      throw "There are no patients, please add a new one";
    }
  } catch (error) {
    res.json(error);
  }
};

exports.createPatient = async (req, res) => {
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
        const surgeryUuidCheck = await surgery_UuidCheck(surgery_uid);
        //If this uuid dosent relates to a surgery throw ERROR
        if (surgeryUuidCheck.rowCount === 0) {
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
        const surgeryStringCheck = await surgery_StringCheck(surgery_uid);
        //Check if that surgery_name exists in the DB if it does save the uid
        if (surgeryStringCheck.rowCount > 0) {
          surgery_uid = surgeryStringCheck.rows[0].uid;
        }
        //Turn on flag if its a new string that should be added to the db
        else {
          addSurStringToDb = !addSurStringToDb;
        }
      }
      //Language input check
      //is it a valid uuid? and does it exist already
      if (validateUuid(language_uid)) {
        const languageUuidCheck = await language_UuidCheck(language_uid);
        //If this uuid doesnt relates to a language throw ERROR
        if (languageUuidCheck.rowCount === 0) {
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
        const languagestringCheck = await language_StringCheck(language_uid);

        //Check if that language_name exists in the DB, if so save the uid
        if (languagestringCheck.rowCount > 0) {
          language_uid = languagestringCheck.rows[0].uid;
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
      const surgeryStringInsert = await surgery_StringInsert(surgery_uid);
      //save uid
      surgery_uid = surgeryStringInsert.rows[0].uid;
    }
    //Language
    if (addLangStringToDb) {
      const languageStringInsert = await language_StringInsert(language_uid);
      //save uid
      language_uid = languageStringInsert.rows[0].uid;
    }

    //Insert new patient with all valid variables, returns new patient uid
    const addNew = await addNewPatient(age, sex, surgery_uid, language_uid);

    //Using the uid to res the new patient
    const newPatient = await getNewPatient(addNew);
    console.log(
      "A new patient has been added successfully. \nNew patient: \n",
      newPatient.rows
    );
    //res new patient
    res.json(newPatient.rows);
  } catch (err) {
    res.json(err);
  }
};

exports.addPatient = async (req, res) => {
  try {
    //Languages
    const languages = await getLanguages();
    //Surgerys
    const surgeries = await getSurgeries();
    //Questions
    const questions = await getQuestions();
    //getting sex ENUM options
    const sex = await getSex();
    //getting age ENUM options
    const ageGroup = await getAgeGroup();

    res.json({
      listOfSurgeries: surgeries.rows,
      listOfLanguages: languages.rows,
      listOfSex: sex,
      listOfAgeGroups: ageGroup,
      listOfQuestions: questions,
    });
  } catch (err) {
    res.json(err);
  }
};
