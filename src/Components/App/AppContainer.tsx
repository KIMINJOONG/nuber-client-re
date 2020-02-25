import React from "react";
import { graphql } from "react-apollo";
import reset from "styled-reset";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";
import { ThemeProvider, createGlobalStyle } from "../../type-components";
import theme from "../../theme";

const GlobalStyle = createGlobalStyle`${reset}`;
const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </>
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
