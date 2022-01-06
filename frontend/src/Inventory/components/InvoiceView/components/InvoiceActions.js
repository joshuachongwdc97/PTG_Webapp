import React from "react";
import { Button, Grid } from "@mui/material";

// ICONS
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";

const InvoiceActions = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item container sm spacing={1}>
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
        </Grid>

        <Grid item sm textAlign={"right"}>
          <Button
            variant="outlined"
            startIcon={<TravelExploreRoundedIcon />}
            size="large"
            color="warning"
            onClick={props.showGlobalDriveSearchHandler}
          >
            Global Drive Search
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InvoiceActions;
