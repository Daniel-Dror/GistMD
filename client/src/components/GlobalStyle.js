import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Roboto',Verdana, Geneva, Tahoma, sans-serif;
        color: rgb(65, 65, 65);
        min-height: 100vh;
        max-width: 100%;
        background-color: papayawhip;
    }
    `;

export default GlobalStyle;
