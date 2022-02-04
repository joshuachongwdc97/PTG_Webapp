import React, { useState, useEffect } from "react";
import { useHttpClient } from "../Shared/hooks/http-hook";
import ReactCardFlip from "react-card-flip";

import { Grid, Divider } from "@mui/material";

// Assets
import GIF from "../Shared/assets/cny.gif";

// Self Built Components
import DrvCard from "./components/DrvCard/DrvCard";
import InvCard from "./components/InvCard/InvCard";
import SummCard from "./components/SummCard/SummCard";
import Animate from "../Shared/transitions/Animate";
import InvoiceView from "./components/InvoiceView/InvoiceView";
import MediaCard from "../Shared/components/Card/MediaCard";
import ActiveDrvDialog from "./components/DrvCard/ActiveDrvDialog";
import ActiveInvDialog from "./components/InvCard/ActiveInvDialog";
import LineGraphCard from "./components/LineGraphCard/LineGraphCard";
import PieChartCard from "./components/PieChartCard/PieChartCard";

// Self Built Functions
import getActiveInvDrv from "../Shared/functions/getActiveInvDrv";
// import getDrv from "../Shared/functions/getDrv";
import getActiveTypes from "./components/PieChartCard/getActiveTypes";

// VARIABLES
import { serverName } from "../Shared/variables/Variables";
import getAgingSumm from "./components/LineGraphCard/getAgingSumm";

const Inventory = () => {
  const { sendRequest } = useHttpClient();

  // tracks if getData() has completed on first call / first render
  const [dataReady, setDataReady] = useState(false);
  // tracks if getData() has completed on subsequent calls
  const [changeReady, setChangeReady] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [drives, setDrives] = useState([]);
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [showActiveInvDialog, setShowActiveInvDialog] = useState(false);
  const [showActiveDrvDialog, setShowActiveDrvDialog] = useState(false);
  const [flipSummCard, setFlipSummCard] = useState({ flipSummCard: false });
  const [pieData, setPieData] = useState();
  const [lineData, setLineData] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState("past 3 months");

  const getData = async () => {
    setChangeReady(false);
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/invoice"
      );
      setInvoices(responseData.invoices);

      responseData = await sendRequest("http://" + serverName + "/api/drive");
      setDrives(responseData.drives);

      responseData = await sendRequest(
        "http://" + serverName + "/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);
    } catch (err) {}

    console.log("Data fetched from server");
    setDataReady(true);
    setChangeReady(true);
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

  // set chart data to display active drive data by default
  // charts are automatically updated when a user closes an InvoiceDialog to reflect new data
  useEffect(() => {
    if (changeReady) {
      const category = !flipSummCard.flipSummCard ? "drives" : "invoices";
      setPieData(getActiveTypes(invoices, drives, drvPrgms, category));
      setLineData(getAgingSumm(invoices, drives, selectedPeriod, category));
    }
    // eslint-disable-next-line
  }, [changeReady]);

  // handler to manage the flipped state of the SummCard
  const flipSummCardHandler = () => {
    setFlipSummCard((prevState) => ({ flipSummCard: !prevState.flipSummCard }));

    // on each flip, reset line graph period to display past 3 months
    setSelectedPeriod("past 3 months");

    // alternate line graph and pie chart data between aging drives and aging invoices when clicked
    if (!flipSummCard.flipSummCard) {
      setPieData(getActiveTypes(invoices, drives, drvPrgms, "invoices"));
      setLineData(getAgingSumm(invoices, drives, "past 3 months", "invoices"));
    } else {
      setPieData(getActiveTypes(invoices, drives, drvPrgms, "drives"));
      setLineData(getAgingSumm(invoices, drives, "past 3 months", "drives"));
    }
  };

  // handler to manage period change on line graph
  const changePeriodHandler = (event) => {
    // identify the current category displayed by the SummCard
    const category = !flipSummCard.flipSummCard ? "drives" : "invoices";

    // update line data according to selected period and current category
    setSelectedPeriod(event.currentTarget.value);
    setLineData(
      getAgingSumm(invoices, drives, event.currentTarget.value, category)
    );
  };

  // Get Active Invoices & Drives
  let activeInvs, activeDrvs;
  [activeInvs, activeDrvs] = getActiveInvDrv(invoices, drives);

  const activeDrvDialogHandler = () => {
    setShowActiveDrvDialog(true);
  };

  const activeInvDialogHandler = () => {
    setShowActiveInvDialog(true);
  };

  return (
    <React.Fragment>
      <ActiveDrvDialog
        activeDrvs={activeDrvs}
        open={showActiveDrvDialog}
        close={() => {
          setShowActiveDrvDialog(false);
        }}
      />
      <ActiveInvDialog
        activeInvs={activeInvs}
        drives={drives}
        drvPrgms={drvPrgms}
        open={showActiveInvDialog}
        close={() => {
          setShowActiveInvDialog(false);
        }}
      />
      {dataReady && (
        <Grid container spacing={2} alignItems={"stretch"}>
          <Grid item xs={2.5}>
            <Animate show={dataReady}>
              <DrvCard data={activeDrvs} onClick={activeDrvDialogHandler} />
            </Animate>
          </Grid>
          <Grid item xs={2.5}>
            <Animate show={dataReady}>
              <InvCard data={activeInvs} onClick={activeInvDialogHandler} />
            </Animate>
          </Grid>
          <Grid item xs={5}>
            <Animate show={dataReady}>
              <ReactCardFlip
                isFlipped={flipSummCard.flipSummCard}
                flipDirection="horizontal"
                containerStyle={{ height: "100%" }}
              >
                <SummCard
                  title="Aging Drives (Summary)"
                  invoices={activeInvs}
                  drives={activeDrvs}
                  onClick={flipSummCardHandler}
                />
                <SummCard
                  title="Aging Invoices (Summary)"
                  invoices={activeInvs}
                  drives={activeDrvs}
                  onClick={flipSummCardHandler}
                />
              </ReactCardFlip>
            </Animate>
          </Grid>
          <Grid item xs={2}>
            <Animate show={dataReady}>
              <MediaCard media={GIF} height={150} />
            </Animate>
          </Grid>
          <Grid item xs={8}>
            <Animate show={dataReady} delay="0.2s">
              <LineGraphCard
                data={lineData}
                changePeriodHandler={changePeriodHandler}
                selectedPeriod={selectedPeriod}
              />
            </Animate>
          </Grid>
          <Grid item xs={4} align="center">
            <Animate show={dataReady} delay="0.2s">
              <PieChartCard data={pieData} />
            </Animate>
          </Grid>
          <Grid item xs={12}>
            <Animate show={dataReady} delay="0.3s">
              <Divider />
            </Animate>
          </Grid>
          <Grid item xs={12}>
            <Animate show={dataReady} delay="0.4s">
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
