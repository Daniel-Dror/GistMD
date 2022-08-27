import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Card = ({ card }) => {
  return (
    <SingleCard>
      <div>
        <img src="//via.placeholder.com/150x150" alt="" />
        <CardTextInfo>
          <p>
            <strong>Age Group:</strong> {card.age}.
          </p>
          <p>
            <strong>Sex:</strong> {card.sex}.
          </p>
          <p>
            <strong>Surgery:</strong> {card.surgery}.
          </p>
          <p>
            <strong>Language:</strong> {card.language}.
          </p>
        </CardTextInfo>
      </div>
    </SingleCard>
  );
};

const SingleCard = styled.div`
  min-width: 25vw;
  width: fit-content;
  display: inline-block;
  margin: 2rem;
  padding: 0rem;
  border: 0.2rem solid grey;
  border-radius: 10%;
  /* box-shadow: 0.2rem 0.2rem 0.1rem lightslategrey; */
  overflow: hidden;
  &:hover {
    scale: 1.1;
    transition: all 0.3s ease;
    z-index: 0;
  }
  img {
    width: 100%;
    max-height: 200px;
  }

  @media screen and (max-width: 1000px) {
    width: 70vw;
  }
`;

const CardTextInfo = styled.div`
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  white-space: nowrap;
`;

export default Card;
