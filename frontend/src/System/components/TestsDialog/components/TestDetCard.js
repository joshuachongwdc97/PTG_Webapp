import React, { useState } from "react";

import {
  Chip,
  Grid,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import DelTestAlert from "./DelTestAlert";

// ICON
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const TestDetCard = (props) => {
  const [showDelAlert, setShowDelAlert] = useState(false);

  const drvPrgm = props.drvPrgms.filter((prgm) => {
    return prgm.id === props.test.drvPrgm;
  })[0].alias;

  let totalDuration = 0;

  const modeChips = props.test.modes.map((mode) => {
    totalDuration = totalDuration + parseInt(mode.duration);
    return (
      <Chip
        label={mode.mode}
        size="small"
        key={mode.mode}
        sx={{ marginRight: "5px", borderRadius: "5px" }}
        variant="outlined"
      />
    );
  });

  return (
    <React.Fragment>
      {/*  Delete Dialog */}
      <DelTestAlert
        open={showDelAlert}
        close={() => {
          setShowDelAlert(false);
        }}
        id={props.test.id}
        postDel={() => {
          setShowDelAlert(false);
          props.getTests();
        }}
      />
      <OutlinedCard align="center">
        <Grid container spacing={2}>
          <Grid item xs={10} align="left">
            <Chip
              label={drvPrgm}
              sx={{
                marginRight: "5px",
                borderRadius: "5px",
                fontWeight: "600",
              }}
              color="warning"
            />
            <Chip
              label={props.test.drvType}
              sx={{ marginRight: "5px", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Delete Test" placement="left">
              <IconButton
                size="small"
                aria-label="delete"
                onClick={() => {
                  setShowDelAlert(true);
                }}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", letterSpacing: "3px" }}
            >
              {props.test.test}
            </Typography>
          </Grid>
          <Grid item xs={12} align="left" container spacing={2}>
            <Grid item xs={12}>
              {modeChips}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Chip
                variant="contained"
                label={"Total Duration: " + totalDuration + " hrs"}
                size="large"
                sx={{
                  marginRight: "5px",
                  borderRadius: "5px",
                  minWidth: "100%",
                  fontWeight: "600",
                }}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
      </OutlinedCard>
    </React.Fragment>
  );
};

export default TestDetCard;
