import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

// COMPONENTS
import OutlinedCard from "../../Shared/components/Card/OutlinedCard";
import Animate from "../../Shared/transitions/Animate";
import MemberCard from "./MemberCard";

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
                  name={member.name}
                  avatarName={member.avatarName}
                  avatarColor={member.avatarColor}
                  position={member.position}
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
