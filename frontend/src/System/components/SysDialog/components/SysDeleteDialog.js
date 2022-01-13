import React from "react";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

// VARIABLES
import { serverName } from "../../../../Shared/variables/Variables";

const SysDeleteDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const deleteSysHandler = async () => {
    try {
      // DELETE SYSTEM FROM DATABASE
      await sendRequest(
        "http://" + serverName + "/api/system",
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
      title={"Delete Invoice"}
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
