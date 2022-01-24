import React from "react";

import { Chip, Grid, Typography } from "@mui/material";

import BasicCard from "../../../../Shared/components/Card/BasicCard";

const QualCard = (props) => {
  console.log(props.test);
  console.log(props.drvPrgm);

  return (
    <BasicCard click>
      <Grid container spaing={1} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            {props.qual.soda}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ fontWeight: "500" }}>
            {props.qual.soda}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Chip
            label={props.drvPrgm.alias}
            sx={{ borderRadius: "5px", marginRight: "5px" }}
          />
          <Chip label={props.test.drvType} sx={{ borderRadius: "5px" }} />
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default QualCard;
