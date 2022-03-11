import React, { useState } from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import BasicDialog from "../../../../Shared/components/Dialog/Dialog";
import TextFieldWIcon from "../../../../Shared/components/Input/TextFieldWIcon";

// ICON
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";

const ReserveDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [inputState, setInputState] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputHandler = (e) => {
    setInputState(e.target.value);
  };

  const reserveSysHandler = async () => {
    props.setReserving(true);
    setSubmitting(true);

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/system/reserve",
        "PATCH",
        JSON.stringify({ IDs: [props.id], user: inputState }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    setSubmitting(false);
    props.close();
    props.getData();
  };

  const DialogActions = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          color="success"
          startIcon={<BookmarkAddedRoundedIcon />}
          disabled={inputState.length > 0 ? false : true}
          loading={submitting}
          loadingPosition="start"
          onClick={reserveSysHandler}
        >
          Reserve System
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <BasicDialog open={props.open} close={props.close} actions={DialogActions}>
      <TextFieldWIcon
        required
        label="Input your Name"
        startIcon={<AccountCircleRoundedIcon />}
        name="name"
        value={inputState}
        onChange={inputHandler}
        autoComplete="off"
      />
    </BasicDialog>
  );
};

export default ReserveDialog;
