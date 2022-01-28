import React from "react";

import { Chip, Grid, Typography, LinearProgress } from "@mui/material";

import BasicCard from "../../../../Shared/components/Card/BasicCard";

const QualCard = (props) => {
  return (
    <BasicCard>
      <Grid container spaing={1} rowSpacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            {props.qual.soda}
          </Typography>
        </Grid>
        <Grid item xs={4} align="right">
          <Chip
            label={props.test.test}
            sx={{
              borderRadius: "5px",
              fontWeight: "600",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontWeight: "500" }}
            color="textSecondary"
          >
            {props.invoice ? props.invoice.name : "Invoice Not Found"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            variant="indeterminate"
            value={100}
            color={"primary"}
            sx={{ borderRadius: "10px", marginTop: "10px" }}
          />
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default QualCard;
