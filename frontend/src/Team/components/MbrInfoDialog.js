import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";

// COMPONENTS
import Dialog from "../../Shared/components/Dialog/Dialog";

// ICONS
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const MbrInfoDialog = (props) => {
  return (
    <Dialog open={props.open} close={props.close}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            sx={{
              backgroundColor: props.mbrInfo.avatarColor[100],
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, fontSize: "2rem" }}
              color={props.mbrInfo.avatarColor[900]}
            >
              {props.mbrInfo.avatarName}
            </Typography>
          </Avatar>
        </Grid>
        <Grid item container xs={10}>
          <Grid item container xs={12}>
            <Typography variant="h4">{props.mbrInfo.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {props.mbrInfo.position}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={1}>
            <EmailRoundedIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="subtitle1">{props.mbrInfo.email}</Typography>
          </Grid>
          <Grid item xs={1}>
            <PhoneRoundedIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="subtitle1">{props.mbrInfo.phoneNo}</Typography>
          </Grid>
          <Grid item xs={1}>
            <LocationOnRoundedIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="subtitle1">
              {props.mbrInfo.location}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MbrInfoDialog;
