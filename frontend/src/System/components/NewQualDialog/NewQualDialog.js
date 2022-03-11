import React, { useState, useEffect } from "react";

// REACT
import { Grid, Button, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// COMPONENTS
import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../Shared/components/Input/SelectMenu";
import DatePicker from "../../../Shared/components/Input/DatePicker";

// ICONS
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const NewQualDialog = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [addQualDisabled, setAddQualDisabled] = useState(true);
  const [selectInvoices, setSelectInvoices] = useState([]);
  const [inputState, setInputState] = useState({
    invoice: "",
    qualName: "",
    plannedStart: "",
    plannedEnd: "",
    dueDate: "",
    tests: [],
    description: "",
  });

  //   Parse Invoices into Select Menu Format
  useEffect(() => {
    if (props.open) {
      console.log(props.invoices);
    }
  }, [props.open, props.invoices]);

  const newQualHandler = () => {};

  //   RESET INPUTS HANDLER
  const resetInputHandler = () => {
    setInputState({
      invoice: "",
      qualName: "",
      plannedStart: "",
      plannedEnd: "",
      dueDate: "",
      tests: [],
      description: "",
    });
  };

  //   INPUT HANDLER
  const inputHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "qualName") {
      value = event.target.value.toUpperCase();
    }
    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

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
            label="Qual Details"
            variant="contained"
            sx={{
              borderRadius: "5px",
              marginTop: "5px",
              marginBottom: "5px",
              minWidth: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectMenu
            required
            label="Select Invoice"
            data={props.invoices}
            onChange={inputHandler}
            value={inputState.invoice}
            name="qual"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Qual Name"
            required
            name="qualName"
            onChange={inputHandler}
            value={inputState.qualName}
          />
        </Grid>
        <Grid item xs={12}>
          <Chip
            label="Qual Schedule"
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
