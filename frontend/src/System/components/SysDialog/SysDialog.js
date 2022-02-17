import React, { useEffect, useState } from "react";

// COMPONENTS
import { Grid } from "@mui/material";
import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import SysRackCard from "./components/SysRackCard";
import SysInfoDialog from "./components/SysInfoDialog";
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";

// ICONS
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SysDialog = (props) => {
  const [showSysInfoDialog, setShowSysInfoDialog] = useState(false);
  const [selectedSys, setSelectedSys] = useState();
  const [test, setTest] = useState();
  const [invoice, setInvoice] = useState();
  const [qual, setQual] = useState();
  const [inputState, setInputState] = useState();

  // Refresh System Details
  useEffect(
    () => {
      if (props.open) {
        props.getSystems();
      }
    }, // eslint-disable-next-line
    [props.open]
  );

  // GET RACK NUMBER ARRAYS
  let rackNoArr = props.systems.map((sys) => {
    return sys.rackNo;
  });

  rackNoArr = [...new Set(rackNoArr)];

  // Use Effect to update Selected System Details on change
  useEffect(
    () => {
      if (selectedSys) {
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

  const RackCards = rackNoArr.map((rackNo) => {
    const sysInRack = props.systems.filter((sys) => {
      return sys.rackNo === rackNo;
    });

    return (
      <Grid item xs={4} key={rackNo}>
        <SysRackCard
          rackNo={rackNo}
          sysInRack={sysInRack}
          key={rackNo}
          showSysInfoDialog={(sys) => {
            setShowSysInfoDialog(true);
            setSelectedSys(sys);
          }}
          quals={props.quals}
          tests={props.tests}
          inputState={inputState}
        />
      </Grid>
    );
  });

  const inputHandler = (event) => {
    let value = event.target.value.toUpperCase();

    if (value.length >= 5) {
      setInputState(value);
    }
  };

  return (
    <React.Fragment>
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
        />
      )}

      <BasicDialog
        close={() => {
          setInputState();
          props.close();
        }}
        open={props.open}
        title="System Control Panel"
        fullScreen
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldWIcon
              label="Search"
              startIcon={<SearchRoundedIcon />}
              placeholder="Serial Number"
              onChange={inputHandler}
              // no value={inputState} because inputState is not reflective of user input as inputState is only set when user input.length >= 5
            />
          </Grid>
          {RackCards}
        </Grid>
      </BasicDialog>
    </React.Fragment>
  );
};

export default SysDialog;
