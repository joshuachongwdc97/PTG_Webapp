import React, { useState, useEffect } from "react";
import { useHttpClient } from "../Shared/hooks/http-hook";
import { Grid } from "@mui/material";

// COMPONENTS
import SysCard from "./components/SysCard/SysCard";
import Animate from "../Shared/transitions/Animate";
import SysDialog from "./components/SysDialog/SysDialog";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import AddSysDialog from "./components/AddSysDialog/AddSysDialog";
import AddTestDialog from "./components/AddTestDialog/AddTestDialog";
import TestCard from "./components/TestCard/TestCard";
import TestsDialog from "./components/TestsDialog/TestsDialog";

// VARIABLES
import { serverName } from "../Shared/variables/Variables";

const System = (props) => {
  const { sendRequest } = useHttpClient();
  const [systems, setSystems] = useState([]);
  const [showSysDialog, setShowSysDialog] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [showAddSysDialog, setShowAddSysDialog] = useState(false);
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [showTestsDialog, setShowTestsDialog] = useState(false);

  const getData = async () => {
    console.log("Fetching Data");
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/system"
      );
      setSystems(responseData.systems);

      console.log("Data fetched");
      setDataReady(true);
    } catch (err) {}
  };

  useEffect(
    () => {
      getData();

      const interval = setInterval(() => {
        getData();
      }, 60000);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <React.Fragment>
      {/* FLOATING ACTION BUTTON */}
      <FloatingActions
        showAddSysHandler={() => {
          setShowAddSysDialog(true);
        }}
        showAddTestHandler={() => {
          setShowAddTestDialog(true);
        }}
      />

      {/* ADD TEST DIALOG */}
      <AddTestDialog
        open={showAddTestDialog}
        close={() => {
          setShowAddTestDialog(false);
        }}
        getData={getData}
      />

      {/* ADD SYSTEM DIALOG */}
      <AddSysDialog
        open={showAddSysDialog}
        close={() => {
          setShowAddSysDialog(false);
        }}
        getData={getData}
      />

      {/* SYSTEM VIEW DIALOG */}
      <SysDialog
        open={showSysDialog}
        close={() => {
          setShowSysDialog(false);
        }}
        systems={systems}
        getData={getData}
      />

      {/* TESTS DIALOG */}
      <TestsDialog
        open={showTestsDialog}
        close={() => {
          setShowTestsDialog(false);
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={2}>
          {dataReady && (
            <Animate show={dataReady}>
              <SysCard
                sys={systems}
                onClick={() => {
                  setShowSysDialog(true);
                }}
              />
            </Animate>
          )}
        </Grid>
        <Grid item xs={1}>
          {dataReady && (
            <Animate show={dataReady}>
              <TestCard
                onClick={() => {
                  setShowTestsDialog(true);
                }}
              />
            </Animate>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default System;
