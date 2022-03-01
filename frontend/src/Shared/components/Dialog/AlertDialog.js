import React from "react";

import { Button } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const AlertDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      keepMounted={false}
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions sx={{ padding: "23px" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={props.close}
          color={props.closeColor}
        >
          {props.closeTitle}
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={props.proceed}
          color={props.proceedColor}
          autoFocus
        >
          {props.proceedTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
