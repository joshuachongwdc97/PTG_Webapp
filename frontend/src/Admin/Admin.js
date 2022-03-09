import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";

// COMPONENTS
import { useHttpClient } from "../Shared/hooks/http-hook";
import UsersTable from "./components/UsersTable";
import UserDialog from "./components/UserDialog";
import AlertDialog from "../Shared/components/Dialog/AlertDialog";
import OutlinedCard from "../Shared/components/Card/OutlinedCard";
import Animate from "../Shared/transitions/Animate";

// VARIABLES
import { serverName } from "../Shared/variables/Variables";

// ICONS
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

const Admin = () => {
  const { sendRequest } = useHttpClient();
  const [users, setUsers] = useState();
  const [selection, setSelection] = useState([]);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [userDialogState, setUserDialogState] = useState();

  const selectionHandler = (e) => {
    setSelection(e);
  };

  const getUsers = async () => {
    try {
      const responseData = await sendRequest(
        "http://" + serverName + "/api/user/"
      );

      setUsers(responseData.users);
      setDataReady(true);
    } catch (err) {}
  };

  const delUserHandler = async () => {
    try {
      await sendRequest(
        "http://" + serverName + "/api/user/" + selection[0],
        "DELETE"
      );

      getUsers();
      setShowDelDialog(false);
    } catch (err) {}
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {showDelDialog && (
        <AlertDialog
          open={showDelDialog}
          close={() => {
            setShowDelDialog(false);
          }}
          proceedTitle="Delete"
          proceedColor="error"
          closeTitle="Cancel"
          closeColor="primary"
          title="Deleting User"
          proceed={delUserHandler}
        >
          Are you sure?
        </AlertDialog>
      )}

      {dataReady && (
        <UserDialog
          open={showUserDialog}
          close={() => {
            setShowUserDialog(false);
            setUserDialogState();
            setSelection([]);
            getUsers();
          }}
          users={users}
          selection={selection}
          userDialogState={userDialogState}
        />
      )}

      {dataReady && (
        <Grid container>
          <Grid item xs={12}>
            <Animate show>
              <OutlinedCard>
                <Grid container rowSpacing={2}>
                  <Grid item xs={6} alignSelf="center">
                    <Typography variant="h6" color="textSecondary">
                      User Management
                    </Typography>
                  </Grid>
                  <Grid item xs={6} align="end">
                    <Button
                      variant="outlined"
                      size="large"
                      color="success"
                      startIcon={<PersonAddAltRoundedIcon />}
                      onClick={() => {
                        setUserDialogState("new");
                        setShowUserDialog(true);
                      }}
                    >
                      New User
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <UsersTable
                      users={users}
                      selectedHandler={selectionHandler}
                      selection={selection}
                      setShowDelDialog={setShowDelDialog}
                      setUserDialogState={setUserDialogState}
                      showUserDetHandler={() => {
                        setShowUserDialog(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </OutlinedCard>
            </Animate>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Admin;
