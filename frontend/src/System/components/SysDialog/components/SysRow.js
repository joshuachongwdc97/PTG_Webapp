import React from "react";

import { Grid, Typography, LinearProgress } from "@mui/material";

// COMPONENTS
import BasicCardwTT from "../../../../Shared/components/Card/BasicCardwTT";

// FUNCTIONS
import { capFirstLetter } from "../../../../Shared/functions/CapFirstLetter";

// VARIABLES
import { StateProgressVariant } from "../../../../Shared/variables/StateProgressVariant";
import { SysStatusColors } from "../../../../Shared/variables/SysStatusColors";

const SysRow = (props) => {
  const systems = props.sysInRow.map((sys) => {
    // System Row Margin (Defines how many systems in a row)
    let sysMargin = 2.4;
    if (props.sysInRow.length > 5) {
      sysMargin = 2;
    }

    let matchSearch;
    if (sys.drive && props.inputState) {
      matchSearch = sys.drive.includes(props.inputState) ? "#474747" : false;
    }

    return (
      <Grid item key={sys.id} xs={sysMargin} align="center">
        <BasicCardwTT
          click
          ttTitle={capFirstLetter(sys.stat)}
          ttPlacement="top"
          onClick={() => {
            props.showSysInfoDialog(sys);
          }}
          backgroundColor={matchSearch}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={12} align="center">
              <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
                {sys.rackLoc}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                color={SysStatusColors[sys.stat]}
                variant={StateProgressVariant[sys.stat]}
                value={
                  sys.stat === "online" ||
                  sys.stat === "reserved" ||
                  sys.stat === "test completed" ||
                  sys.stat === "test error"
                    ? 100
                    : 0
                }
                sx={{ maxWidth: "30px", width: "100%", borderRadius: 5 }}
              />
            </Grid>
          </Grid>
        </BasicCardwTT>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {systems}
    </Grid>
  );
};

export default SysRow;
