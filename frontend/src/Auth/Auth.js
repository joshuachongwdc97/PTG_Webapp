import React, { useState } from "react";
import { Grid } from "@mui/material";

// COMPONENTS
import LoginCard from "./components/LoginCard";
import RequestCard from "./components/RequestCard";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ height: "100%" }}
      alignContent="center"
    >
      <Grid item>
        {isLoginMode ? (
          <LoginCard switchModeHandler={switchModeHandler} />
        ) : (
          <RequestCard switchModeHandler={switchModeHandler} />
        )}
      </Grid>
    </Grid>
  );
};

export default Auth;
