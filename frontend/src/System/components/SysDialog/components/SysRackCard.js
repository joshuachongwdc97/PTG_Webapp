import React from "react";

// COMPONENTS
import {
  Chip,
  Grid,
  Divider,
  Typography,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import OutlinedCard from "../../../../Shared/components/Card/OutlinedCard";
import SysRow from "./SysRow";
import sysStatus from "../../../../Shared/functions/sysStatus";

// VARIABLES
import { SysStatusColors } from "../../../../Shared/variables/SysStatusColors";
import { StateProgressVariant } from "../../../../Shared/variables/StateProgressVariant";

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

  let SummaryStats = {
    online: 0,
    reserved: 0,
    offline: 0,
    "test in progress": 0,
    "test completed": 0,
  };

  props.sysInRack.forEach((sys) => {
    const SysStatus = sysStatus(sys);

    if (SysStatus === "error") {
      SummaryStats["offline"] += 1;
    } else {
      SummaryStats[SysStatus] += 1;
    }
  });

  SummaryStats = Object.keys(SummaryStats).map((stat) => {
    return (
      <Tooltip
        title={
          stat === "reserved"
            ? "Reserved"
            : stat === "online"
            ? "Ready"
            : stat === "test in progress"
            ? "Test In Progress"
            : stat === "test completed"
            ? "Test Completed"
            : "Not Responding"
        }
        placement={"bottom-end"}
        key={stat}
      >
        <Grid item container xs={1.5}>
          <Grid item xs={12} align="center">
            <Typography variant="subtitle2" color={"textSecondary"}>
              {SummaryStats[stat]}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <LinearProgress
              color={SysStatusColors[stat]}
              variant={StateProgressVariant[stat]}
              value={
                stat === "online" ||
                stat === "reserved" ||
                stat === "test completed"
                  ? 100
                  : 0
              }
              sx={{ maxWidth: "30px", width: "70%", borderRadius: 5 }}
            />
          </Grid>
        </Grid>
      </Tooltip>
    );
  });

  return (
    <OutlinedCard>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={4}>
          <Chip
            label={"Rack " + props.rackNo}
            color="primary"
            variant="contained"
            sx={{ width: "100%", borderRadius: 2, fontWeight: "550" }}
          />
        </Grid>

        <Grid
          item
          container
          xs={8}
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          {SummaryStats}
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
