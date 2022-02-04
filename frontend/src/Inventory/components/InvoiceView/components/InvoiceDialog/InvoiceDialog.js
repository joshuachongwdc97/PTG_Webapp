import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../../../Shared/hooks/http-hook";
import { Button, Grid, Divider, Alert } from "@mui/material";

// COMPONENTS
import Dialog from "../../../../../Shared/components/Dialog/Dialog";
import InvoiceInputs from "./components/InvoiceInputs";
import DriveUpload from "./components/DriveUpload";
import OutlinedCard from "../../../../../Shared/components/Card/OutlinedCard";
import InvDialogActions from "./components/InvDialogActions";
import Animate from "../../../../../Shared/transitions/Animate";

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
    dateReturned: undefined,
    drvPrgm: "",
    status: "",
    description: undefined,
    invFile: undefined,
    reqFormFile: undefined,
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
  const [invFile, setInvFile] = useState();
  const [reqFormFile, setReqFormFile] = useState();
  const [invObjectId, setInvObjectId] = useState();

  // CHECK IF DATA MODIIFIED IN MODIFY STATE
  useEffect(() => {
    if (invDialogState === "modify") {
      if (
        inputState.name !== unmodifiedState.name ||
        inputState.requestor !== unmodifiedState.requestor ||
        inputState.origin !== unmodifiedState.origin ||
        inputState.dateReceived !== unmodifiedState.dateReceived ||
        inputState.dateReturned !== unmodifiedState.dateReturned ||
        inputState.drvPrgm !== unmodifiedState.drvPrgm ||
        inputState.description !== unmodifiedState.description ||
        inputState.invFile !== unmodifiedState.invFile ||
        inputState.reqFormFile !== unmodifiedState.reqFormFile ||
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

      setInvObjectId(invoiceData.id);

      setInputState({
        ...inputState,
        name: invoiceData.name,
        invid: invoiceData.invid,
        requestor: invoiceData.requestor,
        origin: invoiceData.origin,
        dateReceived: invoiceData.dateReceived,
        dateReturned: invoiceData.dateReturned,
        drvPrgm: invoiceData.drvPrgm,
        status: invoiceData.status,
        description: invoiceData.description,
        invFile: invoiceData.invFile,
        reqFormFile: invoiceData.reqFormFile,
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
    if (
      ["description", "invFile", "reqFormFile"].includes(event.target.name) &&
      event.target.value === ""
    ) {
      value = undefined;
    } else if (["invFile", "reqFormFile"].includes(event.target.name)) {
      // remove "C:/fakepath/" to obtain file name
      value = event.target.value.slice(12);
      if (event.target.name === "invFile") {
        setInvFile(event.target.files[0]);
      } else {
        setReqFormFile(event.target.files[0]);
      }
    }

    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

  const dateReceivedHandler = (value) => {
    setInputState({
      ...inputState,
      dateReceived: value.toString(),
    });
  };

  const dateReturnedHandler = (value) => {
    setInputState({
      ...inputState,
      dateReturned: value.toString(),
    });
  };

  const resetInputState = () => {
    setInputState({
      name: "",
      invid: "",
      requestor: "",
      origin: "",
      dateReceived: new Date().toString(),
      dateReturned: undefined,
      drvPrgm: "",
      description: undefined,
      invFile: undefined,
      reqFormFile: undefined,
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
      NewInv.dateReturned = new Date().toString();
      setInputState({
        ...inputState,
        status: "Returned",
        dateReturned: new Date().toString(),
      });
    } else {
      NewInv.status = "Active";
      NewInv.dateReturned = undefined;
      setInputState({
        ...inputState,
        status: "Active",
        dateReturned: undefined,
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

    // SAVE FILE ATTACHMENTS
    if (inputState.invFile) {
      const fileData = new FormData();
      fileData.append("file", invFile);

      try {
        await sendRequest(
          "http://" + serverName + "/api/invoice/upload/invFile",
          "POST",
          fileData
        );
      } catch (err) {}
    }

    if (inputState.reqFormFile) {
      const fileData = new FormData();
      fileData.append("file", reqFormFile);

      try {
        await sendRequest(
          "http://" + serverName + "/api/invoice/upload/reqFormFile",
          "POST",
          fileData
        );
      } catch (err) {}
    }

    setSubmitting(false);
    props.getData();
    props.close();
  };

  const openFileHandler = async (fileType) => {
    try {
      await sendRequest(
        `http://${serverName}/api/invoice/${invObjectId}/open/${fileType}`
      );
    } catch (err) {}
  };

  const downloadFileHandler = async (fileType) => {
    var popout = window.open(
      `http://${serverName}/api/invoice/${invObjectId}/download/${fileType}`
    );
    window.setTimeout(function () {
      popout.close();
    }, 1000);
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
                  <Animate show={invExistError}>
                    <Alert sx={{ mb: 2 }} severity="error">
                      Duplicate Invoice ID Detected!
                    </Alert>
                  </Animate>
                  <InvoiceInputs
                    inputState={inputState}
                    dateReceivedHandler={dateReceivedHandler}
                    dateReturnedHandler={dateReturnedHandler}
                    inputHandler={inputHandler}
                    invoices={props.invoices}
                    invDialogState={invDialogState}
                    setInvDialogInputState={setInputState}
                    openFileHandler={openFileHandler}
                    downloadFileHandler={downloadFileHandler}
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
