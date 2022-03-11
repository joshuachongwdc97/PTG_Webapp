import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Alert } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../../../../Shared/components/Input/TextFieldWIcon";
import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";
import Animate from "../../../../../../Shared/transitions/Animate";

const AddDrvPrgmDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const [showError, setShowError] = useState(false);
  const [inputState, setInputState] = useState({
    drvPrgm: "",
    alias: "",
  });
  const [inputReady, setInputReady] = useState(false);

  const inputHandler = (event) => {
    let value = event.target.value.toUpperCase();
    setInputState({ ...inputState, [event.target.name]: value });
  };

  // reset all inputs and errors on close
  const closeDialog = () => {
    setInputState({
      drvPrgm: "",
      alias: "",
    });
    setShowError(false);
    props.close();
  };

  // add new drive to database and display newly added drive in drive program input field
  const addDrvPrgmHandler = async () => {
    let drvPrgmId;
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/drvProgram/add",
        "POST",
        JSON.stringify(inputState),
        { "Content-Type": "application/json" }
      );

      drvPrgmId = response.program.id;
    } catch (err) {
      console.log(err);
    }

    // fetch latest drvPrgms list
    props.getDrvPrgms();

    // set drive program input field to newly added drive program
    props.setInvDialogInputState({
      ...props.invInputState,
      drvPrgm: drvPrgmId,
    });

    closeDialog();
  };

  // list of drive program aliases to identify if input is unique
  const drvPrgmsArr = props.drvPrgms.map((drvPrgm) => {
    return drvPrgm.alias;
  });

  // input validation
  useEffect(() => {
    if (!inputState.drvPrgm || !inputState.alias) {
      setInputReady(false);
    } else if (drvPrgmsArr.includes(inputState.alias)) {
      setShowError(true);
      setInputReady(false);
    } else {
      setShowError(false);
      setInputReady(true);
    }
  }, [inputState, drvPrgmsArr]);

  return (
    <Dialog
      open={props.open}
      close={closeDialog}
      title="Add Drive Program"
      actions={
        <Button
          variant="contained"
          disabled={!inputReady}
          onClick={addDrvPrgmHandler}
        >
          Add Drive
        </Button>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Animate show={showError}>
            <Alert severity="error">
              Duplicate Drive Program Alias Detected!
            </Alert>
          </Animate>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Drive Program"
            //startIcon={<SearchIcon />}
            name="drvPrgm"
            onChange={inputHandler}
            autoComplete="off"
            value={inputState.drvPrgm}
          ></TextFieldWIcon>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Alias"
            //startIcon={<SearchIcon />}
            name="alias"
            onChange={inputHandler}
            autoComplete="off"
            value={inputState.alias}
            unique
            uniqueArr={drvPrgmsArr}
          ></TextFieldWIcon>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AddDrvPrgmDialog;
