import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DarkContext } from "./Shared/context/dark-context";
import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import { useHttpClient } from "./Shared/hooks/http-hook";

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
  const { sendRequest } = useHttpClient();
  const { userId, role, email, token, login, logout } = useAuth();
  const [dark, setDark] = useState(true);
  const [adminNotif, setAdminNotif] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
  };

  let theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
  });

  const checkUsers = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/user/",
        "GET",
        null,
        { Authorization: "Bearer " + token }
      );

      setAdminNotif(
        responseData.users.map((user) => user.approved).includes(false)
      );
    } catch (err) {}
  };

  // check user data periodically for pending requests
  useEffect(
    () => {
      if (role === "admin") {
        checkUsers();

        const interval = setInterval(() => {
          checkUsers();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
      }
    },
    // eslint-disable-next-line
    [role]
  );

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
              <Layout adminNotif={adminNotif}>
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
