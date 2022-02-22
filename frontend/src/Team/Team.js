import React, { useState } from "react";
import { Grid } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

// COMPONENTS
import TeamCard from "./components/TeamCard";
import MbrInfoDialog from "./components/MbrInfoDialog";

const Team = () => {
  const developmentTeam = [
    {
      name: "Joshua Chong",
      avatarName: "JC",
      avatarColor: blue,
      position: "Engineer, Analytical & Characterization Engineering",
      email: "jia.hao.chong@wdc.com",
      phoneNo: "+60 11-2345 6801",
      location: "KL COE, Malaysia",
    },
    {
      name: "Shian Wei Liew",
      avatarName: "SW",
      avatarColor: cyan,
      position: "Intern 3, Engineering",
      email: "shian.wei.liew@wdc.com",
      phoneNo: "+60 12-638 3955",
      location: "KL COE, Malaysia",
    },
  ];

  const acknowledgements = [];

  const [showMbrInfoDialog, setShowMbrInfoDialog] = useState(false);
  const [selectedMbrInfo, setSelectedMbrInfo] = useState();

  return (
    <React.Fragment>
      {selectedMbrInfo && (
        <MbrInfoDialog
          open={showMbrInfoDialog}
          close={() => {
            setShowMbrInfoDialog(false);
          }}
          mbrInfo={selectedMbrInfo}
        />
      )}

      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <TeamCard
            team={developmentTeam}
            title="Development Team"
            setShowMbrInfoDialog={setShowMbrInfoDialog}
            setSelectedMbrInfo={setSelectedMbrInfo}
          />
        </Grid>
        <Grid item xs={12}>
          <TeamCard
            team={acknowledgements}
            title="Acknowledgements"
            setShowMbrInfoDialog={setShowMbrInfoDialog}
            setSelectedMbrInfo={setSelectedMbrInfo}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Team;
