import React, { useEffect, useState } from "react";

import { TextField, InputAdornment } from "@mui/material";

const TextFieldWIcon = (props) => {
	const [error, setError] = useState(false);
	const [enableError, setEnableError] = useState(false);

	useEffect(() => {
		if (props.value) {
			if (props.value.length > 0) {
				setEnableError(true);
			}
		}

		if (props.required && props.value === "" && enableError) {
			setError(true);
		} else {
			setError(false);
		}

		if (props.unique && props.uniqueArr.includes(props.value) && !error) {
			setError(true);
		}
		// eslint-disable-next-line
	}, [props.value, props.required, enableError, props.unique]);

	return (
		<TextField
			required={props.required}
			label={props.label}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">{props.icon}</InputAdornment>
				),
			}}
			fullWidth
			onChange={props.onChange}
			value={props.value}
			name={props.name}
			helperText={props.helperText}
			error={error}
			disabled={props.disabled}
			autoComplete={props.autoComplete}
		/>
	);
};

export default TextFieldWIcon;
