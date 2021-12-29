import React, { useState, useEffect } from "react";

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
      flex: 1,
    },
    {
      field: "hba",
      headerName: "HBA",
      flex: 0.5,
    },
    {
      field: "rackNo",
      headerName: "Rack No.",
      flex: 0.5,
    },
    {
      field: "rackLoc",
      headerName: "Rack Location",
      flex: 0.5,
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
