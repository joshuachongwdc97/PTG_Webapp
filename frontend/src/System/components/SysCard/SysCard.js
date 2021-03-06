import React, { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

// COMPONENTS
import BasicCountCardwPB from "../../../Shared/components/Card/BasicCountCardwPB";

// FUNCTIONS
import sysStatus from "../../../Shared/functions/sysStatus";

// ICONS
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";

const SysCard = (props) => {
  const [availSys, setAvailSys] = useState([]);

  useEffect(() => {
    setAvailSys(
      props.sys.filter((sys) => {
        const status = sysStatus(sys);
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
      progress={
        props.sys.length > 0 ? (availSys.length / props.sys.length) * 100 : 0
      }
      progressColor="success"
    />
  );
};

export default SysCard;
