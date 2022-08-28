import React, { useContext } from "react";
import styled from "styled-components";
import questionContext from "../../context/questionContext";
import CreatableSelect from "react-select/creatable";
import { motion } from "framer-motion";

const SurgeryQuestion = () => {
  //CONTEXT variables, STATES and FUNCTIONS
  const { postSurgery, handleChange, arrayOfSurgeriesString } =
    useContext(questionContext);
  //RETURNS surgery select question
  return (
    <StyledSelect
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CreatableSelect
        value={postSurgery}
        isClearable
        onChange={handleChange}
        options={arrayOfSurgeriesString}
      />
    </StyledSelect>
  );
};

const StyledSelect = styled(motion.div)`
  width: 40%;
  margin: 0 auto;
  z-index: 4;
`;

export default SurgeryQuestion;
