import React, { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";

// COMPONENTS
import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

// FUNCTIONS
import SysStatus from "../../../Shared/functions/SysStatus";

// ICONS
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";

const SysCard = (props) => {
  const [availSys, setAvailSys] = useState([]);

  useEffect(() => {
    setAvailSys(
      props.sys.filter((sys) => {
        const status = SysStatus(sys);
        return status === "online";
      })
    );
  }, [setAvailSys, props.sys]);

  return (
    <BasicCountCard
      title="Available Systems"
      data={availSys.length}
      icon={<DesktopWindowsRoundedIcon />}
      color={blue[400]}
      onClick={props.onClick}
    />
  );
};

export default SysCard;
