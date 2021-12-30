import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DarkContext } from "./Shared/context/dark-context";

import Inventory from "./Inventory/Inventory";
import System from "./System/System";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Layout from "./Layout/Layout";

const Main = () => {
  const [dark, setDark] = useState(true);

  const darkModeHandler = () => {
    setDark(!dark);
  };

  let theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
  });

  return (
    <React.Fragment>
      <DarkContext.Provider
        value={{
          dark: dark,
          toggle: darkModeHandler,
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <Switch>
                <Route path="/" exact={true}>
                  <Inventory />
                </Route>
                <Route path="/system" exact={true}>
                  <System />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </ThemeProvider>
      </DarkContext.Provider>
    </React.Fragment>
  );
};

export default Main;
