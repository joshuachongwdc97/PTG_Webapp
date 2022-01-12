import React from "react";

import { Grid, Typography, LinearProgress } from "@mui/material";

// COMPONENTS
import BasicCardwTT from "../../../../Shared/components/Card/BasicCardwTT";

// FUNCTIONS
import sysStatus from "../../../../Shared/functions/SysStatus";

const SysRow = (props) => {
  const systems = props.sysInRow.map((sys) => {
    let sysMargin = 2.4;
    if (props.sysInRow.length > 5) {
      sysMargin = 2;
    }

    const SysStatus = sysStatus(sys);

    return (
      <Grid item key={sys.id} xs={sysMargin} align="center">
        <BasicCardwTT
          click
          ttTitle={
            SysStatus === "reserved"
              ? sys.status
              : SysStatus === "online"
              ? "Ready"
              : "Not Responding"
          }
          ttPlacement="top"
          onClick={() => {
            props.showSysInfoDialog(sys);
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={12} align="center">
              <Typography variant="subtitle2">{sys.rackLoc}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                color={
                  SysStatus === "reserved"
                    ? "primary"
                    : SysStatus === "error"
                    ? "error"
                    : "success"
                }
                variant="determinate"
                value={
                  SysStatus === "online" || SysStatus === "reserved" ? 100 : 0
                }
                sx={{ maxWidth: "30px", width: "80%", borderRadius: 5 }}
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
