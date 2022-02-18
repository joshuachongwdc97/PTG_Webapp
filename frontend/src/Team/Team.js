import React from "react";
import { Grid } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

// COMPONENTS
import TeamCard from "./components/TeamCard";

const Team = () => {
  const developmentTeam = [
    {
      name: "Joshua Chong",
      avatarName: "JC",
      avatarColor: blue,
      position: "Engineer, Analytical & Characterization Engineering",
    },
    {
      name: "Shian Wei Liew",
      avatarName: "SW",
      avatarColor: cyan,
      position: "Intern 3, Engineering",
    },
  ];

  const acknowledgements = [];

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <TeamCard team={developmentTeam} title="Development Team" />
      </Grid>
      <Grid item xs={12}>
        <TeamCard team={acknowledgements} title="Acknowledgements" />
      </Grid>
    </Grid>
  );
};

export default Team;
