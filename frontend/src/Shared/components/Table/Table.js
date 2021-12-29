import React, { useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";

const Table = (props) => {
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState(props.sortModel);

  const pageSizeChangeHandler = (e) => {
    setPageSize(e);
  };

  return (
    <div style={{ width: "100%" }}>
      {props.data && (
        <DataGrid
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 100]}
          onPageSizeChange={pageSizeChangeHandler}
          checkboxSelection={props.checkbox}
          selectionModel={props.selection}
          onSelectionModelChange={props.selectedHandler}
          onCellClick={props.onCellClick}
          onCellDoubleClick={props.onCellDoubleClick}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          density={props.density}
          // disableExtendRowFullWidth
          autoHeight
          {...props.data}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      )}
    </div>
  );
};

export default Table;
