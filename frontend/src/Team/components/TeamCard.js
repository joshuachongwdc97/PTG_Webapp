import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

// COMPONENTS
import OutlinedCard from "../../Shared/components/Card/OutlinedCard";
import MemberCard from "./MemberCard";

// TRANSITIONS
import Animate from "../../Shared/transitions/Animate";

const TeamCard = (props) => {
  return (
    <Animate show>
      <OutlinedCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {props.team.map((member) => {
              return (
                <MemberCard
                  mbrInfo={member}
                  setShowMbrInfoDialog={props.setShowMbrInfoDialog}
                  setSelectedMbrInfo={props.setSelectedMbrInfo}
                  key={member.email}
                />
              );
            })}
          </Grid>
        </Grid>
      </OutlinedCard>
    </Animate>
  );
};

export default TeamCard;
