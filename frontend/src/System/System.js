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
import QualView from "./components/QualView/QualView";
import ServerStorageCard from "./components/ServerStorageCard/ServerStorageCard";

// VARIABLES
import { serverName } from "../Shared/variables/Variables";
import SysSummaryCard from "./components/SysSummaryCard/SysSummaryCard";

// FUNCTIONS
import sysStatus from "../Shared/functions/sysStatus";

const System = (props) => {
  const { sendRequest } = useHttpClient();
  const [systems, setSystems] = useState([]);
  const [systems2, setSystems2] = useState([]);
  const [quals, setQuals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tests, setTests] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [showSysDialog, setShowSysDialog] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [showAddSysDialog, setShowAddSysDialog] = useState(false);
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [showTestsDialog, setShowTestsDialog] = useState(false);
  const [showNewQualDialog, setShowNewQualDialog] = useState(false);
  const [selectedQual, setSelectedQual] = useState("");

  const getSystems = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/system"
      );
      setSystems(responseData.systems);
    } catch (err) {}
  };

  const getQuals = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/qual/all"
      );
      setQuals(responseData.quals);
    } catch (err) {}
  };

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
    getQuals();
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

  // Populate System Status
  useEffect(() => {
    if (systems.length > 0 && quals.length > 0 && tests.length > 0) {
      setSystems2(
        systems.map((sys) => {
          if (sys.qual) {
            const testID = quals.filter((qual) => {
              return qual.id === sys.qual;
            })[0].test;

            const test = tests.filter((test) => {
              return test.id === testID.toString();
            })[0];

            return { ...sys, stat: sysStatus(sys, test) };
          } else {
            return { ...sys, stat: sysStatus(sys) };
          }
        })
      );
    }
  }, [systems, quals, tests]);

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
        quals={quals}
        getData={getData}
        getSystems={getSystems}
        getTests={getTests}
        getInvoices={getInvoices}
        getDrvPrgms={getDrvPrgms}
        selectedQual={selectedQual}
        setSelectedQual={setSelectedQual}
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
              <SysSummaryCard sys={systems} />
            </Animate>
          )}
        </Grid>

        <Grid item xs={12}>
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
                systems={systems}
                getQuals={getQuals}
                getSystems={getSystems}
                setShowSysDialog={setShowSysDialog}
                setSelectedQual={setSelectedQual}
              />
            </Animate>
          )}
        </Grid>
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
