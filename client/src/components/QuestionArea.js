//Imports
import React, { useState, useContext, useEffect } from "react";
import questionContext from "../context/questionContext";
import styled from "styled-components";
import AgeQuestion from "./question_componentns/AgeQuestion";
import SexQuestion from "./question_componentns/SexQuestion";
import LanguageQuestion from "./question_componentns/LanguageQuestion";
import SurgeryQuestion from "./question_componentns/SurgeryQuestion";
import { motion } from "framer-motion";

//this component includes navigation to all the question managed by the navbar
const QuestionArea = () => {
  //CONTEXT
  const {
    questionIndex,
    setQuestionIndex,
    questionList,
    submitNewPatient,
    submitHandler,
  } = useContext(questionContext);

  //SUBMIT button flag
  const [disableSubmit, setDisableSubmit] = useState(false);

  //handle visibility to the submit button(visible/invisivible)
  useEffect(() => {
    checkSubmit();
  }, [submitNewPatient]);

  const checkSubmit = () => {
    let count = Object.entries(submitNewPatient).length;
    for (const [key, value] of Object.entries(submitNewPatient)) {
      if (value === null) {
        count--;
      }
    }
    if (count === Object.entries(submitNewPatient).length) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };

  //returns one question compomemt managed by a self invoking function and the buttons
  return (
    <StyledQuestionArea>
      <h3>{questionList[questionIndex]?.value}</h3>
      <div>
        {(function () {
          if (questionIndex === 0) {
            return <AgeQuestion />;
          }

          if (questionIndex === 1) {
            return <SexQuestion />;
          }

          if (questionIndex === 2) {
            return <LanguageQuestion />;
          }

          if (questionIndex === 3) {
            return <SurgeryQuestion />;
          }
        })()}
      </div>
      <div>
        <Buttons
          disabled={questionIndex === 0}
          onClick={() => {
            if (questionIndex !== 0) {
              setQuestionIndex(questionIndex - 1);
            }
          }}
        >
          prev
        </Buttons>
        <Buttons
          disabled={questionIndex === questionList.length - 1}
          onClick={() => {
            if (questionIndex < questionList.length - 1) {
              setQuestionIndex(questionIndex + 1);
            }
          }}
        >
          next
        </Buttons>
      </div>
      <SubmitBtn onClick={submitHandler} disabled={disableSubmit}>
        Submit
      </SubmitBtn>
    </StyledQuestionArea>
  );
};

const StyledQuestionArea = styled.div`
  text-align: center;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-weight: 100;
    font-size: 1.75rem;
    padding: 1rem;
  }
`;

const Buttons = styled.button`
  background-color: #e62143;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0rem 1rem;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    background-color: #e62143;
  }

  &:disabled,
  &[disabled] {
    background-color: #cbcbcb;
  }
`;

const SubmitBtn = styled.button`
  background-color: initial;
  background-image: linear-gradient(-180deg, #68adf2, #3b86a3);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, Roboto, "Helvetica Neue", Arial,
    sans-serif;
  height: 44px;
  line-height: 44px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 20%;

  border: 0;
  margin: 0 auto;

  &:hover {
    transition: 0.3s all;
    background: #4578aa;
  }

  &:disabled,
  &[disabled] {
    background: #cbcbcb;
  }
`;
export default QuestionArea;
