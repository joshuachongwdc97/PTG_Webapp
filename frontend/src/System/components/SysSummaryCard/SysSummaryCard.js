import React from "react";
import { Grid, Typography, Stepper, Step, StepLabel } from "@mui/material";
import CountUp from "react-countup";

// COMPONENTS
import BasicCard from "../../../Shared/components/Card/BasicCard";

// FUNCTIONS
import sysStatus from "../../../Shared/functions/sysStatus";

// ICONS
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import DesktopAccessDisabledRoundedIcon from "@mui/icons-material/DesktopAccessDisabledRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const SysSummaryCard = (props) => {
  const sysSummary = {
    online: 0,
    reserved: 0,
    offline: 0,
    "test in progress": 0,
    "test completed": 0,
  };

  props.sys.forEach((sys) => {
    const SysStatus = sysStatus(sys);

    if (SysStatus === "error") {
      sysSummary["offline"] += 1;
    } else {
      sysSummary[SysStatus] += 1;
    }
  });

  return (
    <BasicCard>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Active Systems (Summary)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper>
            <Step key={"reserved"} active>
              <StepLabel icon={<BookmarkAddedRoundedIcon color="warning" />}>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={sysSummary["reserved"]}
                    duration={1}
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Reserved
                </Typography>
              </StepLabel>
            </Step>
            <Step key={"test in progress"} active>
              <StepLabel icon={<SpeedRoundedIcon color="primary" />}>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={sysSummary["test in progress"]}
                    duration={1}
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  In Progress
                </Typography>
              </StepLabel>
            </Step>
            <Step key={"offline"} active>
              <StepLabel
                icon={<DesktopAccessDisabledRoundedIcon color="error" />}
              >
                <Typography variant="h3">
                  <CountUp start={0} end={sysSummary["offline"]} duration={1} />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Offline
                </Typography>
              </StepLabel>
            </Step>

            <Step key={"test completed"} active>
              <StepLabel icon={<CheckCircleRoundedIcon color="success" />}>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={sysSummary["test completed"]}
                    duration={1}
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Completed
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default SysSummaryCard;
