import React from "react";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";

const processData = (dataString) => {
	const dataStringLines = dataString.split(/\r\n|\n/);
	const headers = dataStringLines[0].split(
		/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
	);

	const list = [];
	for (let i = 1; i < dataStringLines.length; i++) {
		const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
		if (headers && row.length === headers.length) {
			const obj = {};
			for (let j = 0; j < headers.length; j++) {
				let d = row[j];
				if (d.length > 0) {
					if (d[0] === '"') d = d.substring(1, d.length - 1);
					if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
				}
				if (headers[j]) {
					obj[headers[j]] = d;
				}
			}

			// remove the blank rows
			if (Object.values(obj).filter((x) => x).length > 0) {
				list.push(obj);
			}
		}
	}

	return list;
};

const Input = styled("input")({
	display: "none",
});

const CSVUpload = (props) => {
	const fileUploadHandler = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (evt) => {
			/* Parse data */
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			let data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

			props.uploadedDataHandler(processData(data));
		};
		reader.readAsBinaryString(file);
	};

	return (
		<label htmlFor="contained-button-file">
			<Input
				value=""
				accept=".csv"
				id="contained-button-file"
				type="file"
				onChange={fileUploadHandler}
			/>
			<Button
				variant="outlined"
				color={props.color}
				fullWidth
				startIcon={props.icon}
				component="span"
				size="large"
			>
				{props.title}
			</Button>
		</label>
	);
};

export default CSVUpload;
