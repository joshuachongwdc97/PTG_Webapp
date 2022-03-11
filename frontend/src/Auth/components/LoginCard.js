import React, { useState, useContext } from "react";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";

// COMPONENTS
import BasicCard from "../../Shared/components/Card/BasicCard";

// CONTEXTS
import { AuthContext } from "../../Shared/context/auth-context";

// HOOKS
import { useHttpClient } from "../../Shared/hooks/http-hook";

// TRANSITIONS
import Animate from "../../Shared/transitions/Animate";

// ICONS
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const LoginCard = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loginState, setLoginState] = useState("");

  const inputHandler = (prop) => (event) => {
    setInputState({ ...inputState, [prop]: event.target.value });
  };

  const showPasswordHandlder = () => {
    setInputState({
      ...inputState,
      showPassword: !inputState.showPassword,
    });
  };

  const loginHandler = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/user/login",
        "POST",
        JSON.stringify({
          email: inputState.email,
          password: inputState.password,
        }),
        { "Content-Type": "application/json" }
      );

      setInputState({
        email: "",
        password: "",
        showPassword: false,
      });

      auth.login(
        responseData.userId,
        responseData.token,
        responseData.email,
        responseData.role
      );

      setLoginState("success");
    } catch (err) {
      setLoginState("failed");
    }
  };

  return (
    <Animate show>
      <BasicCard maxWidth="600px">
        <Grid container rowSpacing={6} align="center">
          <Grid item container xs={12} rowSpacing={3}>
            <Grid item xs={12}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOpenRoundedIcon />
              </Avatar>
              <Typography variant="h5">Log In</Typography>
            </Grid>
            {loginState === "failed" && (
              <Grid item xs={12}>
                <Alert severity="error" variant="filled">
                  Your login attempt has failed. Please try again.
                </Alert>
              </Grid>
            )}
            {loginState === "success" && (
              <Grid item xs={12}>
                <Alert variant="filled">Login success!</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl variant="outlined" sx={{ width: "100%" }} required>
                <InputLabel htmlFor="outlined-adornment-email">
                  Email Address
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  value={inputState.email}
                  onChange={inputHandler("email")}
                  label="Email Address"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" sx={{ width: "100%" }} required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={inputState.showPassword ? "text" : "password"}
                  value={inputState.password}
                  onChange={inputHandler("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPasswordHandlder}
                        edge="end"
                      >
                        {inputState.showPassword ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container xs={12} rowSpacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="info"
                sx={{ width: "100%" }}
                onClick={loginHandler}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="info"
                sx={{ width: "100%" }}
                onClick={props.switchModeHandler}
              >
                Make a Request
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </BasicCard>
    </Animate>
  );
};

export default LoginCard;
