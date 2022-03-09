import React from "react";
import { Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// ICONS
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const UserDialogActions = (props) => {
  return (
    <React.Fragment>
      {props.userDialogState === "new" && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={props.close}
              size="large"
              startIcon={<CancelRoundedIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
      {props.userDialogState === "modify" && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={props.close}
              size="large"
              startIcon={<CancelRoundedIcon />}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default UserDialogActions;
