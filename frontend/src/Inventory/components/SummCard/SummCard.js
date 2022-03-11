import React from "react";
import { Grid, Typography, Chip } from "@mui/material";
import CountUp from "react-countup";

// COMPONENTS
import BasicCard from "../../../Shared/components/Card/BasicCard";

// FUNCTIONS
import getDrv from "../../../Shared/functions/getDrv";

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

        // >= 91 days
        if (age >= 91) {
          return (fourth_month += drvOrInv.length);
          // 61 - 90 days
        } else if (age >= 61) {
          return (third_month += drvOrInv.length);
          // 31 - 60 days
        } else if (age >= 31) {
          return (sec_month += drvOrInv.length);
          // <= 30 days
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
            <Typography variant="h4">
              <CountUp start={0} end={first_month} duration={1} />
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              color="success"
              size="small"
              label="&lt;= 30 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              <CountUp start={0} end={sec_month} duration={1} />
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              sx={{
                color: "hsl(44, 99%, 66%)",
                borderColor: "hsl(44, 99%, 66%)",
              }}
              size="small"
              label="31 - 60 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              <CountUp start={0} end={third_month} duration={1} />
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Chip
              variant="outlined"
              color="warning"
              size="small"
              label="61 - 90 days"
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} alignItems="center" spacing={0.5}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              <CountUp start={0} end={fourth_month} duration={1} />
            </Typography>
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
