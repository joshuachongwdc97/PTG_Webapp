import React, { useState } from "react";
import { Grid } from "@mui/material";

// COMPONENTS
import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceActions from "./components/InvoiceActions";
import InvoiceDialog from "./components/InvoiceDialog/InvoiceDialog";
import GlobalDriveSearchDialog from "./components/GlobalDriveSearchDialog/GlobalDriveSearchDialog";

const InvoiceView = (props) => {
  const [selection, setSelection] = useState([]);
  const [showInvDialog, setShowInvDialog] = useState(false);
  const [showGlobalDriveSearchDialog, setShowGlobalDriveSearchDialog] =
    useState(false);

  const selectionHandler = (e) => {
    setSelection(e);
  };

  return (
    <React.Fragment>
      <InvoiceDialog
        open={showInvDialog}
        close={() => {
          setShowInvDialog(false);
          setSelection([]);
          props.getData();
        }}
        getData={props.getData}
        invoices={props.invoices}
        drives={props.drives}
        selection={selection}
      />

      <GlobalDriveSearchDialog
        open={showGlobalDriveSearchDialog}
        close={() => {
          setShowGlobalDriveSearchDialog(false);
        }}
        invoices={props.invoices}
        drives={props.drives}
        drvPrgms={props.drvPrgms}
        selectedHandler={selectionHandler}
        selection={selection}
        showInvDetHandler={() => {
          setShowInvDialog(true);
        }}
      />

      <OutlinedCard>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InvoiceActions
                  showInvDetHandler={() => {
                    setSelection([]);
                    setShowInvDialog(true);
                  }}
                  showGlobalDriveSearchHandler={() => {
                    setShowGlobalDriveSearchDialog(true);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InvoiceTable
                  invoices={props.invoices}
                  drives={props.drives}
                  drvPrgms={props.drvPrgms}
                  selectedHandler={selectionHandler}
                  selection={selection}
                  showInvDetHandler={() => {
                    setShowInvDialog(true);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </OutlinedCard>
    </React.Fragment>
  );
};

export default InvoiceView;
