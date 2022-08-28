//Functions
//Checks if its the string is a valid uuid_v4 using regex expression
const validateUuid = (uuid) => {
    // Regular expression to check if string is a valid UUID
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid); // true/false
};
module.exports = { validateUuid };
