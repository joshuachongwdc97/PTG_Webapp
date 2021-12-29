import React, { useState, useEffect } from "react";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import CSVUpload from "../../../Shared/components/Input/CSVUpload";
import SysTable from "./components/SysTable";

import { Grid } from "@mui/material";

// ICONS
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";

const AddSysDialog = (props) => {
  const [uploadedSys, setUploadedSys] = useState([]);

  useEffect(() => {
    if (!props.open) {
      setUploadedSys([]);
    }
  }, [props.open]);

  const sysUploadHandler = (systems) => {
    setUploadedSys(systems);
  };

  return (
    <BasicDialog open={props.open} close={props.close} maxWidth="md">
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
