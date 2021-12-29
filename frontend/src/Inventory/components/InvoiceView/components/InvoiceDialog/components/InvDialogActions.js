import React from "react";

import { Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// ICONS
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const InvDialogActions = (props) => {
  return (
    <React.Fragment>
      {props.invDialogState === "new" && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={props.resetInputState}
              size="large"
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              variant="contained"
              loading={props.submitting}
              loadingPosition="end"
              endIcon={<SendRoundedIcon />}
              disabled={!props.inputReady}
              fullWidth
              color="success"
              onClick={props.submitHandler}
              size="large"
            >
              Submit
            </LoadingButton>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={props.close}
              size="large"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
      {props.invDialogState === "modify" && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LoadingButton
              variant="contained"
              loading={props.submitting}
              loadingPosition="end"
              endIcon={<SendRoundedIcon />}
              fullWidth
              color="success"
              onClick={props.submitHandler}
              disabled={!props.modifiable}
              size="large"
            >
              Modify
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={props.cancelEditHandler}
              size="large"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
      {props.invDialogState === "view" && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LoadingButton
              variant="contained"
              start={<SendRoundedIcon />}
              fullWidth
              color="primary"
              onClick={props.editHandler}
              size="large"
            >
              Edit
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color={props.status === "Active" ? "success" : "warning"}
              onClick={props.returnToggleHandler}
              size="large"
            >
              {props.status === "Active"
                ? "Mark as Returned"
                : "Mark as Active"}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={props.delHandler}
              size="large"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default InvDialogActions;
