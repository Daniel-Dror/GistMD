//Imports
import React, { useContext, useEffect } from "react";
import OnBoardingNav from "../components/OnBoardingNav";
import QuestionArea from "../components/QuestionArea";
import questionContext from "../context/questionContext";

const AddNewPatient = () => {
  //context
  const { newPatientInitialize, setQuestionIndex } =
    useContext(questionContext);
  //Initialize the new patient object
  useEffect(() => {
    newPatientInitialize();
    setQuestionIndex(0);
  }, []);

  //returns the all the components that are necessary for the add patient procces
  return (
    <div>
      <OnBoardingNav />
      <QuestionArea />
    </div>
  );
};

export default AddNewPatient;
