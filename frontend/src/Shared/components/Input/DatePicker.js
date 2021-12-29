import React from "react";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const DatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={props.label}
        inputFormat="MM/dd/yyyy"
        value={props.value}
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField
            required={props.required}
            fullWidth
            {...params}
            disabled={props.disabled}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
