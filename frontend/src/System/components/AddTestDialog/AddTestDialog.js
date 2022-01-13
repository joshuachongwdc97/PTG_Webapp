import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";

import { Grid, Button, Divider, Chip } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../Shared/components/Input/SelectMenu";

// ICONS
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const AddTestDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [inputState, setInputState] = useState({
    name: "",
    mode: "",
    duration: "",
    description: "",
    drvPrgm: "",
    drvType: "",
  });
  const [addedModes, setAddedModes] = useState([]);
  const [addModeDisable, setAddModeDisable] = useState(true);
  const [selectDrvPrgm, setSelectDrvPrgm] = useState([]);

  console.log(inputState.drvPrgm);

  // Get Drive Programs
  const getDrvPrgms = async () => {
    console.log("Fetching Drive Programs");
    try {
      let responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/drvProgram"
      );

      const selectData = responseData.programs.map((prgm) => {
        return {
          value: prgm.id,
          label: prgm.drvPrgm + " (" + prgm.alias + ") ",
        };
      });
      setSelectDrvPrgm(selectData);

      console.log("Drive Programs fetched");
    } catch (err) {}
  };

  useEffect(
    () => {
      if (props.open) {
        getDrvPrgms();
      } else {
        //   CLEAR INPUT STATE
        setInputState({
          name: "",
          mode: "",
          duration: "",
          description: "",
          drvPrgm: "",
          drvType: "",
        });
      }
    },
    // eslint-disable-next-line
    [props.open]
  );

  // MAKE SURE MODE AND DURATION IS FILLED BEFORE ADDING
  useEffect(() => {
    if (inputState.mode && inputState.duration) {
      setAddModeDisable(false);
    } else {
      setAddModeDisable(true);
    }
  }, [inputState.mode, inputState.duration]);

  const inputHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "name" || event.target.name === "mode") {
      value = event.target.value.toUpperCase();
    }
    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

  const DialogActions = (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<RestartAltRoundedIcon />}
        >
          Reset
        </Button>
      </Grid>
      <Grid item xs={8}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          color="success"
          startIcon={<AddCircleOutlineRoundedIcon />}
        >
          Add Test
        </Button>
      </Grid>
    </Grid>
  );

  const addModeHandler = () => {
    const newMode = {
      mode: inputState.mode,
      duration: inputState.duration,
    };
    setAddedModes([...addedModes, newMode]);
    setInputState({
      ...inputState,
      mode: "",
      duration: "",
    });
  };

  const delModeHandler = (mode) => {
    const delModes = addedModes.filter((md) => {
      return md.mode !== mode;
    });
    setAddedModes(delModes);
  };

  const AddedModesChips = addedModes.map((mode) => {
    return (
      <Chip
        label={mode.mode}
        variant="contained"
        onDelete={() => {
          delModeHandler(mode.mode);
        }}
        key={mode.mode}
        style={{ marginRight: "5px" }}
        color="primary"
      />
    );
  });

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      title="Add New Test"
      actions={DialogActions}
    >
      <Grid container columnSpacing={2} rowSpacing={3} alignItems={"center"}>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Test Name"
            required
            name="name"
            onChange={inputHandler}
            value={inputState.name}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectMenu
            required
            label="Drive Program"
            data={selectDrvPrgm}
            onChange={inputHandler}
            value={selectDrvPrgm.length > 0 ? inputState.drvPrgm : ""}
            name="drvPrgm"
          />
        </Grid>
        <Grid item xs={6}>
          <SelectMenu
            required
            label="Drive Type"
            data={[
              { label: "CMR", value: "CMR" },
              { label: "SMR", value: "SMR" },
              { label: "XMR", value: "XMR" },
            ]}
            onChange={inputHandler}
            value={inputState.drvType}
            name="drvType"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>Modes</Divider>
        </Grid>
        <Grid item xs={6}>
          <TextFieldWIcon
            label="Mode"
            name="mode"
            onChange={inputHandler}
            value={inputState.mode}
          />
        </Grid>
        <Grid item xs={3.5}>
          <TextFieldWIcon
            label="Test Duration (hr)"
            name="duration"
            onChange={inputHandler}
            value={inputState.duration}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={addModeHandler}
            disabled={addModeDisable}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          {AddedModesChips}
        </Grid>

        <Grid item xs={12}>
          <Divider>Description</Divider>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Description (optional)"
            name="description"
            onChange={inputHandler}
            value={inputState.description}
          />
        </Grid>
      </Grid>
    </BasicDialog>
  );
};

export default AddTestDialog;
