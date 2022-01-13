import React from "react";

import BasicDialog from "../../../Shared/components/Dialog/Dialog";

const TestsDialog = (props) => {
  return (
    <BasicDialog open={props.open} close={props.close}>
      Tests
    </BasicDialog>
  );
};

export default TestsDialog;
