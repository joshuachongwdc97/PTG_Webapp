import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../../Shared/hooks/http-hook";
import { Button, Grid, Divider, Alert } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../Shared/components/Dialog/Dialog";
import InvoiceInputs from "./components/InvoiceInputs";
import DriveUpload from "./components/DriveUpload";
import OutlinedCard from "../../../../../Shared/components/Card/OutlinedCard";
import InvDialogActions from "./components/InvDialogActions";

// ICONS
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import DeleteDialog from "./components/DeleteDialog";

// VARIABLES
import { serverName } from "../../../../../Shared/variables/Variables";

const InvoiceDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const [activeTab, setActiveTab] = useState("invoice");
  const [invBtnVar, setInvBtnVar] = useState("outlined");
  const [drvBtnVar, setDrvBtnVar] = useState("outlined");
  const [inputState, setInputState] = useState({
    name: "",
    invid: "",
    requestor: "",
    origin: "",
    dateReceived: new Date().toString(),
    drvPrgm: "",
    status: "",
  });
  const [inputReady, setInputReady] = useState(false);
  const [drives, setDrives] = useState([]);
  const [selectedDrvs, setSelectedDrvs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [invExistError, setInvExistError] = useState(false);
  const [invDialogState, setInvDialogState] = useState("new");
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [unmodifiedState, setUnmodifiedState] = useState();
  const [modifiable, setModifiable] = useState(false);

  // CHECK IF DATA MODIIFIED IN MODIFY STATE
  useEffect(() => {
    if (invDialogState === "modify") {
      if (
        inputState.name !== unmodifiedState.name ||
        inputState.requestor !== unmodifiedState.requestor ||
        inputState.origin !== unmodifiedState.origin ||
        inputState.dateReceived !== unmodifiedState.dateReceived ||
        inputState.drvPrgm !== unmodifiedState.drvPrgm ||
        drives !== unmodifiedState.drives
      ) {
        setModifiable(true);
      } else {
        setModifiable(false);
      }
    }
  }, [inputState, invDialogState, unmodifiedState, modifiable, drives]);

  // CHECK IF DIALOG WAS SPAWNED WITH INVOICE CLICK
  useEffect(() => {
    if (props.selection.length > 0) {
      // Get Invoice Data
      const invoiceData = props.invoices.filter((inv) => {
        return inv.id === props.selection[0];
      })[0];

      // Get Drives Data
      const driveData = props.drives.filter((drv) => {
        return drv.invid === props.selection[0];
      });

      setInputState({
        ...inputState,
        name: invoiceData.name,
        invid: invoiceData.invid,
        requestor: invoiceData.requestor,
        origin: invoiceData.origin,
        dateReceived: invoiceData.dateReceived,
        drvPrgm: invoiceData.drvPrgm,
        status: invoiceData.status,
      });

      setDrives(driveData);
      setInvDialogState("view");
    }
    // eslint-disable-next-line
  }, [props.selection]);

  // TAB SELECTION
  useEffect(() => {
    if (activeTab === "invoice") {
      setInvBtnVar("contained");
      setDrvBtnVar("outlined");
    } else {
      setInvBtnVar("outlined");
      setDrvBtnVar("contained");
    }
  }, [activeTab]);

  // INPUT VALIDATION (CHECK IF ALL FIELDS CORRECT)
  useEffect(() => {
    if (invDialogState === "new") {
      let InvIDArr = props.invoices.map((inv) => {
        return inv.invid;
      });

      if (
        !inputState.invid ||
        !inputState.name ||
        !inputState.requestor ||
        !inputState.origin ||
        !inputState.drvPrgm
      ) {
        setInputReady(false);
        if (!props.selection.length) {
          setInvExistError(InvIDArr.includes(inputState.invid));
        }
      } else {
        setInputReady(!InvIDArr.includes(inputState.invid));
        if (!props.selection.length) {
          setInvExistError(InvIDArr.includes(inputState.invid));
        }
      }
    }
  }, [inputState, props.invoices, invDialogState, props.selection]);

  // RESET INPUT STATE WHEN DIALOG CLOSED
  useEffect(() => {
    if (!props.open) {
      resetInputState();
      setInvDialogState("new");
    }
  }, [props.open]);

  // INPUT HANDLER
  const inputHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "invid" || event.target.name === "name") {
      value = event.target.value.toUpperCase();
    }
    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

  const dateHandler = (value) => {
    setInputState({
      ...inputState,
      dateReceived: value.toString(),
    });
  };

  const resetInputState = () => {
    setInputState({
      name: "",
      invid: "",
      requestor: "",
      origin: "",
      dateReceived: new Date().toString(),
      drvPrgm: "",
    });
    setDrives([]);
    setActiveTab("invoice");
  };

  const driveUploadHandler = (drive) => {
    let drivearr = drive.map((drv) => {
      return {
        id: drv.sn,
        sn: drv.sn,
        label: drv.label,
        drvType: drv.drvType,
        capacity: drv.capacity,
        interface: drv.interface,
      };
    });
    drivearr = drivearr.concat(drives);

    // Remove Internal Duplicates
    const drivesnarr = drivearr.map((drv) => {
      return drv.sn;
    });
    const uniqueDriveArr = drivearr.filter((drv, index) => {
      return drivesnarr.indexOf(drv.sn) === index;
    });

    setDrives(uniqueDriveArr);
  };

  const drvSelectedHandler = (e) => {
    setSelectedDrvs(e);
  };

  const delDrvHandler = () => {
    let drvLeft = [];

    if (invDialogState === "modify") {
      drvLeft = drives.filter((drv) => {
        return !selectedDrvs.includes(drv.id);
      });

      setDrives(drvLeft);
      setSelectedDrvs([]);
    } else if (invDialogState === "new") {
      drvLeft = drives.filter((drv) => {
        return !selectedDrvs.includes(drv.id);
      });
      setSelectedDrvs([]);
      setDrives(drvLeft);
    }
  };

  const returnToggleHandler = async () => {
    const NewInv = {
      ...inputState,
    };
    if (NewInv.status === "Active") {
      NewInv.status = "Returned";
      setInputState({
        ...inputState,
        status: "Returned",
      });
    } else {
      NewInv.status = "Active";
      setInputState({
        ...inputState,
        status: "Active",
      });
    }

    try {
      await sendRequest(
        `http://${serverName}/api/invoice/${props.selection[0]}`,
        "PATCH",
        JSON.stringify(NewInv),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  };

  // SUBMIT INVOICE
  const submitHandler = async () => {
    setSubmitting(true);

    if (invDialogState === "new") {
      const NewInv = {
        ...inputState,
        status: "Active",
      };

      let id;

      // CREATE NEW INVOICE
      try {
        const response = await sendRequest(
          "http://" + serverName + "/api/invoice/add",
          "POST",
          JSON.stringify(NewInv),
          { "Content-Type": "application/json" }
        );
        id = response.invoice.id;

        // ADD DRIVES
        if (drives.length > 0) {
          let newDrives = {
            drives: drives.map((drv) => {
              return {
                ...drv,
                invid: id,
              };
            }),
          };

          try {
            await sendRequest(
              "http://" + serverName + "/api/drive/add",
              "POST",
              JSON.stringify(newDrives),
              { "Content-Type": "application/json" }
            );
          } catch (err) {}
        }
      } catch (err) {}
    } else {
      const NewInv = {
        ...inputState,
      };

      // MODIFY INVOICE
      try {
        await sendRequest(
          `http://${serverName}/api/invoice/${props.selection[0]}`,
          "PATCH",
          JSON.stringify(NewInv),
          { "Content-Type": "application/json" }
        );

        // ADD DRIVES
        if (drives.length > 0) {
          let newDrives = {
            drives: drives.map((drv) => {
              return {
                ...drv,
                invid: props.selection[0],
              };
            }),
          };

          try {
            await sendRequest(
              "http://" + serverName + "/api/drive/add",
              "POST",
              JSON.stringify(newDrives),
              { "Content-Type": "application/json" }
            );
          } catch (err) {}
        }

        // DELETE REMOVED DRIVES
        let newDrvArr = drives.map((drv) => {
          return drv.id;
        });

        let removedDrvs = unmodifiedState.drives.filter((drv) => {
          return !newDrvArr.includes(drv.id);
        });

        let drvIDToRemove = {
          ids: removedDrvs.map((drv) => {
            return drv.id;
          }),
        };

        try {
          await sendRequest(
            "http://" + serverName + "/api/drive",
            "DELETE",
            JSON.stringify(drvIDToRemove),
            { "Content-Type": "application/json" }
          );
        } catch (err) {}
      } catch (err) {}
    }

    setSubmitting(false);
    props.getData();
    props.close();
  };

  const DialogActions = (
    <InvDialogActions
      close={props.close}
      submitHandler={submitHandler}
      submitting={submitting}
      inputReady={inputReady}
      resetInputState={resetInputState}
      invDialogState={invDialogState}
      editHandler={() => {
        setInvDialogState("modify");
        setUnmodifiedState({
          ...inputState,
          drives: drives,
        });
      }}
      cancelEditHandler={() => {
        setInvDialogState("view");
        setUnmodifiedState();
      }}
      delHandler={() => {
        setShowDelDialog(true);
      }}
      modifiable={modifiable}
      status={inputState.status}
      returnToggleHandler={returnToggleHandler}
    />
  );

  return (
    <React.Fragment>
      {showDelDialog && (
        <DeleteDialog
          open={showDelDialog}
          close={() => {
            setShowDelDialog(false);
          }}
          postDel={() => {
            setShowDelDialog(false);
            props.close();
          }}
          id={props.selection[0]}
          drives={drives}
        />
      )}

      <Dialog
        open={props.open}
        close={props.close}
        maxWidth="md"
        actions={DialogActions}
      >
        <Grid container columnSpacing={1} rowSpacing={3}>
          <Grid item xs={6}>
            <Button
              variant={invBtnVar}
              onClick={() => {
                setActiveTab("invoice");
              }}
              startIcon={<CreateNewFolderRoundedIcon />}
              fullWidth
              size="large"
            >
              Invoice
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={drvBtnVar}
              onClick={() => {
                setActiveTab("drive");
              }}
              startIcon={<PostAddRoundedIcon />}
              fullWidth
              size="large"
            >
              Drives | {drives.length}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <OutlinedCard>
              {activeTab === "invoice" ? (
                <React.Fragment>
                  {invExistError && (
                    <Alert sx={{ mb: 2 }} severity="error">
                      Duplicate Invoice ID Detected!
                    </Alert>
                  )}
                  <InvoiceInputs
                    inputState={inputState}
                    dateHandler={dateHandler}
                    inputHandler={inputHandler}
                    invoices={props.invoices}
                    invDialogState={invDialogState}
                  />
                </React.Fragment>
              ) : (
                <DriveUpload
                  drives={drives}
                  driveUploadHandler={driveUploadHandler}
                  invDialogState={invDialogState}
                  selection={selectedDrvs}
                  selectedHandler={drvSelectedHandler}
                  delDrvHandler={delDrvHandler}
                />
              )}
            </OutlinedCard>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default InvoiceDialog;
