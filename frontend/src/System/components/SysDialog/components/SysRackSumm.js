import React from "react";
import { Tooltip, Grid, Typography, LinearProgress } from "@mui/material";

// FUNCTIONS
import { capFirstLetter } from "../../../../Shared/functions/CapFirstLetter";

// VARIABLES
import { SysStatusColors } from "../../../../Shared/variables/SysStatusColors";
import { StateProgressVariant } from "../../../../Shared/variables/StateProgressVariant";

const SysRackSumm = (props) => {
  let SummaryStats = [];

  Object.keys(props.sysSumm).forEach((stat) => {
    if (props.sysSumm[stat] > 0) {
      SummaryStats.push(
        <Tooltip
          title={capFirstLetter(stat)}
          placement={"bottom-end"}
          key={stat}
        >
          <Grid item container xs={1.5}>
            <Grid item xs={12} align="center">
              <Typography variant="subtitle2" color={"textSecondary"}>
                {props.sysSumm[stat]}
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
    }
  });

  return SummaryStats;
};

export default SysRackSumm;
