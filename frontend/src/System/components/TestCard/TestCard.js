import React from "react";

import { Grid, Typography } from "@mui/material";

import BasicCard from "../../../Shared/components/Card/BasicCard";

const TestCard = (props) => {
  return (
    <BasicCard click onClick={props.onClick}>
      <Grid container spacing={1} alignItems="center" justifyContent={"center"}>
        <Grid item xs={12} align="center">
          <Typography variant="subtitle2">VIEW TESTS</Typography>
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default TestCard;
