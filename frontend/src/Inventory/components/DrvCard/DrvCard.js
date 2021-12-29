import React from "react";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import { blue } from "@mui/material/colors";

import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

const DrvCard = (props) => {
  return (
    <BasicCountCard
      title="Active Drives"
      data={props.data.length}
      icon={<SdStorageIcon />}
      color={blue[400]}
    />
  );
};

export default DrvCard;
