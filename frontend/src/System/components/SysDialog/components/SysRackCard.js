import React from "react";

// COMPONENTS
import { Chip, Grid, Divider } from "@mui/material";
import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import SysRow from "./SysRow";

const SysRackCard = (props) => {
  let SysRowArr = props.sysInRack.map((sys) => {
    return sys.rackRow;
  });
  SysRowArr = [...new Set(SysRowArr)];

  const RackRows = SysRowArr.map((rowNo) => {
    const sysInRow = props.sysInRack.filter((sys) => {
      return sys.rackRow === rowNo;
    });

    return (
      <Grid item xs={12} key={rowNo}>
        <SysRow
          rowNo={rowNo}
          key={rowNo}
          sysInRow={sysInRow}
          showSysInfoDialog={props.showSysInfoDialog}
          quals={props.quals}
          tests={props.tests}
          inputState={props.inputState}
        />
      </Grid>
    );
  });

  return (
    <OutlinedCard>
      <Grid container rowSpacing={2}>
        <Grid item xs={4}>
          <Chip
            label={"Rack " + props.rackNo}
            color="primary"
            variant="contained"
            sx={{ width: "100%", borderRadius: 2, fontWeight: "550" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {RackRows}
      </Grid>
    </OutlinedCard>
  );
};

export default SysRackCard;
