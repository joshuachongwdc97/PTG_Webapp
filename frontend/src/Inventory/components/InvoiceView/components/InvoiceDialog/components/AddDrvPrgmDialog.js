import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Alert } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../../../../Shared/components/Input/TextFieldWIcon";
import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";

// VARIABLES
import { serverName } from "../../../../../../Shared/variables/Variables";

const AddDrvPrgmDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const [inputState, setInputState] = useState({
    drvPrgm: "",
    alias: "",
  });
  const [inputReady, setInputReady] = useState(false);
  const [prgmExistError, setPrgmExistError] = useState(false);

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
    setPrgmExistError(false);
    props.close();
  };

  const addDrvPrgmHandler = async () => {
    try {
      await sendRequest(
        "http://" + serverName + "/api/drvProgram/add",
        "POST",
        JSON.stringify(inputState),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.log(err);
    }

    props.getDrvPrgms();
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
      setPrgmExistError(true);
      setInputReady(false);
    } else {
      setPrgmExistError(false);
      setInputReady(true);
    }
  }, [inputState, drvPrgmsArr]);

  return (
    <Dialog open={props.open} close={closeDialog}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {prgmExistError && (
            <Alert sx={{ mb: 2 }} severity="error">
              Duplicate Drive Program Alias Detected!
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Drive Program"
            //icon={<SearchIcon />}
            name="drvPrgm"
            onChange={inputHandler}
            autoComplete="off"
            value={inputState.drvPrgm}
          ></TextFieldWIcon>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Alias"
            //icon={<SearchIcon />}
            name="alias"
            onChange={inputHandler}
            autoComplete="off"
            value={inputState.alias}
            unique
            uniqueArr={drvPrgmsArr}
          ></TextFieldWIcon>
        </Grid>
        <Grid item container xs={12} justifyContent={"end"}>
          <Button
            variant="contained"
            disabled={!inputReady}
            onClick={addDrvPrgmHandler}
          >
            Add Drive
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default AddDrvPrgmDialog;
