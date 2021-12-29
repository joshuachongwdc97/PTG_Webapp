import React from "react";
import { Button, Grid } from "@mui/material";

// ICONS
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

const InvoiceActions = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<CreateNewFolderRoundedIcon />}
            size="large"
            color="success"
            onClick={props.showInvDetHandler}
          >
            New Invoice
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<PostAddRoundedIcon />}
            size="large"
            disabled
          >
            New Drives
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InvoiceActions;
