import React from "react";
import { blue } from "@mui/material/colors";

// COMPONENTS
import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

// ICONS
import SdStorageIcon from "@mui/icons-material/SdStorage";

const DrvCard = (props) => {
  return (
    <BasicCountCard
      title="Active Drives"
      data={props.data.length}
      icon={<SdStorageIcon />}
      color={blue[400]}
      onClick={props.onClick}
    />
  );
};

export default DrvCard;
