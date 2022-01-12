import React, { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

// COMPONENTS
import BasicCountCardwPB from "../../../Shared/components/Card/BasicCountCardwPB";

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
        return status === "online" || status === "offline";
      })
    );
  }, [setAvailSys, props.sys]);

  return (
    <BasicCountCardwPB
      title="Available Systems"
      data={availSys.length}
      dataAll={props.sys.length}
      icon={<DesktopWindowsRoundedIcon />}
      color={green[400]}
      onClick={props.onClick}
      progress={(availSys.length / props.sys.length) * 100}
      progressColor="success"
    />
  );
};

export default SysCard;
