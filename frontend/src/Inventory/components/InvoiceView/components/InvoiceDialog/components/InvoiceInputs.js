import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";
import { Grid, Divider } from "@mui/material";
import {
  AccountCircle,
  BadgeRounded,
  AccountBoxRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

// COMPONENTS
import TextFieldWIcon from "../../../../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../../../../Shared/components/Input/SelectMenu";
import DatePicker from "../../../../../../Shared/components/Input/DatePicker";
import Animate from "../../../../../../Shared/transitions/Animate";

// VARIABLES
import { serverName } from "../../../../../../Shared/variables/Variables";

const InvoiceInputs = (props) => {
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const { sendRequest } = useHttpClient();

  let selectData;
  dataReady &&
    (selectData = drvPrgms.map((prgm) => {
      return {
        value: prgm.id,
        label: prgm.drvPrgm + " (" + prgm.alias + ") ",
      };
    }));

  // GET DRIVE PROGRAMS
  const getDrvPrgms = async () => {
    try {
      let responseData = await sendRequest(
        "http://" + serverName + "/api/drvProgram"
      );
      setDrvPrgms(responseData.programs);
    } catch (err) {}

    console.log("Drive Programs fetched from server");
    setDataReady(true);
  };

  let disabled;
  let invIDInputDisabled;
  props.invDialogState === "view" ? (disabled = true) : (disabled = false);
  props.invDialogState === "new"
    ? (invIDInputDisabled = false)
    : (invIDInputDisabled = true);

  useEffect(
    () => {
      getDrvPrgms();
    },
    // eslint-disable-next-line
    []
  );

  const InvIDArr = props.invoices.map((inv) => {
    return inv.invid;
  });

  return (
    <React.Fragment>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextFieldWIcon
            required
            label="Invoice ID"
            icon={<AccountCircle />}
            name="invid"
            value={props.inputState.invid}
            onChange={props.inputHandler}
            unique
            uniqueArr={InvIDArr}
            disabled={invIDInputDisabled}
            autoComplete="off"
            placeholder="5805-2021-12-37-NC0332"
          ></TextFieldWIcon>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWIcon
            required
            label="Name"
            icon={<BadgeRounded />}
            name="name"
            value={props.inputState.name}
            onChange={props.inputHandler}
            disabled={disabled}
            autoComplete="off"
            placeholder="PCM SC3/MC3 QUALIFICATION FEN"
          ></TextFieldWIcon>
        </Grid>

        {/* SOURCE */}
        <Grid item xs={12}>
          <Divider>Source</Divider>
        </Grid>
        <Grid item xs={6}>
          <TextFieldWIcon
            required
            label="Requestor"
            icon={<AccountBoxRounded />}
            name="requestor"
            value={props.inputState.requestor}
            onChange={props.inputHandler}
            disabled={disabled}
            placeholder="John Doe"
          ></TextFieldWIcon>
        </Grid>
        <Grid item xs={6}>
          <TextFieldWIcon
            required
            label="Origin"
            icon={<LocationOnRounded />}
            name="origin"
            value={props.inputState.origin}
            onChange={props.inputHandler}
            disabled={disabled}
            placeholder="PRB Thailand"
          ></TextFieldWIcon>
        </Grid>

        {/* MISCELLANEOUS */}
        <Grid item xs={12}>
          <Divider>Miscellaneous</Divider>
        </Grid>
        <Grid item xs={6}>
          <SelectMenu
            required
            label="Drive Program"
            data={selectData}
            onChange={props.inputHandler}
            value={dataReady ? props.inputState.drvPrgm : ""}
            name="drvPrgm"
            disabled={disabled}
          ></SelectMenu>
        </Grid>
        {!props.inputState.dateReturned ? (
          <Grid item xs={6}>
            <Animate show>
              <DatePicker
                required
                label="Date Received"
                value={new Date(props.inputState.dateReceived)}
                onChange={props.dateReceivedHandler}
                disabled={disabled}
              />
            </Animate>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={3}>
              <Animate show>
                <DatePicker
                  required
                  label="Date Received"
                  value={new Date(props.inputState.dateReceived)}
                  onChange={props.dateReceivedHandler}
                  disabled={disabled}
                />
              </Animate>
            </Grid>
            <Grid item xs={3}>
              <Animate show>
                <DatePicker
                  required
                  label="Date Returned"
                  value={new Date(props.inputState.dateReturned)}
                  onChange={props.dateReturnedHandler}
                  disabled={disabled}
                />
              </Animate>
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={12}>
          <TextFieldWIcon
            label="Description/Remarks"
            icon={<DescriptionRoundedIcon />}
            name="description"
            value={props.inputState.description}
            onChange={props.inputHandler}
            disabled={disabled}
            autoComplete="off"
          ></TextFieldWIcon>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InvoiceInputs;
