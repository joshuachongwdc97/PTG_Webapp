import React, { useState, useCallback } from "react";
import { Grid, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

// COMPONENTS
import OutlinedCard from "../../../../../../Shared/components/Card/OutlinedCard";
import Table from "../../../../../../Shared/components/Table/Table";
import getInvBySn from "../../../../../../Shared/functions/getInvBySn";
import LocateDialog from "./LocateDialog";

// ICONS
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";

const GlobalDriveSearchResults = (props) => {
  const [showLocateDialog, setShowLocateDialog] = useState(false);
  const [serialNumber, setSerialNumber] = useState();

  const locateDrive = useCallback(
    (sn) => () => {
      setSerialNumber(sn);
      setShowLocateDialog(true);
    },
    []
  );

  let columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "invid",
      headerName: "Invoice ID",
      flex: 2,
    },
    {
      field: "sn",
      headerName: "SN",
      flex: 1,
    },
    {
      field: "label",
      headerName: "Label",
      flex: 2.5,
    },
    {
      field: "drvType",
      headerName: "Drv Type",
      flex: 0.5,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 0.5,
    },
    {
      field: "interface",
      headerName: "Interface",
      flex: 0.5,
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.05,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Locate Drive">
              <GpsFixedRoundedIcon />
            </Tooltip>
          }
          label="Locate"
          onClick={locateDrive(params.row.sn)}
        />,
      ],
    },
  ];

  let rows = [];
  props.invoices.length > 0 &&
    props.inputState &&
    (rows = getInvBySn(props.inputState, props.drives, props.invoices));

  let tableData = {
    columns: columns,
    rows: rows,
  };

  return (
    <React.Fragment>
      {showLocateDialog && (
        <LocateDialog
          open={showLocateDialog}
          close={() => {
            setShowLocateDialog(false);
          }}
          sn={serialNumber}
        />
      )}
      <Grid item xs={12} textAlign="center">
        <OutlinedCard>
          <Table
            data={tableData}
            selectedHandler={props.selectedHandler}
            selection={props.selection}
            sortModel={[
              {
                field: "sn",
                sort: "asc",
              },
            ]}
            density="comfortable"
            onCellClick={props.showInvDetHandler}
            onCellDoubleClick={props.showInvDetHandler}
          />
        </OutlinedCard>
      </Grid>
    </React.Fragment>
  );
};

export default GlobalDriveSearchResults;
