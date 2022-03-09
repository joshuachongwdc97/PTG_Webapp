import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DarkContext } from "./Shared/context/dark-context";
import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";

import Inventory from "./Inventory/Inventory";
import System from "./System/System";
import Team from "./Team/Team";
import Auth from "./Auth/Auth";
import Admin from "./Admin/Admin";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Layout from "./Layout/Layout";

const Main = () => {
  const { userId, role, email, token, login, logout } = useAuth();
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
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            email: email,
            role: role,
            login: login,
            logout: logout,
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
                  <Route path="/team" exact={true}>
                    <Team />
                  </Route>
                  <Route path="/auth" exact={true}>
                    <Auth />
                  </Route>
                  {role === "admin" && (
                    <Route path="/admin" exact={true}>
                      <Admin />
                    </Route>
                  )}
                </Switch>
              </Layout>
            </Router>
          </ThemeProvider>
        </AuthContext.Provider>
      </DarkContext.Provider>
    </React.Fragment>
  );
};

export default Main;
