import React from "react";
import { orange } from "@mui/material/colors";

// COMPONENTS
import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

// ICONS
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const InvCard = (props) => {
  return (
    <BasicCountCard
      title="Active Invoices"
      data={props.data.length}
      icon={<AssignmentRoundedIcon />}
      color={orange[300]}
      onClick={props.onClick}
    />
  );
};

export default InvCard;
