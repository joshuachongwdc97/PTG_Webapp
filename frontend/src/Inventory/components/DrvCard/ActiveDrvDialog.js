import React from "react";

// COMPONENTS
import Dialog from "../../../Shared/components/Dialog/Dialog";
import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";
import Table from "../../../Shared/components/Table/Table";

const ActiveDrvDialog = (props) => {
  let columns = [
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

  let rows = props.activeDrvs;

  let tableData = {
    columns: columns,
    rows: rows,
  };

  return (
    <Dialog
      open={props.open}
      close={props.close}
      maxWidth="md"
      title="Active Drives"
    >
      <OutlinedCard>
        <Table data={tableData} density="comfortable" components />
      </OutlinedCard>
    </Dialog>
  );
};

export default ActiveDrvDialog;
