const express = require("express");

const patientController = require('../controllers/patientController')

const patientRouter = express.Router();

//Routes
//GET req from '/' returns all rows from patient table.
patientRouter.get("/", patientController.getPatientTable)


//CREATE new patient (includes language/surgey fields check)
//types of data:
//age-number: 0-3.
//sex-string: 'Male', 'Female'.
//surgery-string: uuid_v4(for an existing surgery), string(for a new surgery to add).
//language-string: uuid_v4(for an existing language), string(for a new language to add).
//RETURN new patient or throw an error in the specific case.
patientRouter.post("/patient", patientController.createPatient)


//GET all Surgerys, languages, Ages, Sex, Questions
patientRouter.get("/addpatient", patientController.addPatient)


module.exports = patientRouter;