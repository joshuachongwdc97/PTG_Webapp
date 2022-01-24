import React, { useEffect, useState } from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";
import CountUp from "react-countup";

const StorageGrid = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // requires a timeout because the time between progress = 0 and progress = props.progress is too small
    // which causes the linear progress animation to not happen most times
    setTimeout(() => {
      setProgress(props.progress);
    }, 20);

    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      item
      container
      xs={12}
      alignSelf={"center"}
      paddingTop={3}
      spacing={1}
    >
      <Grid item xs={4}>
        <Typography variant="subtitle">
          {props.drive === "D:" ? "PTG" : "PTG_B"}
        </Typography>
      </Grid>
      <Grid item xs={8} textAlign={"right"} alignSelf={"center"}>
        <Typography variant="subtitle2" color="textSecondary">
          <CountUp
            start={0}
            end={props.totalSpace - props.freeSpace}
            duration={0.5}
          />
          {" GB / " + props.totalSpace + " GB used"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress variant="determinate" value={progress} color="info" />
      </Grid>
    </Grid>
  );
};

export default StorageGrid;
