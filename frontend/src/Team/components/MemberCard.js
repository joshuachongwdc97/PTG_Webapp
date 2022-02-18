import React from "react";
import { Grid, Typography, Avatar } from "@mui/material";

// COMPONENTS
import BasicCard from "../../Shared/components/Card/BasicCard";

const MemberCard = (props) => {
  return (
    <Grid item md={3} xl={2}>
      <BasicCard click>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Avatar sx={{ backgroundColor: props.avatarColor[100] }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500 }}
                color={props.avatarColor[900]}
              >
                {props.avatarName}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" noWrap sx={{ textOverflow: "ellipsis" }}>
              {props.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              noWrap
              sx={{ textOverflow: "ellipsis" }}
            >
              {props.position}
            </Typography>
          </Grid>
        </Grid>
      </BasicCard>
    </Grid>
  );
};

export default MemberCard;
