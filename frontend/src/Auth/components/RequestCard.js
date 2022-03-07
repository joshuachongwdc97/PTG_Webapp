import React, { useState } from "react";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";

// COMPONENTS
import BasicCard from "../../Shared/components/Card/BasicCard";
import Animate from "../../Shared/transitions/Animate";
import { useHttpClient } from "../../Shared/hooks/http-hook";

// VARIABLES
import { serverName } from "../../Shared/variables/Variables";

// ICONS
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";

const RequestCard = (props) => {
  const { sendRequest } = useHttpClient();
  const [inputState, setInputState] = useState({ email: "" });
  const [requestState, setRequestState] = useState("");

  const inputHandler = (prop) => (event) => {
    setInputState({ ...inputState, [prop]: event.target.value });
  };

  const requestHandler = async () => {
    try {
      if (!inputState.email.includes("@wdc.com")) {
        throw new Error("Invalid Email Address");
      }

      await sendRequest(
        "http://" + serverName + "/api/user/add",
        "POST",
        JSON.stringify({
          email: inputState.email,
        }),
        { "Content-Type": "application/json" }
      );

      setInputState({ email: "" });
      setRequestState("success");
    } catch (err) {
      setRequestState("failed");
    }
  };

  return (
    <Animate show>
      <BasicCard maxWidth="600px">
        <Grid container rowSpacing={3} align="center">
          <Grid item xs={12}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <HowToRegRoundedIcon />
            </Avatar>
            <Typography variant="h5">Request for Approval</Typography>
          </Grid>
          {requestState === "failed" && (
            <Grid item xs={12}>
              <Alert severity="error" variant="filled">
                Your request attempt has failed. Please try again.
              </Alert>
            </Grid>
          )}
          {requestState === "success" && (
            <Grid item xs={12}>
              <Alert variant="filled">Request success!</Alert>
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

          <Grid item container xs={12} rowSpacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="info"
                sx={{ width: "100%" }}
                onClick={requestHandler}
              >
                Request
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="info"
                sx={{ width: "100%" }}
                onClick={props.switchModeHandler}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </BasicCard>
    </Animate>
  );
};

export default RequestCard;
