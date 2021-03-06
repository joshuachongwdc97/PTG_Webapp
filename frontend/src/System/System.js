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
import TestsDialog from "./components/TestsDialog/TestsDialog";
import NewJobDialog from "./components/NewJobDialog/NewJobDialog";
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
  const [tests2, setTests2] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [showSysDialog, setShowSysDialog] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [showAddSysDialog, setShowAddSysDialog] = useState(false);
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [showTestsDialog, setShowTestsDialog] = useState(false);
  const [showNewJobDialog, setShowNewJobDialog] = useState(false);
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

  // Get All Data
  const getData = async () => {
    getDrvPrgms();
    getInvoices();
    getTests();
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

  // Populate System State with Test Status & Tests with Drv Programs
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

    if (drvPrgms.length > 0) {
      setTests2(
        tests.map((test) => {
          const drvPrgm = drvPrgms.filter((prgm) => {
            return prgm.id === test.drvPrgm;
          })[0];

          return {
            ...test,
            drvPrgmParsed: drvPrgm.alias,
          };
        })
      );
    }
  }, [systems, tests, drvPrgms]);

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
        showNewJobHandler={() => {
          setShowNewJobDialog(true);
        }}
        showNewQualHandler={() => {
          setShowNewQualDialog(true);
        }}
        showTestsHandler={() => {
          setShowTestsDialog(true);
        }}
      />

      {/* NEW QUAL DIALOG */}
      <NewQualDialog
        open={showNewQualDialog}
        close={() => {
          setShowNewQualDialog(false);
        }}
        invoices={invoices}
        tests={tests2}
      />

      {/* NEW JOB DIALOG */}
      <NewJobDialog
        open={showNewJobDialog}
        close={() => {
          setShowNewJobDialog(false);
        }}
        tests={tests2}
        drvPrgms={drvPrgms}
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
        tests={tests2}
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
        tests={tests2}
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
        tests={tests2}
        getSystems={getSystems}
      />

      <Grid container spacing={2}>
        <Grid item>
          {dataReady && (
            <Animate show={dataReady}>
              <SysCard
                sys={systems2}
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
              <SysSummCard sys={systems2} />
            </Animate>
          )}
        </Grid>
        <Grid item>
          {dataReady && (
            <Animate show={dataReady}>
              <ServerStorageCard />
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
                tests={tests2}
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
            <Divider sx={{ marginTop: "10px" }}>Qual Workspace</Divider>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default System;
