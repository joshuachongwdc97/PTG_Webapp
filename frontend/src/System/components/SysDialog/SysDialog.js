import React, { useState } from "react";

// COMPONENTS
import { Grid } from "@mui/material";
import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import SysRackCard from "./components/SysRackCard";
import SysInfoDialog from "./components/SysInfoDialog";

const SysDialog = (props) => {
  const [showSysInfoDialog, setShowSysInfoDialog] = useState(false);
  const [selectedSys, setSelectedSys] = useState();

  // GET RACK NUMBER ARRAYS
  let rackNoArr = props.systems.map((sys) => {
    return sys.rackNo;
  });

  rackNoArr = [...new Set(rackNoArr)];

  const RackCards = rackNoArr.map((rackNo) => {
    const sysInRack = props.systems.filter((sys) => {
      return sys.rackNo === rackNo;
    });

    return (
      <Grid item xs={4} key={rackNo}>
        <SysRackCard
          rackNo={rackNo}
          sysInRack={sysInRack}
          key={rackNo}
          showSysInfoDialog={(sys) => {
            setShowSysInfoDialog(true);
            setSelectedSys(sys);
          }}
        />
      </Grid>
    );
  });

  return (
    <React.Fragment>
      <SysInfoDialog
        open={showSysInfoDialog}
        close={() => {
          setShowSysInfoDialog(false);
          setSelectedSys();
        }}
        sys={selectedSys}
      />

      <BasicDialog
        close={props.close}
        open={props.open}
        title="System Control Panel"
        fullScreen
      >
        <Grid container spacing={2}>
          {RackCards}
        </Grid>
      </BasicDialog>
    </React.Fragment>
  );
};

export default SysDialog;
