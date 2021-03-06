import React, { Fragment } from "react";
import { graphql } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import theme from "../../theme";
import { ThemeProvider } from "../../type-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer = ({ data }) => (
    <Fragment>
        <ThemeProvider theme={theme}>
            <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
        </ThemeProvider>
        <ToastContainer draggable={true} position={"bottom-center"} />
    </Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
