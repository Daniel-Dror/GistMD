//Imports
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ListOfCards = () => {
  //State which stores the list of patient from the DB
  const [cardsList, setCardsList] = useState([]);
  //GET req for each time we render this component
  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((res) => {
        setCardsList(res.data.rows);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  //RETURNS the list of patients using the Card component after maping the state above.
  return (
    <List
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <hr />
      <ListHeader>
        <h1>Patient's List</h1>
        <Link to={"/add"}>
          <Button>Add Patient</Button>
        </Link>
      </ListHeader>
      <hr />
      {cardsList ? (
        cardsList.map((card) => {
          return <Card key={card.uid} card={card} />;
        })
      ) : (
        <Error>There are no patients, please add a new patient.</Error>
      )}
    </List>
  );
};

const List = styled(motion.div)`
  width: 100%;
  margin: 1rem 0;
`;
const ListHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 1rem 1rem 1rem 0;
  }
`;

const Error = styled.h1`
  font-size: 1rem;
  font-weight: lighter;
  color: #a30606;
  background-color: hsla(0, 100%, 50%, 0.4);
  border: solid 0rem #a30606;
  margin: 1rem auto;
  padding: 1rem 0.5rem;
  border-radius: 2rem;
`;
const Button = styled.button`
  font-size: inherit;
  padding: 1rem 2rem;
  margin: 0.8rem 0;
  border: solid 0.2rem rgb(65, 65, 65);
  border-radius: 1rem;
  color: rgb(52, 52, 52);
  background-color: papayawhip;
  &:hover {
    background-color: rgb(65, 65, 65);
    color: papayawhip;
    scale: 1.1;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  &:active {
    background-color: papayawhip;
    color: rgb(65, 65, 65);
    scale: 1;
    transition: all 0s ease;
  }
`;
export default ListOfCards;
