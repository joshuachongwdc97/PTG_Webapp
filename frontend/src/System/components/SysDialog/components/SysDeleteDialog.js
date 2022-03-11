import React from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

const SysDeleteDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const deleteSysHandler = async () => {
    try {
      // DELETE SYSTEM FROM DATABASE
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/system",
        "DELETE",
        JSON.stringify({ ids: [props.id] }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    // Close Opened Dialogs
    props.postDel();
  };

  return (
    <AlertDialog
      title={"Delete System"}
      close={props.close}
      open={props.open}
      closeTitle={"Cancel"}
      proceedTitle={"Delete"}
      proceedColor={"error"}
      proceed={deleteSysHandler}
    >
      Are you sure you want to delete this system?
    </AlertDialog>
  );
};

export default SysDeleteDialog;
