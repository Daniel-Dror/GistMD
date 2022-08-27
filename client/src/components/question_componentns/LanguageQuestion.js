//Imports
import React, { useContext } from "react";
import styled from "styled-components";
import questionContext from "../../context/questionContext";
import CreatableSelect from "react-select/creatable";
//RETURNS the language select question
const LanguageQuestion = () => {
  //CONTEXT variables, STATES and FUNCTIONS
  const { postLanguage, handleChange, arrayOflanguagesString } =
    useContext(questionContext);

  return (
    <StyledSelect>
      <CreatableSelect
        value={postLanguage}
        isClearable
        onChange={handleChange}
        options={arrayOflanguagesString}
      />
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  width: 40%;
  margin: 0 auto;
  z-index: 4;
`;

export default LanguageQuestion;
