import React from "react";

// COMPONENTS
import InvoiceTable from "../InvoiceView/components/InvoiceTable";
import Dialog from "../../../Shared/components/Dialog/Dialog";
import OutlinedCard from "../../../Shared/components/Card/OutlinedCard";

const ActiveInvDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      close={props.close}
      maxWidth="lg"
      title="Active Invoices"
    >
      <OutlinedCard>
        <InvoiceTable
          invoices={props.activeInvs}
          drives={props.drives}
          drvPrgms={props.drvPrgms}
        />
      </OutlinedCard>
    </Dialog>
  );
};

export default ActiveInvDialog;
