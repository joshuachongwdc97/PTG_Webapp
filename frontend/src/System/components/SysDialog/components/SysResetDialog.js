import React from "react";

// COMPONENTS
import AlertDialog from "../../../../Shared/components/Dialog/AlertDialog";

// HOOKS
import { useHttpClient } from "../../../../Shared/hooks/http-hook";

const SysResetDialog = (props) => {
  const { sendRequest } = useHttpClient();

  const resetSysHandler = async () => {
    props.setResetting(true);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/system/test/reset",
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
