import React from "react";
import { Chip, Typography, IconButton, Grid } from "@mui/material";

// COMPONENTS
import Table from "../../Shared/components/Table/Table";

// FUNCTIONS
import { capFirstLetter } from "../../Shared/functions/CapFirstLetter";

// ICONS
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UsersTable = (props) => {
  let columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      renderCell: (params) => {
        return (
          <Grid container alignItems="center" columnSpacing={1.5}>
            <Grid item>
              <AccountCircleRoundedIcon size="large" sx={{ display: "flex" }} />
            </Grid>
            <Grid item>
              <Typography sx={{ textTransform: "capitalize" }}>
                {params.row.name}
              </Typography>
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.75,
    },
    {
      field: "createdDate",
      headerName: "Reg. Date",
      flex: 0.75,
    },
    {
      field: "approved",
      headerName: "Status",
      flex: 0.75,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.approved ? "Approved" : "Pending"}
            color={params.row.approved ? "success" : "error"}
            variant="filled"
            sx={{ width: "70%", borderRadius: 2.5 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.75,
      renderCell: (params) => {
        return (
          <Grid container columnSpacing={2} justifyContent="center">
            <Grid item>
              <IconButton
                onClick={() => {
                  props.setUserDialogState("modify");
                  props.showUserDetHandler();
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  props.setShowDelDialog(true);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  let rows = [];
  props.users.length > 0 &&
    (rows = props.users.map((user) => {
      const name = user.email.replace("@wdc.com", "").split(".").join(" ");

      return {
        id: user.id,
        name: name,
        email: user.email,
        role: capFirstLetter(user.role),
        createdDate: user.createdDate.replace(",", "").split(" ")[0],
        approved: user.approved,
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
            field: "createdDate",
            sort: "desc",
          },
        ]}
        density="comfortable"
        components
      />
    </div>
  );
};

export default UsersTable;
