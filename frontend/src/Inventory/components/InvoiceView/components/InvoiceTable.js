import React from "react";
import Chip from "@mui/material/Chip";

import Table from "../../../../Shared/components/Table/Table";

// IMPORT FUNCTIONS
import getDrvPrgm from "../../../../Shared/functions/getDrvPrgm";
import getDrv from "../../../../Shared/functions/getDrv";
import getDays from "../../../../Shared/functions/getDays";

const InvoiceTable = (props) => {
  const stateColors = {
    Active: "success",
    Returned: "default",
    "P.Returned": "default",
    Keep: "primary",
  };

  let columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "invid",
      headerName: "ID",
      flex: 2,
    },
    {
      field: "name",
      headerName: "Label",
      flex: 2.5,
    },
    {
      field: "drvPrgm",
      headerName: "Program",
      flex: 1,
    },
    {
      field: "drives",
      headerName: "Drives",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const color = stateColors[params.row.status];

        return (
          <Chip
            label={params.row.status}
            color={color}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled={
              ["Returned", "P.Returned"].includes(params.row.status)
                ? true
                : false
            }
          />
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
    },
    {
      field: "dateReceived",
      headerName: "Date Received",
      flex: 1,
    },
    {
      field: "origin",
      headerName: "Origin",
      flex: 1.5,
    },
    {
      field: "requestor",
      headerName: "Requestor",
      flex: 1.5,
    },
  ];

  let rows = [];
  props.invoices.length > 0 &&
    (rows = props.invoices.map((inv) => {
      const drvPrgm = getDrvPrgm(inv.drvPrgm, props.drvPrgms);

      const drvs = getDrv(inv.id, props.drives);
      const age = getDays(inv.dateReceived);

      let status = inv.status;
      const keptDrives = drvs.filter((drv) => drv.status === "Keep");

      if (status === "Returned") {
        if (drvs.length > 0 && keptDrives.length === drvs.length) {
          status = "Keep";
        } else if (keptDrives.length > 0) {
          status = "P.Returned";
        }
      }

      return {
        id: inv.id,
        invid: inv.invid,
        name: inv.name,
        drvPrgm: drvPrgm,
        status: status,
        drives: drvs.length,
        age: age,
        origin: inv.origin,
        requestor: inv.requestor,
        dateReceived: new Date(inv.dateReceived).toISOString().split("T")[0],
      };
    }));

  let tableData = {
    columns: columns,
    rows: rows,
  };

  return (
    <div>
      <Table
        data={tableData}
        selectedHandler={props.selectedHandler}
        selection={props.selection}
        sortModel={[
          {
            field: "age",
            sort: "asc",
          },
        ]}
        density="comfortable"
        onCellClick={props.showInvDetHandler}
        onCellDoubleClick={props.showInvDetHandler}
        components
      />
    </div>
  );
};

export default InvoiceTable;
