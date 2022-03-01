import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography } from "@mui/material";

// COMPONENTS
import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import SysRowCard from "../SysDialog/components/SysRowCard";
import SysInfoDialog from "../SysDialog/components/SysInfoDialog";
import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import SysRackSumm from "../SysDialog/components/SysRackSumm";

// FUNCTIONS
import getSysSumm from "../../../Shared/functions/getSysSumm";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";

// ICONS
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const QualSysDialog = (props) => {
  const [inputState, setInputState] = useState("");
  const [showSysInfoDialog, setShowSysInfoDialog] = useState(false);
  const [selectedSys, setSelectedSys] = useState();
  const [test, setTest] = useState();
  const [invoice, setInvoice] = useState();
  const [qual, setQual] = useState();

  // Refresh System Details
  useEffect(
    () => {
      if (props.open) {
        props.getSystems();
      }
    }, // eslint-disable-next-line
    [props.open]
  );

  // Use Effect to update Selected System Details on change
  useEffect(
    () => {
      if (selectedSys && props.systems) {
        const newSysDetails = props.systems.filter((sys) => {
          return sys.id === selectedSys.id;
        });
        setSelectedSys(newSysDetails[0]);
      }
    }, // eslint-disable-next-line
    [props.systems]
  );

  // Get Selected Sys Qual Details
  useEffect(() => {
    if (selectedSys) {
      if (selectedSys.qual) {
        setQual(
          props.quals.filter((qual) => {
            return qual.id === selectedSys.qual;
          })[0]
        );
      }
    } else {
      setQual();
    }
  }, [selectedSys, props.quals]);

  // Get More Qual Details
  useEffect(() => {
    if (qual) {
      setInvoice(
        props.invoices.filter((inv) => {
          return inv.id === qual.invoice;
        })[0]
      );

      setTest(
        props.tests.filter((test) => {
          return test.id === qual.test;
        })[0]
      );
    } else {
      setInvoice();
      setTest();
    }
  }, [props.invoices, props.tests, qual]);

  const inputHandler = (event) => {
    let value = event.target.value.toUpperCase();
    setInputState(value);
  };

  const qualSys = props.systems.filter((sys) => {
    if (props.selectedQual.id === sys.qual) {
      return true;
    }
    return false;
  });

  const QualSysCards = qualSys.map((sys) => {
    let matchSearch;
    if (sys.drive && inputState) {
      matchSearch = sys.drive.includes(inputState) ? "#474747" : false;
    }

    return (
      <Grid item key={sys.id} xs={1.5} align="center">
        <SysRowCard
          sys={sys}
          matchSearch={matchSearch}
          showSysInfoDialog={(sys) => {
            setSelectedSys(sys);
            setShowSysInfoDialog(true);
          }}
          rackNoPrefix
        />
      </Grid>
    );
  });

  return (
    // use id in title Qual #123456 systems
    <BasicDialog
      title={"Qual #" + props.selectedQual.soda + " Systems"}
      open={props.open}
      close={() => {
        setInputState("");
        props.close();
      }}
      maxWidth="md"
    >
      {props.open && (
        <SysInfoDialog
          open={showSysInfoDialog}
          close={() => {
            setShowSysInfoDialog(false);
            setSelectedSys();
          }}
          sys={selectedSys}
          test={test}
          qual={qual}
          invoice={invoice}
          getData={props.getData}
          getSystems={props.getSystems}
        />
      )}
      <OutlinedCard>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={4}>
            <TextFieldWIcon
              startIcon={<SearchRoundedIcon />}
              onChange={inputHandler}
              value={inputState}
              placeholder="Serial Number"
              size="small"
            />
          </Grid>

          <Grid
            item
            container
            xs={8}
            spacing={1}
            alignItems="center"
            justifyContent="end"
          >
            <SysRackSumm sysSumm={getSysSumm(qualSys)} />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {QualSysCards}
        </Grid>
      </OutlinedCard>
    </BasicDialog>
  );
};

export default QualSysDialog;
