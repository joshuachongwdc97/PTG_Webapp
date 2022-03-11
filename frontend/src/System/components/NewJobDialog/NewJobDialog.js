import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { serverName } from "../../../Shared/variables/Variables";

import { Grid, Chip, Button } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../Shared/components/Input/SelectMenu";
import DatePicker from "../../../Shared/components/Input/DatePicker";
import { LoadingButton } from "@mui/lab";

// ICONS
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const NewJobDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [inputState, setInputState] = useState({
    soda: "",
    test: "",
    qual: "",
    status: "Pending",
    plannedStart: new Date().toString(),
    plannedEnd: new Date().toString(),
  });
  const [quals, setQuals] = useState([]);
  const [tests, setTests] = useState([]);
  const [addJobDisabled, setAddJobDisabled] = useState(true);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const inputHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "soda" || event.target.name === "qual") {
      value = event.target.value.toUpperCase();
    }
    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

  const resetInputHandler = () => {
    setInputState({
      soda: "",
      test: "",
      qual: "",
      status: "Pending",
      plannedStart: new Date().toString(),
      plannedEnd: new Date().toString(),
    });
  };

  // Get Tests
  // const getTests = async () => {
  //   console.log("Fetching Tests");
  //   try {
  //     let responseData = await sendRequest(
  //       "http://" + serverName + "/api/test/all"
  //     );

  //     let selectedInv = invoices.filter((inv) => {
  //       return inv.value === inputState.invoice;
  //     })[0];

  //     responseData = responseData.tests.filter((test) => {
  //       return test.drvPrgm === selectedInv.drvPrgm;
  //     });

  //     const program = drvPrgms.filter((prgm) => {
  //       return prgm.id === selectedInv.drvPrgm;
  //     })[0];

  //     setTests(
  //       responseData.map((test) => {
  //         return {
  //           value: test.id,
  //           label: program.alias + " " + test.drvType + " " + test.test,
  //         };
  //       })
  //     );

  //     console.log("Tests Fetched");
  //   } catch (err) {}
  // };

  useEffect(
    () => {
      if (props.open) {
      } else {
        setQuals([]);
        resetInputHandler();
      }
    }, // eslint-disable-next-line
    [props.open]
  );

  useEffect(
    () => {
      if (quals.length > 0 && inputState.qual !== "") {
        // getTests();
      } else {
        setTests([]);
      }
    }, // eslint-disable-next-line
    [quals, inputState.qual]
  );

  useEffect(() => {
    if (
      inputState.soda &&
      inputState.qual &&
      inputState.test &&
      inputState.status &&
      inputState.plannedStart &&
      inputState.plannedEnd
    ) {
      setAddJobDisabled(false);
    } else {
      setAddJobDisabled(true);
    }

    if (inputState.soda || inputState.qual || inputState.test) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
  }, [inputState]);

  const plannedStartHandler = (value) => {
    setInputState({
      ...inputState,
      plannedStart: value.toString(),
    });
  };

  const plannedEndHandler = (value) => {
    setInputState({
      ...inputState,
      plannedEnd: value.toString(),
    });
  };

  const newJobHandler = async () => {
    setSubmitting(true);
    const newJob = {
      soda: inputState.soda,
      qual: inputState.qual,
      test: inputState.test,
      plannedStart: inputState.plannedStart,
      plannedEnd: inputState.plannedEnd,
    };

    try {
      await sendRequest(
        "http://" + serverName + "/api/job/add",
        "POST",
        JSON.stringify(newJob),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    setSubmitting(false);
    props.close();
    props.getData();
  };

  const DialogActions = (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<RestartAltRoundedIcon />}
          disabled={resetDisabled}
          onClick={resetInputHandler}
        >
          Reset
        </Button>
      </Grid>
      <Grid item xs={8}>
        <LoadingButton
          startIcon={<AddCircleRoundedIcon />}
          variant="contained"
          fullWidth
          onClick={newJobHandler}
          color="success"
          disabled={addJobDisabled}
          loading={submitting}
          loadingPosition="start"
        >
          Add New Job
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      title="New Job"
      actions={DialogActions}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chip
            label="Job Details"
            variant="contained"
            sx={{
              borderRadius: "5px",
              marginTop: "5px",
              marginBottom: "5px",
              minWidth: "100%",
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWIcon
            label="SODA ID"
            required
            name="soda"
            onChange={inputHandler}
            value={inputState.soda}
          />
        </Grid>
        <Grid item xs={8}>
          <SelectMenu
            required
            label="Select Qual"
            data={quals}
            onChange={inputHandler}
            value={inputState.qual}
            name="qual"
          />
        </Grid>
        <Grid item xs={12}>
          <SelectMenu
            required
            label="Select Test"
            data={tests}
            onChange={inputHandler}
            value={inputState.test}
            name="test"
            disabled={inputState.invoice !== "" ? false : true}
          />
        </Grid>
        <Grid item xs={12}>
          <Chip
            label="Job Schedule"
            variant="contained"
            sx={{
              borderRadius: "5px",
              marginTop: "15px",
              marginBottom: "5px",
              minWidth: "100%",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            required
            label="Planned Start Date"
            value={new Date(inputState.plannedStart)}
            onChange={plannedStartHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            required
            label="Planned Completion Date"
            value={new Date(inputState.plannedEnd)}
            onChange={plannedEndHandler}
          />
        </Grid>
      </Grid>
    </BasicDialog>
  );
};

export default NewJobDialog;
