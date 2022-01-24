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
    <Grid item container xs={12} alignSelf={"center"} paddingTop={3}>
      <Grid item xs={7}>
        <Typography variant="h5">{props.drive}</Typography>
      </Grid>
      <Grid item xs={5} textAlign={"right"} alignSelf={"center"}>
        <Typography variant="subtitle2">
          <CountUp
            start={0}
            end={props.totalSpace - props.freeSpace}
            duration={0.5}
          />
          {" GB / " + props.totalSpace + " GB"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress variant="determinate" value={progress} color="info" />
      </Grid>
    </Grid>
  );
};

export default StorageGrid;
