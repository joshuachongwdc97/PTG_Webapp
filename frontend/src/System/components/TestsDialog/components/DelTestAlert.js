import React from "react";

// COMPONENTS
import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

// HOOKS
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

const DeleteDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const deleteTestHandler = async () => {
    try {
      // DELETE TEST FROM DATABASE
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/test/" + props.id,
        "DELETE",
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}

    // Close Opened Dialogs
    props.postDel();
  };

  return (
    <AlertDialog
      title={"Are You Sure?"}
      close={props.close}
      open={props.open}
      closeTitle={"Cancel"}
      proceedTitle={"Delete"}
      proceedColor={"error"}
      proceed={deleteTestHandler}
    >
      This operation is not reversible!
    </AlertDialog>
  );
};

export default DeleteDialog;
