import React from "react";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

// ICONS
import AddToQueueRoundedIcon from "@mui/icons-material/AddToQueueRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";

const FloatingActions = (props) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: "absolute", bottom: 25, right: 25 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        icon={<AddToQueueRoundedIcon />}
        tooltipTitle="Add System(s)"
        onClick={props.showAddSysHandler}
      />
      <SpeedDialAction
        icon={<BuildCircleRoundedIcon />}
        tooltipTitle="Add Test"
        onClick={props.showAddTestHandler}
      />
      <SpeedDialAction
        icon={<WorkOutlineRoundedIcon />}
        tooltipTitle="New Qual"
        onClick={props.showNewQualHandler}
      />
    </SpeedDial>
  );
};

export default FloatingActions;
