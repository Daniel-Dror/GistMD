import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Router, useNavigate } from "react-router-dom";

const questionContext = createContext(null);

export const QuestionProvider = ({ children }) => {
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
  let submitNewPatient = {
    postAgeGroup,
    postSex,
    postSurgery,
    postLanguage,
  };
  let navigate = useNavigate();
  const backHome = () => {
    let path = `/`;
    navigate(path);
  };
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
  const arrayOflanguagesString = languageList.map((x) => {
    return { label: x.name, value: x.uid };
  });
  const arrayOfSurgeriesString = surgeryList.map((x) => {
    return { label: x.name, value: x.uid };
  });

  const newPatientInitialize = () => {
    setPostSurgery(null);
    setPostLanguage(null);
    setPostAgeGroup(null);
    setPostSex(null);
  };

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
      }}
    >
      {children}
    </questionContext.Provider>
  );
};

export default questionContext;
