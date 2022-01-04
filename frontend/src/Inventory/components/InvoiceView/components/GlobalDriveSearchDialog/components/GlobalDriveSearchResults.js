import React from "react";
import { Grid } from "@mui/material";

// COMPONENTS
import OutlinedCard from "../../../../../../Shared/components/Card/OutlinedCard";
import Table from "../../../../../../Shared/components/Table/Table";
import getInvBySn from "../../../../../../Shared/functions/getInvBySn";

const GlobalDriveSearchResults = (props) => {
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
      flex: 1,
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
  console.log(tableData);
  return (
    <React.Fragment>
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
