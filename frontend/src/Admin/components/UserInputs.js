import React from "react";
import { Grid } from "@mui/material";

// COMPONENTS
import TextFieldWIcon from "../../Shared/components/Input/TextFieldWIcon";
import SelectMenu from "../../Shared/components/Input/SelectMenu";

const UserInputs = (props) => {
  const roleSelect = [
    { value: "basic", label: "Basic" },
    { value: "admin", label: "Admin" },
  ];
  const approvedSelect = [
    { value: true, label: "Approved" },
    { value: false, label: "Pending" },
  ];

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextFieldWIcon
          required
          label="Email"
          name="email"
          onChange={props.inputHandler}
          value={props.inputState.email}
        />
      </Grid>

      <Grid item xs={6}>
        <SelectMenu
          required
          label="Role"
          name="role"
          data={roleSelect}
          onChange={props.inputHandler}
          value={props.inputState.role}
        />
      </Grid>

      <Grid item xs={6}>
        <SelectMenu
          required
          label="Status"
          name="approved"
          data={approvedSelect}
          onChange={props.inputHandler}
          value={props.inputState.approved}
        />
      </Grid>
    </Grid>
  );
};

export default UserInputs;
