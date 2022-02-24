import React from "react";

import { Grid } from "@mui/material";

import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import QualCard from "./components/QualCard";

const QualView = (props) => {
  const QualCards = props.quals.map((qual) => {
    const test = props.tests.filter((test) => {
      return test.id === qual.test;
    })[0];

    let drvPrgm;
    let invoice;

    if (test) {
      drvPrgm = props.drvPrgms.filter((prgm) => {
        return prgm.id === test.drvPrgm;
      })[0];

      invoice = props.invoices.filter((inv) => {
        return inv.id === qual.invoice;
      })[0];
    }

    return (
      <React.Fragment key={qual.id}>
        {test && (
          <Grid item xs={2.4} key={qual.id}>
            <QualCard
              qual={qual}
              test={test}
              drvPrgm={drvPrgm}
              invoice={invoice}
              systems={props.systems}
              getQuals={props.getQuals}
              setShowSysDialog={props.setShowSysDialog}
              setSelectedQual={props.setSelectedQual}
            />
          </Grid>
        )}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <OutlinedCard>
        <Grid container spacing={2}>
          {QualCards}
        </Grid>
      </OutlinedCard>
    </React.Fragment>
  );
};

export default QualView;
