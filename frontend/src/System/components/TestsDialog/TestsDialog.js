import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TestDetCard from "./components/TestDetCard";

// API Requests
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { serverName } from "../../../Shared/variables/Variables";

const TestsDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [dataReady, setDataReady] = useState(false);
  const [tests, setTests] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);

  const getTests = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/test/all"
      );
      setTests(responseData.tests);

      responseData = await sendRequest(
        "http://" + serverName + "/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);
    } catch (err) {}

    console.log("Tests and Drv Prgm fetched from server");
    setDataReady(true);
  };

  useEffect(
    () => {
      if (props.open) {
        getTests();
      }
    }, // eslint-disable-next-line
    [props.open]
  );

  const TestDetCards = tests.map((test) => {
    return (
      <Grid item xs={3} key={test.id}>
        <TestDetCard
          test={test}
          drvPrgms={drvPrgms}
          key={test.id}
          getTests={getTests}
        />
      </Grid>
    );
  });

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      title="Supported Tests"
      maxWidth="lg"
    >
      {dataReady && (
        <Grid container spacing={1.5}>
          {TestDetCards}
        </Grid>
      )}
    </BasicDialog>
  );
};

export default TestsDialog;
