import React, { useState, useCallback } from "react";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

// COMPONENTS
import Table from "../../../../../../Shared/components/Table/Table";
import LocateDialog from "./LocateDialog";

// FUNCTIONS
import getInvBySn from "../../../../../../Shared/functions/getInvBySn";

// ICONS
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
      flex: 1.3,
    },
    {
      field: "sn",
      headerName: "SN",
      flex: 0.5,
    },
    {
      field: "label",
      headerName: "Label",
      flex: 1.3,
    },
    {
      field: "drvType",
      headerName: "Type",
      flex: 0.3,
    },
    {
      field: "capacity",
      headerName: "TB",
      flex: 0.1,
    },
    {
      field: "interface",
      headerName: "Interface",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Locate",
      type: "actions",
      flex: 0.3,
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
    </React.Fragment>
  );
};

export default GlobalDriveSearchResults;
