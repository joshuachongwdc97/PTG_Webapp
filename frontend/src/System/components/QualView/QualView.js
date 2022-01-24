import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { serverName } from "../../../Shared/variables/Variables";

import { Grid } from "@mui/material";

import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import QualCard from "./components/QualCard";

const QualView = (props) => {
  const { sendRequest } = useHttpClient();

  const [tests, setTests] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [dataReady, setDataReady] = useState(false);

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

  const getInvoices = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/invoice"
      );
      setInvoices(responseData.invoices);
    } catch (err) {}
  };

  useEffect(
    () => {
      if (props.quals.length > 0) {
        getTests();
        getDrvPrgms();
        getInvoices();
        setDataReady(true);
      }
    }, // eslint-disable-next-line
    [props.quals]
  );

  const QualCards = props.quals.map((qual) => {
    const test = tests.filter((test) => {
      return test.id === qual.test;
    })[0];

    const drvPrgm = drvPrgms.filter((prgm) => {
      return prgm.id === test.drvPrgm;
    })[0];

    const invoice = invoices.filter((inv) => {
      return inv.id === qual.invoice;
    })[0];

    return (
      <Grid item xs={2} key={qual.id}>
        {test && drvPrgm && (
          <QualCard
            qual={qual}
            test={test}
            drvPrgm={drvPrgm}
            invoice={invoice}
          />
        )}
      </Grid>
    );
  });

  return (
    dataReady && (
      <React.Fragment>
        <OutlinedCard>
          <Grid container spacing={2}>
            {QualCards}
          </Grid>
        </OutlinedCard>
      </React.Fragment>
    )
  );
};

export default QualView;
