import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import CSVUpload from "../../../Shared/components/Input/CSVUpload";
import SysTable from "./components/SysTable";

import { Grid, Button } from "@mui/material";

// ICONS
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LoadingButton } from "@mui/lab";

// VARIABLES
import { serverName } from "../../../Shared/variables/Variables";

const AddSysDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [uploadedSys, setUploadedSys] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!props.open) {
      setUploadedSys([]);
    }
  }, [props.open]);

  const sysUploadHandler = (systems) => {
    setUploadedSys(systems);
  };

  const addSysHandler = async () => {
    setSubmitting(true);

    try {
      await sendRequest(
        "http://" + serverName + "/api/system/add",
        "POST",
        JSON.stringify({ systems: uploadedSys }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    setSubmitting(false);
    props.close();
    props.getData();
  };

  const DialogActions = (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<RestartAltRoundedIcon />}
          onClick={() => {
            setUploadedSys([]);
          }}
          disabled={uploadedSys.length > 0 ? false : true}
        >
          Reset
        </Button>
      </Grid>
      <Grid item xs={6}>
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          color="success"
          endIcon={<SendRoundedIcon />}
          disabled={uploadedSys.length > 0 ? false : true}
          loading={submitting}
          loadingPosition="end"
          onClick={addSysHandler}
        >
          Add System(s)
        </LoadingButton>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          color="error"
          startIcon={<CloseRoundedIcon />}
          onClick={props.close}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      maxWidth="md"
      actions={DialogActions}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CSVUpload
            title="Upload via CSV"
            icon={<PlaylistAddCircleRoundedIcon />}
            uploadedDataHandler={sysUploadHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <SysTable data={uploadedSys} />
        </Grid>
      </Grid>
    </BasicDialog>
  );
};

export default AddSysDialog;
