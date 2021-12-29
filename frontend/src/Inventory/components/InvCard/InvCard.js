import React from "react";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { orange } from "@mui/material/colors";

import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

const InvCard = (props) => {
  return (
    <BasicCountCard
      title="Active Invoices"
      data={props.data.length}
      icon={<AssignmentRoundedIcon />}
      color={orange[300]}
    />
  );
};

export default InvCard;
