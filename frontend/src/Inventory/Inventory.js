import React, { useState, useEffect } from "react";
import { useHttpClient } from "../Shared/hooks/http-hook";

import { Grid, Divider } from "@mui/material";

// Assets
import GIF from "../Shared/assets/cute.gif";

// Self Built Components
import DrvCard from "./components/DrvCard/DrvCard";
import InvCard from "./components/InvCard/InvCard";
import SummCard from "./components/SummCard/SummCard";
import Animate from "../Shared/transitions/Animate";
import InvoiceView from "./components/InvoiceView/InvoiceView";
import MediaCard from "../Shared/components/Card/MediaCard";

// Self Built Functions
import getActiveInvDrv from "../Shared/functions/getActiveInvDrv";
// import getDrv from "../Shared/functions/getDrv";

const Inventory = () => {
  const { sendRequest } = useHttpClient();

  const [dataReady, setDataReady] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [drives, setDrives] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);

  const getData = async () => {
    try {
      let responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/invoice"
      );
      setInvoices(responseData.invoices);

      responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/drive"
      );
      setDrives(responseData.drives);

      responseData = await sendRequest(
        "http://mps-ed-ptgval.ad.shared:5000/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);
    } catch (err) {}

    console.log("Data fetched from server");
    setDataReady(true);
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

  // Get Active Invoices & Drives
  let activeInvs, activeDrvs;
  [activeInvs, activeDrvs] = getActiveInvDrv(invoices, drives);

  return (
    <React.Fragment>
      {dataReady && (
        <Grid container spacing={2}>
          <Grid item xs={2.5}>
            <Animate show={dataReady}>
              <DrvCard data={activeDrvs} />
            </Animate>
          </Grid>
          <Grid item xs={2.5}>
            <Animate show={dataReady}>
              <InvCard data={activeInvs} />
            </Animate>
          </Grid>
          <Grid item xs={5}>
            <Animate show={dataReady}>
              <SummCard
                title="Aging Drives (Summary)"
                invoices={activeInvs}
                drives={activeDrvs}
              />
            </Animate>
          </Grid>
          <Grid item xs={2}>
            <Animate show={dataReady}>
              <MediaCard media={GIF} />
            </Animate>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Animate show={dataReady}>
              <InvoiceView
                invoices={invoices}
                drives={drives}
                drvPrgms={drvPrgms}
                getData={getData}
              />
            </Animate>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Inventory;
