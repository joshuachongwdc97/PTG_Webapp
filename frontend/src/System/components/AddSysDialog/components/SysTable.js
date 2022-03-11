import React, { useState, useEffect } from "react";

// COMPONENTS
import Table from "../../../../Shared/components/Table/Table";

const SysTable = (props) => {
  const [rows, setRows] = useState([]);

  let columns = [
    {
      field: "sysId",
      headerName: "System ID",
      flex: 0.5,
    },
    {
      field: "chipset",
      headerName: "Chipset",
      flex: 0.8,
    },
    {
      field: "hba",
      headerName: "HBA",
      flex: 0.5,
    },
    {
      field: "rackNo",
      headerName: "Rack No.",
      flex: 0.3,
    },
    {
      field: "rackLoc",
      headerName: "Rack Loc",
      flex: 0.3,
    },
    {
      field: "mac",
      headerName: "MAC Address",
      flex: 1,
    },
  ];

  // let rows = props.drives;
  useEffect(() => {
    const uploadedSys = props.data.map((data) => {
      return {
        ...data,
        id: data.sysId,
      };
    });

    setRows(uploadedSys);
  }, [props.data]);

  let tableData = {
    columns: columns,
    rows: rows,
  };

  return <Table data={tableData} />;
};

export default SysTable;
