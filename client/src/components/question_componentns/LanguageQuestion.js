//Imports
import React, { useContext } from "react";
import styled from "styled-components";
import questionContext from "../../context/questionContext";
import CreatableSelect from "react-select/creatable";
import { motion } from "framer-motion";

//RETURNS the language select question
const LanguageQuestion = () => {
  //CONTEXT variables, STATES and FUNCTIONS
  const { postLanguage, handleChange, arrayOflanguagesString } =
    useContext(questionContext);

  return (
    <StyledSelect
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CreatableSelect
        value={postLanguage}
        isClearable
        onChange={handleChange}
        options={arrayOflanguagesString}
      />
    </StyledSelect>
  );
};

const StyledSelect = styled(motion.div)`
  width: 40%;
  margin: 0 auto;
  z-index: 4;
`;

export default LanguageQuestion;
