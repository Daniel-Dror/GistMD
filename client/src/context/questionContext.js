//Imports

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//create context
const questionContext = createContext(null);

//context provider
export const QuestionProvider = ({ children }) => {
  //states
  const [surgeryList, setSurgeryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [ageGroupList, setAgeGroupList] = useState(null);
  const [sexList, setSexList] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [postSurgery, setPostSurgery] = useState(null);
  const [postLanguage, setPostLanguage] = useState(null);
  const [postAgeGroup, setPostAgeGroup] = useState(null);
  const [postSex, setPostSex] = useState(null);

  //object of the new patient
  let submitNewPatient = {
    postAgeGroup,
    postSex,
    postSurgery,
    postLanguage,
  };

  //navigate to home page with list of patients
  let navigate = useNavigate();
  const backHome = () => {
    let path = `/`;
    navigate(path);
  };

  //handle the submit of new patient, post it to the backend and go to home page
  const submitHandler = () => {
    console.log(submitNewPatient);
    axios
      .post("http://localhost:4000/patient", {
        age: postAgeGroup,
        sex: postSex,
        surgery_uid: postSurgery.value,
        language_uid: postLanguage.value,
      })
      .then((res) => {
        backHome();
      })
      .catch(function (error) {
        // handle error
        setIsLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    setIsLoading(true);

    //GET data from backend before starting the onboarding proccess
    axios
      .get("http://localhost:4000/addpatient")
      .then((res) => {
        setIsLoading(false);
        setSurgeryList(res.data.listOfSurgeries);
        setLanguageList(res.data.listOfLanguages);
        setAgeGroupList([0, 1, 2, 3]);
        setSexList(["Male", "Female"]);
        setQuestionList(res.data.listOfQuestions.rows);
      })
      .catch(function (error) {
        // handle error
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  //nadle the change on the create-select text input
  const handleChange = (newValue, actionMeta) => {
    if (questionIndex === 2) {
      setPostLanguage(newValue);
      console.log(postLanguage);
    }
    if (questionIndex === 3) {
      setPostSurgery(newValue);
      console.log(postSurgery);
    }
  };

  //creating an from language and surgeries
  const arrayOflanguagesString = languageList.map((x) => {
    return { label: x.name, value: x.uid };
  });
  const arrayOfSurgeriesString = surgeryList.map((x) => {
    return { label: x.name, value: x.uid };
  });

  //initialize the values for the  new patient object
  const newPatientInitialize = () => {
    setPostSurgery(null);
    setPostLanguage(null);
    setPostAgeGroup(null);
    setPostSex(null);
  };

  //CONTEXT PROVIDER
  return (
    <questionContext.Provider
      value={{
        surgeryList,
        languageList,
        ageGroupList,
        sexList,
        questionList,
        isLoading,
        questionIndex,
        setQuestionIndex,
        submitNewPatient,
        postSurgery,
        setPostSurgery,
        postLanguage,
        setPostLanguage,
        postAgeGroup,
        setPostAgeGroup,
        postSex,
        setPostSex,
        submitHandler,
        handleChange,
        arrayOflanguagesString,
        arrayOfSurgeriesString,
        newPatientInitialize,
        backHome,
      }}
    >
      {children}
    </questionContext.Provider>
  );
};

export default questionContext;
