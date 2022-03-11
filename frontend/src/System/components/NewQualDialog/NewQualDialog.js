import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";

import { Grid, Chip, Button } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../Shared/components/Input/SelectMenu";
import DatePicker from "../../../Shared/components/Input/DatePicker";
import { LoadingButton } from "@mui/lab";

// ICONS
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const NewQualDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [inputState, setInputState] = useState({
    soda: "",
    test: "",
    invoice: "",
    status: "Pending",
    plannedStart: new Date().toString(),
    plannedEnd: new Date().toString(),
  });
  const [invoices, setInvoices] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [tests, setTests] = useState([]);
  const [addQualDisabled, setAddQualDisabled] = useState(true);
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
      invoice: "",
      status: "Pending",
      plannedStart: new Date().toString(),
      plannedEnd: new Date().toString(),
    });
  };

  // Get Drive Programs
  const getDrvPrgms = async () => {
    console.log("Fetching Drive Programs");
    try {
      let responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);

      console.log("Drive Programs fetched");
    } catch (err) {}
  };

  // Get Invoices
  const getInvoices = async () => {
    console.log("Fetching Invoices");
    try {
      let responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/invoice"
      );

      // Filter Active Invoices
      responseData = responseData.invoices.filter((inv) => {
        return inv.status === "Active";
      });

      // Sort Invoices by Received Date (Desc Sort)
      responseData = responseData.sort((a, b) =>
        new Date(a.dateReceived) > new Date(b.dateReceived)
          ? -1
          : new Date(b.dateReceived) > new Date(a.dateReceived)
          ? 1
          : 0
      );

      setInvoices(
        responseData.map((inv) => {
          return { value: inv.id, label: inv.name, drvPrgm: inv.drvPrgm };
        })
      );

      console.log("Invoices Fetched");
    } catch (err) {}
  };

  // Get Tests
  const getTests = async () => {
    console.log("Fetching Tests");
    try {
      let responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/test/all"
      );

      let selectedInv = invoices.filter((inv) => {
        return inv.value === inputState.invoice;
      })[0];

      responseData = responseData.tests.filter((test) => {
        return test.drvPrgm === selectedInv.drvPrgm;
      });

      const program = drvPrgms.filter((prgm) => {
        return prgm.id === selectedInv.drvPrgm;
      })[0];

      setTests(
        responseData.map((test) => {
          return {
            value: test.id,
            label: program.alias + " " + test.drvType + " " + test.test,
          };
        })
      );

      console.log("Tests Fetched");
    } catch (err) {}
  };

  useEffect(
    () => {
      if (props.open) {
        getInvoices();
        getDrvPrgms();
      } else {
        setInvoices([]);
        setDrvPrgms([]);
        resetInputHandler();
      }
    }, // eslint-disable-next-line
    [props.open]
  );

  useEffect(
    () => {
      if (invoices.length > 0 && inputState.invoice !== "") {
        getTests();
      } else {
        setTests([]);
      }
    }, // eslint-disable-next-line
    [invoices, inputState.invoice]
  );

  useEffect(() => {
    if (
      inputState.soda &&
      inputState.invoice &&
      inputState.test &&
      inputState.status &&
      inputState.plannedStart &&
      inputState.plannedEnd
    ) {
      setAddQualDisabled(false);
    } else {
      setAddQualDisabled(true);
    }

    if (inputState.soda || inputState.invoice || inputState.test) {
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

  const newQualHandler = async () => {
    setSubmitting(true);
    const newQual = {
      soda: inputState.soda,
      qual: inputState.qual,
      test: inputState.test,
      invoice: inputState.invoice,
      plannedStart: inputState.plannedStart,
      plannedEnd: inputState.plannedEnd,
    };

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/qual/add",
        "POST",
        JSON.stringify(newQual),
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
          onClick={newQualHandler}
          color="success"
          disabled={addQualDisabled}
          loading={submitting}
          loadingPosition="start"
        >
          Add New Qual
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      title="New Qual"
      actions={DialogActions}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chip
            label="Test Details"
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
            label="Select Invoice"
            data={invoices}
            onChange={inputHandler}
            value={inputState.invoice}
            name="invoice"
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
            label="Test Status"
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

export default NewQualDialog;
