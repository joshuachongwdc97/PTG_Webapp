import React from "react";

import { Grid, Avatar, Typography } from "@mui/material";

import OutlinedCard from "./OutlinedCard";

const AvatarCard = (props) => {
  return (
    <OutlinedCard align="center" click>
      <Grid container spacing={1} justifyContent="center" alignItems={"center"}>
        <Grid item xs={3} align="center" sx={{ height: "100%" }}>
          <Avatar
            variant="rounded"
            sx={{ width: props.iconSize, height: props.iconSize }}
          >
            {props.icon}
          </Avatar>
        </Grid>
        <Grid item xs={9} align="left" sx={{ height: "100%" }}>
          <Typography
            variant={props.fontSize}
            sx={{
              letterSpacing: props.letterSpacing,
              fontWeight: props.fontWeight,
            }}
          >
            {props.title}
          </Typography>
        </Grid>
      </Grid>
    </OutlinedCard>
  );
};

export default AvatarCard;
