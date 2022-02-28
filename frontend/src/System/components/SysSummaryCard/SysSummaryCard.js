import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

// COMPONENTS
import BasicCard from "../../../Shared/components/Card/BasicCard";

// ICONS
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import DesktopAccessDisabledRoundedIcon from "@mui/icons-material/DesktopAccessDisabledRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import getSysSumm from "../../../Shared/functions/getSysSumm";
import SysSummStat from "./SysSummStat";

const SysSummaryCard = (props) => {
  const sysSummary = getSysSumm(props.sys);

  return (
    <BasicCard>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Active Systems (Summary)
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={2.25}>
            <SysSummStat
              stat="Reserved"
              value={sysSummary["reserved"]}
              icon={<BookmarkAddedRoundedIcon color="warning" />}
            />
          </Grid>
          <Grid item xs={1} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={2.25}>
            <SysSummStat
              stat="In Progress"
              value={sysSummary["test in progress"]}
              icon={<SpeedRoundedIcon color="primary" />}
            />
          </Grid>
          <Grid item xs={1} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={2.25}>
            <SysSummStat
              stat="Offline"
              value={sysSummary["offline"]}
              icon={<DesktopAccessDisabledRoundedIcon color="error" />}
            />
          </Grid>
          <Grid item xs={1} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={2.25}>
            <SysSummStat
              stat="Completed"
              value={sysSummary["test completed"]}
              icon={<CheckCircleRoundedIcon color="success" />}
            />
          </Grid>
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default SysSummaryCard;
