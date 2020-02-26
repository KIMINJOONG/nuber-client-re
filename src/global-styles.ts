import reset from "styled-reset";
import { createGlobalStyle } from "./type-components";

export const GlobalStyle = createGlobalStyle`${reset} 
  @import url("https://fonts.googleapis.com/css?family=Maven+Pro");
  *{box-sizing: border-box;}
  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a{ color: inherit; text-decoration: none;}
  input,
  button{
    &:focus,
    &:active{outline: none}
  }
`;
