//Imports
import React from "react";
import styled from "styled-components";
import ListOfCards from "../components/ListOfCards";
import { motion } from "framer-motion";

//retrns the list of cards
const Home = () => {
  return (
    <StyledHome>
      <ListOfCards />
    </StyledHome>
  );
};

const StyledHome = styled.div`
  width: 100%;

  text-align: center;
  min-height: 80vh;
  padding: 0 1rem;
  border-radius: 1rem;
`;

export default Home;
