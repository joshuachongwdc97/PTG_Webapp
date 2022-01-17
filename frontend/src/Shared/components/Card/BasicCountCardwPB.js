import React from "react";
import { Typography, Grid, Avatar, LinearProgress } from "@mui/material";
import CountUp from "react-countup";

import BasicCard from "./BasicCard";

const CountCard = (props) => {
  return (
    <BasicCard minWidth={200} maxWidth={800} click onClick={props.onClick}>
      <Grid
        container
        alignItems="baseline"
        rowSpacing={2.5}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h3">
            <CountUp start={0} end={props.data} duration={0.5} />
          </Typography>
        </Grid>
        <Grid item xs={3} align="right">
          <Avatar variant="rounded" sx={{ bgcolor: props.color }}>
            {props.icon}
          </Avatar>
        </Grid>
        <Grid item xs={12} align="right">
          <LinearProgress
            variant="determinate"
            value={props.progress}
            color={props.progressColor}
          />
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default CountCard;
