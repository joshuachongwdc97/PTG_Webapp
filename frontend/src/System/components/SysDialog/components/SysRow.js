import React from "react";
import { Grid } from "@mui/material";

// VARIABLES
import SysRowCard from "./SysRowCard";

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
        <SysRowCard
          sys={sys}
          matchSearch={matchSearch}
          showSysInfoDialog={props.showSysInfoDialog}
        />
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
