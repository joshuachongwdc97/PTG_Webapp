import React, { useState, useReducer } from "react";
import { Divider, Grid } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../../../Shared/components/Input/TextFieldWIcon";
import OutlinedCard from "../../../../../Shared/components/Card/OutlinedCard";
import GlobalDriveSearchResults from "./components/GlobalDriveSearchResults";

// ICONS
import SearchIcon from "@mui/icons-material/Search";

const GlobalDriveSearchDialog = (props) => {
  // serial number and invoice id
  const [inputState, setInputState] = useState("");

  const inputHandler = (event) => {
    let value = event.target.value.toUpperCase();
    console.log(value.length - inputState.length);
    setInputState(value);
  };

  return (
    <Dialog open={props.open} close={props.close} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldWIcon
            required
            label="Serial Number"
            icon={<SearchIcon />}
            name="Serial Number"
            onChange={inputHandler}
            autoComplete="off"
            value={inputState}
            autoFocus
            onFocus={(event) => {
              event.target.select();
            }}
            helperText="Barcode Scanners Are Supported"
          ></TextFieldWIcon>
        </Grid>
        {/* <Grid item xs={12}>
          <Divider />
        </Grid> */}
        <GlobalDriveSearchResults
          invoices={props.invoices}
          drives={props.drives}
          drvPrgms={props.drvPrgms}
          inputState={inputState}
          showInvDetHandler={props.showInvDetHandler}
          selectedHandler={props.selectedHandler}
          selection={props.selection}
        />
      </Grid>
    </Dialog>
  );
};

export default GlobalDriveSearchDialog;
