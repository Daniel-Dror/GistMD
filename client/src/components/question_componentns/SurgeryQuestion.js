import React, { useContext } from "react";
import styled from "styled-components";
import questionContext from "../../context/questionContext";
import CreatableSelect from "react-select/creatable";

const SurgeryQuestion = () => {
  const { postSurgery, handleChange, arrayOfSurgeriesString } =
    useContext(questionContext);

  return (
    <StyledSelect>
      <CreatableSelect
        value={postSurgery}
        isClearable
        onChange={handleChange}
        options={arrayOfSurgeriesString}
      />
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  width: 40%;
  margin: 0 auto;
  z-index: 4;
`;

export default SurgeryQuestion;
