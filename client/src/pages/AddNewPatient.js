import React, { useContext, useEffect } from "react";
import OnBoardingNav from "../components/OnBoardingNav";
import QuestionArea from "../components/QuestionArea";
import questionContext from "../context/questionContext";

const AddNewPatient = () => {
  const { newPatientInitialize, setQuestionIndex } =
    useContext(questionContext);

  useEffect(() => {
    newPatientInitialize();
    setQuestionIndex(0);
  }, []);
  return (
    <div>
      <OnBoardingNav />
      <QuestionArea />
    </div>
  );
};

export default AddNewPatient;
