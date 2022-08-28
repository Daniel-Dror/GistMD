const pool = require("../db");

exports.getAllPatients = async () => {
    const getAllPatients = await pool.query(
        "SELECT patient.uid, patient.age, patient.sex, surgery.name as surgery, language.name as language FROM patient INNER JOIN surgery ON patient.surgery_uid=surgery.uid INNER JOIN language ON patient.language_uid=language.uid;"
    );
    return getAllPatients
};

exports.surgery_UuidCheck = async (uid) => {
    return await pool.query(
        "SELECT uid FROM surgery WHERE uid =($1);",
        [uid]
    );
}
exports.language_UuidCheck = async (uid) => {
    return await pool.query(
        "SELECT uid FROM language WHERE uid =($1);",
        [uid]
    );
}


exports.language_StringCheck = async (uid) => {
    return await pool.query(
        "SELECT uid FROM language WHERE name =($1);",
        [uid]
    );
}

exports.surgery_StringCheck = async (uid) => {
    return await pool.query(
        "SELECT uid FROM surgery WHERE name =($1);",
        [uid]
    );
}



exports.surgery_StringInsert = async (uid) => {

    return await pool.query(
        "INSERT INTO surgery VALUES (uuid_generate_v4(), $1) RETURNING uid;",
        [uid]
    );
}

exports.language_StringInsert = async (uid) => {

    return await pool.query(
        "INSERT INTO language VALUES (uuid_generate_v4(), $1) RETURNING uid;",
        [uid]
    );
}

exports.addNewPatient = async (age, sex, surgery_uid, language_uid) => {

    //Insert new patient with all valid variables, returns new patient uid
    return await pool.query(
        "INSERT INTO patient ( uid, age, sex, surgery_uid, language_uid) VALUES(uuid_generate_v4(), $1, $2, $3, $4) RETURNING patient.uid;",
        [age, sex, surgery_uid, language_uid]
    );
}

exports.getNewPatient = async (addNewPatient) => {

    //Using the uid to res the new patient
    return await pool.query(
        "SELECT patient.uid, patient.age, patient.sex, surgery.name as surgery, language.name as language FROM patient INNER JOIN surgery ON patient.surgery_uid=surgery.uid INNER JOIN language ON patient.language_uid=language.uid WHERE patient.uid =($1);",
        [addNewPatient.rows[0].uid]
    );
}




exports.getLanguages = async () => {
    return await pool.query(
        "SELECT DISTINCT name, uid FROM language;"
    );
}

//Surgerys
exports.getSurgeries = async () => {
    return await pool.query(
        "SELECT DISTINCT name, uid FROM surgery;"
    );
}

//Questions
exports.getQuestions = async () => {
    return await pool.query("SELECT * from question;");
}

//getting sex ENUM options
exports.getSex = async () => {
    return await pool.query("SELECT enum_range(NULL::binary_sex);");
}

//getting age ENUM options
exports.getAgeGroup = async () => {
    return await pool.query("SELECT enum_range(NULL::age_group);");
}