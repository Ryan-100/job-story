import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;

    font-family: Poppins, Helvetica, Sans-Serif;

    & .required {
      color: red;
    }
  }

`;

export default GlobalStyle;
