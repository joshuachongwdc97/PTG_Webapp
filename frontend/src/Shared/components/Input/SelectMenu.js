import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// ICONS
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const SelectMenu = (props) => {
  let MenuItems = [];
  props.data &&
    props.data.length > 0 &&
    (MenuItems = props.data.map((data) => {
      return (
        <MenuItem value={data.value} key={data.value}>
          {data.label}
        </MenuItem>
      );
    }));

  props.addOption &&
    MenuItems.push(
      <MenuItem value={""} onClick={props.addOptionHandler} key={""}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={props.addOptionText} />
      </MenuItem>
    );

  return (
    <FormControl fullWidth size={props.size}>
      <InputLabel id="label" required={props.required}>
        {props.label}
      </InputLabel>
      <Select
        labelId="label"
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
      >
        {MenuItems}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
