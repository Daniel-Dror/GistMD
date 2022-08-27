import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import questionContext from "../context/questionContext";

const OnBoardingNav = () => {
  const { questionList, questionIndex, setQuestionIndex } =
    useContext(questionContext);

  return (
    <AddPatientNavBar>
      <div>
        {questionList.length > 0 &&
          questionList.map((question, index) => {
            return (
              <Btn
                key={question.uid}
                onClick={() => {
                  setQuestionIndex(index);
                }}
                activebtn={index === questionIndex}
              >
                {question.title}
              </Btn>
            );
          })}
      </div>
    </AddPatientNavBar>
  );
};

const AddPatientNavBar = styled.nav`
  margin: 1rem 0.5rem;
  padding: 1rem;

  div {
    padding: 0 1rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Btn = styled.button`
  background: ${(props) => (props.activebtn ? "#fff" : "#e62143")};
  border-radius: 11px;
  box-sizing: border-box;
  color: ${(props) => (props.activebtn ? "#e62143" : "#fff")};
  cursor: pointer;
  display: flex;
  font-family: Mija, -apple-system, BlinkMacSystemFont, Roboto, "Roboto Slab",
    "Droid Serif", "Segoe UI", system-ui, Arial, sans-serif;
  font-size: 1.15em;
  font-weight: 700;
  justify-content: center;
  line-height: 33.4929px;
  padding: 0.8em 3em;
  text-align: center;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  text-shadow: rgba(0, 0, 0, 0.3) 1px 1px 1px;
  text-underline-offset: 1px;
  transition: all 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  transition: 0.3s all;

  border: 0;
  box-shadow: ${(props) =>
    props.activebtn ? "rgba(0, 0, 0, .3) 0 3px 3px inset" : ""};

  @media screen and (max-width: 1000px) {
    font-size: 1em;
    padding: 0.2em 1em;
  }

  &:hover {
    border-bottom-style: none;
    border-color: #dadada;
    transform: scale(1.1);
  }
`;
export default OnBoardingNav;
