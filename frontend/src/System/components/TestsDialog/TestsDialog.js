import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import TestDetCard from "./components/TestDetCard";
import TestsFilter from "./components/TestsFilter";

const TestsDialog = (props) => {
  const [testDetCards, setTestDetCards] = useState([]);

  const getTestDetCards = () => {
    setTestDetCards(
      props.tests.map((test) => {
        return (
          <Grid item xs={3} key={test.id}>
            <TestDetCard test={test} drvPrgms={props.drvPrgms} key={test.id} />
          </Grid>
        );
      })
    );
  };

  // manually resets filter because dialog component does not unmount on close
  // open and close only controls the visibility
  useEffect(
    () => {
      if (props.open) {
        getTestDetCards();
      }
    },
    // eslint-disable-next-line
    [props.open]
  );

  return (
    <BasicDialog
      open={props.open}
      close={props.close}
      title="Supported Tests"
      maxWidth="lg"
      position={{ position: "fixed", top: "3%" }}
    >
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <TestsFilter
            tests={props.tests}
            drvPrgms={props.drvPrgms}
            setTestDetCards={setTestDetCards}
          />
        </Grid>

        {testDetCards.length ? (
          testDetCards
        ) : (
          <Grid
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "250px",
              display: "flex",
            }}
          >
            <Typography variant="h6">No Tests Found</Typography>
          </Grid>
        )}
      </Grid>
    </BasicDialog>
  );
};

export default TestsDialog;
