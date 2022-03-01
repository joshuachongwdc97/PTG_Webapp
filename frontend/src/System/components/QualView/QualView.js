import React from "react";

import { Grid } from "@mui/material";

import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import QualCard from "./components/QualCard";

const QualView = (props) => {
  const QualCards = props.quals.map((qual) => {
    // Get Current Qual's Test
    const test = props.tests.filter((test) => {
      return test.id === qual.test;
    })[0];

    let drvPrgm;
    let invoice;
    let systems;

    if (test) {
      drvPrgm = props.drvPrgms.filter((prgm) => {
        return prgm.id === test.drvPrgm;
      })[0];

      invoice = props.invoices.filter((inv) => {
        return inv.id === qual.invoice;
      })[0];

      systems = props.systems.filter((sys) => {
        return sys.qual === qual.id;
      });
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
              systems={systems}
              getQuals={props.getQuals}
              getSystems={props.getSystems}
              setShowQualSysDialog={props.setShowQualSysDialog}
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
