import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

// COMPONENTS
import BasicCard from "../../../Shared/components/Card/BasicCard";
import SysSummStat from "./SysSummStat";

// FUNCTIONS
import getSysSumm from "../../../Shared/functions/getSysSumm";

// ICONS
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import DesktopAccessDisabledRoundedIcon from "@mui/icons-material/DesktopAccessDisabledRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const SysSummCard = (props) => {
  const sysSumm = getSysSumm(props.sys);

  return (
    <BasicCard>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Active Systems (Summary)
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={1.76}>
            <SysSummStat
              stat="Offline"
              value={sysSumm["offline"]}
              icon={<DesktopAccessDisabledRoundedIcon htmlColor="#b32b19" />}
            />
          </Grid>
          <Grid item xs={0.8} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={1.76}>
            <SysSummStat
              stat="Reserved"
              value={sysSumm["reserved"]}
              icon={<BookmarkAddedRoundedIcon color="warning" />}
            />
          </Grid>
          <Grid item xs={0.8} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={1.76}>
            <SysSummStat
              stat="In Progress"
              value={sysSumm["test in progress"]}
              icon={<SpeedRoundedIcon color="primary" />}
            />
          </Grid>
          <Grid item xs={0.8} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={1.76}>
            <SysSummStat
              stat="Error"
              value={sysSumm["test error"]}
              icon={<WarningRoundedIcon color="error" />}
            />
          </Grid>
          <Grid item xs={0.8} alignSelf="center">
            <Divider color="#636363" />
          </Grid>
          <Grid item xs={1.76}>
            <SysSummStat
              stat="Completed"
              value={sysSumm["test completed"]}
              icon={<CheckCircleRoundedIcon color="success" />}
            />
          </Grid>
        </Grid>
      </Grid>
    </BasicCard>
  );
};

export default SysSummCard;
