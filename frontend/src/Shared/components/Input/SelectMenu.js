import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectMenu = (props) => {
	let MenuItems;
	props.data &&
		props.data.length > 0 &&
		(MenuItems = props.data.map((data) => {
			return (
				<MenuItem value={data.value} key={data.value}>
					{data.label}
				</MenuItem>
			);
		}));

	return (
		<FormControl fullWidth>
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
