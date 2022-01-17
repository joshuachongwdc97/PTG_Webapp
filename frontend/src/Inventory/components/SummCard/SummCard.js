import React from "react";

import { Grid, Typography, Chip } from "@mui/material";

import BasicCard from "../../../Shared/components/Card/BasicCard";

// Import Functions
import getDrv from "../../../Shared/functions/getDrv";
import { border, borderColor } from "@mui/system";

const SummCard = (props) => {
  let first_month = 0;
  let sec_month = 0;
  let third_month = 0;
  let fourth_month = 0;
  const summarize = () => {
    props.invoices &&
      props.invoices.map((inv) => {
        const date = new Date(inv.dateReceived);
        const age = Math.ceil((new Date() - date) / 3600 / 24 / 1000);

        const drvOrInv =
          props.title === "Aging Drives (Summary)"
            ? getDrv(inv.id, props.drives)
            : [inv];

        if (age > 90) {
          return (fourth_month += drvOrInv.length);
        } else if (age > 60) {
          return (third_month += drvOrInv.length);
        } else if (age > 30) {
          return (sec_month += drvOrInv.length);
        } else {
          return (first_month += drvOrInv.length);
        }
      });
  };

  summarize();

  return (
    <BasicCard minWidth={200} click onClick={props.onClick}>
      <Grid container alignItems="center" rowSpacing={2} columnSpacing={0}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            {props.title}
          </Typography>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">{first_month}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              color="success"
              size="small"
              label="&lt; 30 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">{sec_month}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              style={{
                color: "hsl(44, 99%, 66%)",
                borderColor: "hsl(44, 99%, 66%)",
              }}
              size="small"
              label="30 - 60 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">{third_month}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              color="warning"
              size="small"
              label="60 - 90 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">{fourth_month}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              color="error"
              size="small"
              label="&gt; 90 days"
            />
          </Grid>
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default SummCard;
