import React from "react";
import { useHttpClient } from "../../../../../../Shared/hooks/http-hook";

import AlertDialog from "../../../../../../Shared/components/Dialog/AlertDialog";

// VARIABLES
import { serverName } from "../../../../../../Shared/variables/Variables";

const DeleteDialog = (props) => {
  const { sendRequest } = useHttpClient();
  const deleteInvHandler = async () => {
    const drvToDel = props.drives.map((drv) => {
      return drv.id;
    });

    try {
      // DELETE DRIVES FROM DATABASE
      await sendRequest(
        "http://" + serverName + "/api/DRIVE",
        "DELETE",
        JSON.stringify({ ids: drvToDel }),
        { "Content-Type": "application/json" }
      );

      // DELETE INVOICE
      await sendRequest(
        `http://${serverName}/api/invoice/${props.id}`,
        "DELETE"
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
      proceed={deleteInvHandler}
    >
      Are you sure you want to delete this invoice and drives?
    </AlertDialog>
  );
};

export default DeleteDialog;
