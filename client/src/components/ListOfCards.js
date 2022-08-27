import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";

const ListOfCards = () => {
  const [cardsList, setCardsList] = useState([]);

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

  return (
    <List>
      <hr />
      <ListHeader>
        <h1>Patient's List</h1>
        <Link to={"/add"}>
          <Button>Add Patient</Button>
        </Link>
      </ListHeader>
      <hr />
      {cardsList.length > 0 &&
        cardsList.map((card) => {
          return <Card key={card.uid} card={card} />;
        })}
    </List>
  );
};

const List = styled.div`
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
