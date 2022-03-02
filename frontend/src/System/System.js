import React, { useState, useEffect } from "react";
import { useHttpClient } from "../Shared/hooks/http-hook";
import { Grid, Divider } from "@mui/material";

// COMPONENTS
import SysCard from "./components/SysCard/SysCard";
import Animate from "../Shared/transitions/Animate";
import SysDialog from "./components/SysDialog/SysDialog";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import AddSysDialog from "./components/AddSysDialog/AddSysDialog";
import AddTestDialog from "./components/AddTestDialog/AddTestDialog";
import TestCard from "./components/TestCard/TestCard";
import TestsDialog from "./components/TestsDialog/TestsDialog";
import NewQualDialog from "./components/NewQualDialog/NewQualDialog";
// import QualView from "./components/QualView/QualView";
import ServerStorageCard from "./components/ServerStorageCard/ServerStorageCard";
import QualSysDialog from "./components/QualSysDialog/QualSysDialog";

// VARIABLES
import { serverName } from "../Shared/variables/Variables";
import SysSummCard from "./components/SysSummCard/SysSummCard";

// FUNCTIONS
import sysStatus from "../Shared/functions/sysStatus";
// import getTestDuration from "../Shared/functions/getTestDuration";
// import getEstTestEnd from "../Shared/functions/getEstTestEnd";
// import getTimeRemaining from "../Shared/functions/getTimeRemaining";

const System = (props) => {
  const { sendRequest } = useHttpClient();
  const [systems, setSystems] = useState([]);
  const [systems2, setSystems2] = useState([]);
  // const [quals, setQuals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tests, setTests] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [showSysDialog, setShowSysDialog] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [showAddSysDialog, setShowAddSysDialog] = useState(false);
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [showTestsDialog, setShowTestsDialog] = useState(false);
  const [showNewQualDialog, setShowNewQualDialog] = useState(false);
  const [showQualSysDialog, setShowQualSysDialog] = useState(false);
  const [selectedQual, setSelectedQual] = useState("");

  const getSystems = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/system"
      );
      setSystems(responseData.systems);
    } catch (err) {}
  };

  // const getQuals = async () => {
  //   try {
  //     let responseData = await sendRequest(
  //       "http://" + serverName + "/api/qual/all"
  //     );
  //     setQuals(responseData.quals);
  //   } catch (err) {}
  // };

  const getInvoices = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/invoice"
      );
      setInvoices(responseData.invoices);
    } catch (err) {}
  };

  const getTests = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/test/all"
      );
      setTests(responseData.tests);
    } catch (err) {}
  };

  const getDrvPrgms = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);
    } catch (err) {}
  };

  const getData = async () => {
    getInvoices();
    getTests();
    getDrvPrgms();
    // getQuals();
    getSystems();

    setDataReady(true);
  };

  // Get Data Periodically
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

  // Populate System State with Test Status
  useEffect(() => {
    if (systems.length > 0 && tests.length > 0) {
      setSystems2(
        systems.map((sys) => {
          // if (sys.qual) {
          //   let testID = quals.filter((qual) => {
          //     return qual.id === sys.qual;
          //   });

          //   if (testID.length > 0) {
          //     testID = testID[0].test;

          //     const test = tests.filter((test) => {
          //       return test.id === testID.toString();
          //     })[0];

          //     const stat = sysStatus(sys, test);
          //     const testDur = getTestDuration(test, sys.testMode);
          //     const estTestEnd = getEstTestEnd(sys.testStart, testDur);
          //     const timeRem = getTimeRemaining(estTestEnd);
          //     let modeProgress = Math.floor(
          //       ((testDur * 60 - (timeRem[0] * 60 + timeRem[1])) /
          //         (testDur * 60)) *
          //         100
          //     );

          //     if (sys.testEnd && stat !== "test error") {
          //       modeProgress = 100;
          //     } else if (!sys.testEnd && modeProgress > 100) {
          //       modeProgress = 99;
          //     }

          //     return {
          //       ...sys,
          //       stat,
          //       testDur,
          //       estTestEnd,
          //       timeRem,
          //       modeProgress,
          //     };
          //   } else {
          //     return { ...sys, stat: sysStatus(sys) };
          //   }
          // } else {
          //   return { ...sys, stat: sysStatus(sys) };
          // }
          return { ...sys, stat: sysStatus(sys) };
        })
      );
    }
  }, [systems, tests]);

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
        showNewQualHandler={() => {
          setShowNewQualDialog(true);
        }}
      />

      {/* NEW QUAL DIALOG */}
      <NewQualDialog
        open={showNewQualDialog}
        close={() => {
          setShowNewQualDialog(false);
        }}
        getData={getData}
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
        systems={systems2}
        invoices={invoices}
        tests={tests}
        getData={getData}
        getSystems={getSystems}
        getTests={getTests}
        getInvoices={getInvoices}
        getDrvPrgms={getDrvPrgms}
      />

      {/* TESTS DIALOG */}
      <TestsDialog
        open={showTestsDialog}
        close={() => {
          setShowTestsDialog(false);
        }}
        drvPrgms={drvPrgms}
        tests={tests}
      />

      {/* VIEW QUAL SYSTEMS DIALOG */}
      <QualSysDialog
        open={showQualSysDialog}
        close={() => {
          setShowQualSysDialog(false);
        }}
        selectedQual={selectedQual}
        systems={systems2}
        invoices={invoices}
        tests={tests}
        getSystems={getSystems}
      />

      <Grid container spacing={2}>
        <Grid item>
          {dataReady && (
            <Animate show={dataReady}>
              <SysCard
                sys={systems}
                onClick={() => {
                  setSelectedQual("");
                  setShowSysDialog(true);
                }}
              />
            </Animate>
          )}
        </Grid>
        <Grid item>
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
        <Grid item>
          {dataReady && (
            <Animate show={dataReady}>
              <SysSummCard sys={systems2} />
            </Animate>
          )}
        </Grid>

        {/* <Grid item xs={12}>
          <Divider>Ongoing Jobs</Divider>
        </Grid>
        <Grid item xs={12}>
          {dataReady && (
            <Animate show={dataReady}>
              <QualView
                quals={quals}
                invoices={invoices}
                tests={tests}
                drvPrgms={drvPrgms}
                systems={systems2}
                getQuals={getQuals}
                getSystems={getSystems}
                setShowQualSysDialog={setShowQualSysDialog}
                setSelectedQual={setSelectedQual}
              />
            </Animate>
          )}
        </Grid> */}
        <Grid item xs={12}>
          {dataReady && (
            <Divider sx={{ marginTop: "10px" }}>Server Info</Divider>
          )}
        </Grid>
        <Grid item>
          {dataReady && (
            <Animate show={dataReady}>
              <ServerStorageCard />
            </Animate>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default System;
