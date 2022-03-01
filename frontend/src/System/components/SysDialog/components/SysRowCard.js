import React from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";

// COMPONENTS
import BasicCardwTT from "../../../../Shared/components/Card/BasicCardwTT";

// FUNCTIONS
import { capFirstLetter } from "../../../../Shared/functions/CapFirstLetter";

// VARIABLES
import { SysStatusColors } from "../../../../Shared/variables/SysStatusColors";
import { StateProgressVariant } from "../../../../Shared/variables/StateProgressVariant";

const SysRowCard = (props) => {
  return (
    <BasicCardwTT
      click
      ttTitle={capFirstLetter(props.sys.stat)}
      ttPlacement="top"
      onClick={() => {
        props.showSysInfoDialog(props.sys);
      }}
      backgroundColor={props.matchSearch}
    >
      <Grid container spacing={1.5}>
        <Grid item xs={12} align="center">
          <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
            {props.rackNoPrefix
              ? "R" + props.sys.rackNo + "-" + props.sys.rackLoc
              : props.sys.rackLoc}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            color={SysStatusColors[props.sys.stat]}
            variant={StateProgressVariant[props.sys.stat]}
            value={
              props.sys.stat === "online" ||
              props.sys.stat === "reserved" ||
              props.sys.stat === "test completed" ||
              props.sys.stat === "test error"
                ? 100
                : 0
            }
            sx={{ maxWidth: "30px", width: "100%", borderRadius: 5 }}
          />
        </Grid>
      </Grid>
    </BasicCardwTT>
  );
};

export default SysRowCard;
