import React, { useContext } from "react";
import styled from "styled-components";
import questionContext from "../../context/questionContext";

const SexQuestion = () => {
  const { postSex, setPostSex } = useContext(questionContext);

  return (
    <StyledRadio>
      <label htmlFor="Male">
        <input
          type="radio"
          name="sex"
          id="Male"
          onChange={() => setPostSex("Male")}
          checked={postSex === "Male"}
        />
        Male
      </label>
      <label htmlFor="Female">
        <input
          type="radio"
          name="sex"
          id="Female"
          onChange={() => setPostSex("Female")}
          checked={postSex === "Female"}
        />
        Female
      </label>
    </StyledRadio>
  );
};

const StyledRadio = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 0.75rem 0rem;

  input[type="radio"] {
    background-color: #ddd;
    background-image: -webkit-linear-gradient(
        0deg,
        transparent 20%,
        hsla(0, 0%, 100%, 0.7),
        transparent 80%
      ),
      -webkit-linear-gradient(90deg, transparent 20%, hsla(0, 0%, 100%, 0.7), transparent
            80%);
    border-radius: 10px;
    box-shadow: inset 0 1px 1px hsla(0, 0%, 100%, 0.8),
      0 0 0 1px hsla(0, 0%, 0%, 0.6), 0 2px 3px hsla(0, 0%, 0%, 0.6),
      0 4px 3px hsla(0, 0%, 0%, 0.4), 0 6px 6px hsla(0, 0%, 0%, 0.2),
      0 10px 6px hsla(0, 0%, 0%, 0.2);
    cursor: pointer;
    display: inline-block;
    height: 15px;
    margin-right: 15px;
    position: relative;
    width: 15px;
    -webkit-appearance: none;
  }

  input[type="radio"]:after {
    background-color: #444;
    border-radius: 25px;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.4),
      0 1px 1px hsla(0, 0%, 100%, 0.8);
    content: "";
    display: block;
    height: 7px;
    left: 4px;
    position: relative;
    top: 4px;
    width: 7px;
  }
  input[type="radio"]:checked:after {
    background-color: #e62143;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.4),
      inset 0 2px 2px hsla(0, 0%, 100%, 0.4), 0 1px 1px hsla(0, 0%, 100%, 0.8),
      0 0 2px 2px hsla(0, 70%, 70%, 0.4);
  }
`;

export default SexQuestion;
