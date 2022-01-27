import React, { useEffect, useState } from "react";

import { Grid, Divider, Button, Chip } from "@mui/material";
import Table from "../../../../../../Shared/components/Table/Table";

// COMPONENTS
import CSVUpload from "../../../../../../Shared/components/Input/CSVUpload";
import Animate from "../../../../../../Shared/transitions/Animate";

// ICONS
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

const DriveUpload = (props) => {
  const [rowSelected, setRowSelected] = useState(true);
  const [rows, setRows] = useState([]);
  const stateColors = {
    Active: "success",
    Returned: "default",
    Keep: "primary",
  };

  // ENABLE DELETE BUTTON IF DRIVES SELECTED
  useEffect(() => {
    if (props.selection.length > 0) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  }, [rowSelected, props.selection]);

  let columns = [
    {
      field: "sn",
      headerName: "SN",
      flex: 1,
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
            disabled={params.row.status === "Returned" ? true : false}
          />
        );
      },
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

  // let rows = props.drives;
  useEffect(() => {
    setRows(
      props.drives.map((drv) => {
        if (drv.status) {
          return drv;
        } else if (props.invStatus === "Active") {
          return { ...drv, status: "Active" };
        } else {
          return { ...drv, status: "Returned" };
        }
      })
    );
  }, [props.drives, props.invStatus]);

  let tableData = {
    columns: columns,
    rows: rows,
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {props.invDialogState === "modify" && (
          <React.Fragment>
            <Grid item xs={6}>
              <Animate show>
                <CSVUpload
                  title="Upload via CSV"
                  icon={<PlaylistAddCircleRoundedIcon />}
                  uploadedDataHandler={props.driveUploadHandler}
                />
              </Animate>
            </Grid>
            <Grid item xs={6}>
              <Animate show>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  disabled={!rowSelected}
                  onClick={props.delDrvHandler}
                  size="large"
                >
                  Delete Selected
                </Button>
              </Animate>
            </Grid>
            <Grid item xs={12}>
              <Animate show>
                <Divider>Drive Added</Divider>
              </Animate>
            </Grid>
            <Grid item xs={12}>
              <Animate show>
                <Table
                  data={tableData}
                  checkbox
                  selectedHandler={props.selectedHandler}
                  selection={props.selection}
                  components
                />
              </Animate>
            </Grid>
          </React.Fragment>
        )}
        {props.invDialogState === "view" && props.invStatus === "Returned" && (
          <React.Fragment>
            <Grid item xs={6}>
              <Animate show>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={!rowSelected}
                  onClick={props.keepDrvHandler}
                  size="large"
                  startIcon={<ArchiveRoundedIcon />}
                >
                  Keep Selected
                </Button>
              </Animate>
            </Grid>
            <Grid item xs={6}>
              <Animate show>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  disabled={!rowSelected}
                  onClick={props.unkeepDrvHandler}
                  size="large"
                  startIcon={<InventoryRoundedIcon />}
                >
                  Return Selected
                </Button>
              </Animate>
            </Grid>
            <Grid item xs={12}>
              <Animate show>
                <Divider>Drive Added</Divider>
              </Animate>
            </Grid>
            <Grid item xs={12}>
              <Animate show>
                <Table
                  data={tableData}
                  checkbox
                  selectedHandler={props.selectedHandler}
                  selection={props.selection}
                  components
                />
              </Animate>
            </Grid>
          </React.Fragment>
        )}
        {props.invDialogState === "view" && props.invStatus === "Active" && (
          <Grid item xs={12}>
            <Animate show>
              <Table
                data={tableData}
                selectedHandler={props.selectedHandler}
                selection={props.selection}
                components
              />
            </Animate>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default DriveUpload;
