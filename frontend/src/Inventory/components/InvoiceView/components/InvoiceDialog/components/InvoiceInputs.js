import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";
import { Grid, Divider } from "@mui/material";
import {
  AccountCircle,
  BadgeRounded,
  AccountBoxRounded,
  LocationOnRounded,
} from "@mui/icons-material";

// ICONS
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

// COMPONENTS
import TextFieldWIcon from "../../../../../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../../../../../Shared/components/Input/SelectMenu";
import DatePicker from "../../../../../../Shared/components/Input/DatePicker";
import Animate from "../../../../../../Shared/transitions/Animate";
import AddDrvPrgmDialog from "./AddDrvPrgmDialog";
import FileAttachment from "../../../../../../Shared/components/Input/FileAttachment";

// VARIABLES
import { serverName } from "../../../../../../Shared/variables/Variables";

const InvoiceInputs = (props) => {
  const [drvPrgms, setDrvPrgms] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [showAddDrvPrgmDialog, setShowAddDrvPrgmDialog] = useState(false);
  const { sendRequest } = useHttpClient();
  const [selectData, setSelectData] = useState();
  const [selectDataReady, setSelectDataReady] = useState(false);

  useEffect(() => {
    setSelectDataReady(false);
    if (dataReady) {
      setSelectData(
        drvPrgms.map((prgm) => {
          return {
            value: prgm.id,
            label: prgm.drvPrgm + " (" + prgm.alias + ") ",
          };
        })
      );
      setSelectDataReady(true);
    }
    // eslint-disable-next-line
  }, [dataReady, drvPrgms]);

  // GET DRIVE PROGRAMS
  const getDrvPrgms = async () => {
    setDataReady(false);
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
      <AddDrvPrgmDialog
        open={showAddDrvPrgmDialog}
        close={() => setShowAddDrvPrgmDialog(false)}
        drvPrgms={drvPrgms}
        getDrvPrgms={getDrvPrgms}
        setInvDialogInputState={props.setInvDialogInputState}
        invInputState={props.inputState}
      />
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextFieldWIcon
            required
            label="Invoice ID"
            startIcon={<AccountCircle />}
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
            startIcon={<BadgeRounded />}
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
            startIcon={<AccountBoxRounded />}
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
            startIcon={<LocationOnRounded />}
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
            value={dataReady && selectDataReady ? props.inputState.drvPrgm : ""}
            name="drvPrgm"
            disabled={disabled}
            addOption
            addOptionText="Add Drive Program"
            addOptionHandler={() => {
              setShowAddDrvPrgmDialog(true);
            }}
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
            startIcon={<DescriptionRoundedIcon />}
            name="description"
            value={
              props.inputState.description ? props.inputState.description : ""
            }
            onChange={props.inputHandler}
            disabled={disabled}
            autoComplete="off"
          ></TextFieldWIcon>
        </Grid>
        {/* FILE ATTACHMENTS */}
        <Grid item xs={12}>
          <Divider>File Attachments</Divider>
        </Grid>
        <FileAttachment
          label="Invoice"
          name="invFile"
          value={props.inputState.invFile}
          inputHandler={props.inputHandler}
          textFieldDisabled={disabled}
          buttonsDisabled={
            !(props.inputState.invFile && props.invDialogState === "view")
          }
          openFileHandler={props.openFileHandler}
          downloadFileHandler={props.downloadFileHandler}
        />
        <FileAttachment
          label="Request Form"
          name="reqFormFile"
          value={props.inputState.reqFormFile}
          inputHandler={props.inputHandler}
          textFieldDisabled={disabled}
          buttonsDisabled={
            !(props.inputState.reqFormFile && props.invDialogState === "view")
          }
          openFileHandler={props.openFileHandler}
          downloadFileHandler={props.downloadFileHandler}
        />
      </Grid>
    </React.Fragment>
  );
};

export default InvoiceInputs;
