import React from "react";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

// ICONS
import AddToQueueRoundedIcon from "@mui/icons-material/AddToQueueRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";

const FloatingActions = (props) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: "absolute", bottom: 25, right: 25 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        icon={<AddToQueueRoundedIcon />}
        tooltipTitle="New System(s)"
        onClick={props.showAddSysHandler}
      />
      <SpeedDialAction
        icon={<PreviewRoundedIcon />}
        tooltipTitle="View Tests"
        onClick={props.showTestsHandler}
      />
      <SpeedDialAction
        icon={<BuildCircleRoundedIcon />}
        tooltipTitle="New Test"
        onClick={props.showAddTestHandler}
      />
      <SpeedDialAction
        icon={<WorkOutlineRoundedIcon />}
        tooltipTitle="New Job"
        onClick={props.showNewJobHandler}
      />
      <SpeedDialAction
        icon={<AllInboxRoundedIcon />}
        tooltipTitle="New Qual"
        onClick={props.showNewQualHandler}
      />
    </SpeedDial>
  );
};

export default FloatingActions;
