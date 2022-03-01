import React from "react";

// COMPONENTS
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

// VARIABLES
import { serverName } from "../../../../Shared/variables/Variables";

const SysResetDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const resetSysHandler = async () => {
    props.setResetting(true);
    try {
      await sendRequest(
        "http://" + serverName + "/api/system/test/reset",
        "PATCH",
        JSON.stringify({ macs: [props.mac] }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}

    props.getSystems();
    props.setResetting(false);
    props.close();
  };

  return (
    <AlertDialog
      title={"Reset System"}
      close={props.close}
      open={props.open}
      closeTitle={"Cancel"}
      proceedTitle={"Reset"}
      proceedColor={"error"}
      proceed={resetSysHandler}
    >
      Are you sure you want to reset this system?
    </AlertDialog>
  );
};

export default SysResetDialog;
