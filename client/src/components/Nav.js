//-----IMPORTS-----
//React
import React from "react";
//Styled-Components
import styled from "styled-components";
//Images
import gistmdLogo1 from "../img/gistmdLogo1.png";
import gistmdFooter1 from "../img/gistmdFooter1.png";
import { Router, useNavigate } from "react-router-dom";

const Nav = () => {
  let navigate = useNavigate();
  const backHome = () => {
    let path = `/`;

    navigate(path);
  };

  return (
    <StyledNav>
      <Ul>
        <div>
          <Logo onClick={backHome} src={gistmdLogo1} alt="gistmd logo" />
        </div>
        <div>
          <HeaderPic src={gistmdFooter1} alt="" />
        </div>
      </Ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  background-color: rgb(230, 50, 79);
  z-index: 100;
  border-top: solid 0.1rem rgb(65, 65, 65);
  border-bottom: solid 0.1rem rgb(65, 65, 65);
`;

const Ul = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20vh;
`;

const Logo = styled.img`
  margin: 1rem;
  height: 80%;
  width: 100px;

  /* border-right: solid 0.5rem papayawhip; */
  &:hover {
    scale: 1.2;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;
const HeaderPic = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export default Nav;
