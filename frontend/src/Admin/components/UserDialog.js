import React, { useState, useEffect, useContext } from "react";
import { Alert } from "@mui/material";

// COMPONENTS
import Dialog from "../../Shared/components/Dialog/Dialog";
import UserInputs from "./UserInputs";
import UserDialogActions from "./UserDialogActions";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import Animate from "../../Shared/transitions/Animate";
import { AuthContext } from "../../Shared/context/auth-context";

const UserDialog = (props) => {
  const auth = useContext(AuthContext);
  const dialogTitle = {
    modify: "Edit User",
    new: "Add User",
  };
  const { sendRequest } = useHttpClient();
  const [inputState, setInputState] = useState({
    email: "",
    role: "",
    approved: "",
  });
  const [unmodifiedState, setUnmodifiedState] = useState();
  const [unmodifiedStateReady, setUnmodifiedStateReady] = useState(false);
  const [modifiable, setModifiable] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [inputReady, setInputReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // CHECK IF DIALOG WAS SPAWNED WITH USER EDIT CLICK
  useEffect(() => {
    if (props.userDialogState === "modify" && props.selection.length > 0) {
      // Get User Data
      const userData = props.users.filter((user) => {
        return user.id === props.selection[0];
      })[0];

      const userInputState = {
        ...inputState,
        email: userData.email,
        role: userData.role,
        approved: userData.approved,
      };

      setInputState(userInputState);
      setUnmodifiedState(userInputState);
      setUnmodifiedStateReady(true);
    }
    // eslint-disable-next-line
  }, [props.selection, props.userDialogState]);

  // CHECK IF DATA MODIIFIED IN MODIFY STATE
  useEffect(() => {
    if (props.userDialogState === "modify" && unmodifiedStateReady) {
      if (
        inputState.email !== unmodifiedState.email ||
        inputState.role !== unmodifiedState.role ||
        inputState.approved !== unmodifiedState.approved
      ) {
        setModifiable(true);
      } else {
        setModifiable(false);
      }
    }
  }, [
    inputState,
    props.userDialogState,
    unmodifiedState,
    modifiable,
    unmodifiedStateReady,
  ]);

  // INPUT VALIDATION (CHECK IF ALL FIELDS CORRECT)
  useEffect(() => {
    if (props.userDialogState === "new") {
      let userEmailArr = props.users.map((user) => {
        return user.email;
      });

      if (!inputState.email || !inputState.role || inputState.approved === "") {
        setInputReady(false);
        if (!props.selection.length) {
          setUserExistError(userEmailArr.includes(inputState.email));
        }
      } else {
        setInputReady(!userEmailArr.includes(inputState.email));
        if (!props.selection.length) {
          setUserExistError(userEmailArr.includes(inputState.email));
        }
      }
    }
  }, [inputState, props.users, props.userDialogState, props.selection]);

  // RESET INPUT STATE WHEN DIALOG CLOSED
  useEffect(() => {
    if (!props.open) {
      resetInputState();
    }
  }, [props.open]);

  const resetInputState = () => {
    setInputState({
      email: "",
      role: "",
      approved: "",
    });
  };

  // INPUT HANDLER
  const inputHandler = (event) => {
    let value = event.target.value;

    setInputState({
      ...inputState,
      [event.target.name]: value,
    });
  };

  const submitHandler = async () => {
    setSubmitting(true);

    if (props.userDialogState === "new") {
      // CREATE NEW USER
      const newUser = { ...inputState };

      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/user/add",
          "POST",
          JSON.stringify(newUser),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {}
    } else {
      // MODIFY USER
      const newUser = { ...inputState };

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${props.selection[0]}`,
          "PATCH",
          JSON.stringify(newUser),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {}
    }
    setSubmitting(false);
    props.close();
  };

  const DialogActions = (
    <UserDialogActions
      close={props.close}
      submitting={submitting}
      submitHandler={submitHandler}
      resetInputState={resetInputState}
      userDialogState={props.userDialogState}
      modifiable={modifiable}
      inputReady={inputReady}
    />
  );

  return (
    <Dialog
      open={props.open}
      close={props.close}
      title={dialogTitle[props.userDialogState]}
      actions={DialogActions}
    >
      <Animate show={userExistError}>
        <Alert sx={{ mb: 2 }} severity="error">
          Duplicate User Email Detected!
        </Alert>
      </Animate>
      <UserInputs inputState={inputState} inputHandler={inputHandler} />
    </Dialog>
  );
};

export default UserDialog;
