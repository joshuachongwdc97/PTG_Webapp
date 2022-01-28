import React from "react";

import { Grid } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TestDetCard from "./components/TestDetCard";

const TestsDialog = (props) => {
  const TestDetCards = props.tests.map((test) => {
    return (
      <Grid item xs={3} key={test.id}>
        <TestDetCard test={test} drvPrgms={props.drvPrgms} key={test.id} />
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
      <Grid container spacing={1.5}>
        {TestDetCards}
      </Grid>
    </BasicDialog>
  );
};

export default TestsDialog;
