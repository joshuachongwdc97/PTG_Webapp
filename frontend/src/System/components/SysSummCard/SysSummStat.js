import React from "react";
import { Grid, Typography } from "@mui/material";
import CountUp from "react-countup";

const SysSummStat = (props) => {
  return (
    <Grid container>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={1}
        xs={12}
      >
        <Grid item>{props.icon}</Grid>
        <Grid item>
          <Typography variant="h3">
            <CountUp start={0} end={props.value} duration={1} />
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          {props.stat}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SysSummStat;
