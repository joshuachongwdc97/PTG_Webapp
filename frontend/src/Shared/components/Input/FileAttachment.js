import React from "react";
import { Grid, Button, IconButton } from "@mui/material";

// COMPONENTS
import TextFieldWIcon from "./TextFieldWIcon";

//ICONS
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

const FileAttachment = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={8.9}>
        <TextFieldWIcon
          label={props.label}
          value={props.value ? props.value : "No File Uploaded"}
          disabled={props.textFieldDisabled}
          endIcon={
            <IconButton onChange={props.inputHandler} component="label">
              <CloudUploadRoundedIcon />
              <input type="file" name={props.name} hidden />
            </IconButton>
          }
          readOnly
        />
      </Grid>
      <Grid item xs={1} textAlign={"end"}>
        <Button
          variant="outlined"
          onClick={() => {
            props.openFileHandler(props.name);
          }}
          sx={{ height: "100%" }}
          disabled={props.buttonsDisabled}
        >
          Open
        </Button>
      </Grid>
      <Grid item xs={2.1} textAlign={"end"}>
        <Button
          variant="outlined"
          onClick={() => {
            props.downloadFileHandler(props.name);
          }}
          sx={{ height: "100%" }}
          disabled={props.buttonsDisabled}
        >
          Download
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default FileAttachment;
