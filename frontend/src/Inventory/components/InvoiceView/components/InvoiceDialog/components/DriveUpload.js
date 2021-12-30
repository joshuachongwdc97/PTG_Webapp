import React, { useEffect, useState } from "react";

import { Grid, Divider, Button } from "@mui/material";
import Table from "../../../../../../Shared/components/Table/Table";

// COMPONENTS
import CSVUpload from "../../../../../../Shared/components/Input/CSVUpload";

// ICONS
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";

const DriveUpload = (props) => {
	const [delDisable, setDelDisable] = useState(true);
	const [rows, setRows] = useState([]);

	// ENABLE DELETE BUTTON IF DRIVES SELECTED
	useEffect(() => {
		if (props.selection.length > 0) {
			setDelDisable(false);
		} else {
			setDelDisable(true);
		}
	}, [delDisable, props.selection]);

	let columns = [
		{
			field: "sn",
			headerName: "SN",
			flex: 1,
		},
		{
			field: "label",
			headerName: "Label",
			flex: 2.5,
		},
		{
			field: "drvType",
			headerName: "Drv Type",
			flex: 0.5,
		},
		{
			field: "capacity",
			headerName: "Capacity",
			flex: 0.5,
		},
		{
			field: "interface",
			headerName: "Interface",
			flex: 1,
		},
	];

	// let rows = props.drives;
	useEffect(() => {
		setRows(props.drives);
	}, [props.drives]);

	let tableData = {
		columns: columns,
		rows: rows,
	};

	return (
		<React.Fragment>
			<Grid container spacing={2}>
				{props.invDialogState !== "view" && (
					<React.Fragment>
						<Grid item xs={6}>
							<CSVUpload
								title="Upload via CSV"
								icon={<PlaylistAddCircleRoundedIcon />}
								uploadedDataHandler={props.driveUploadHandler}
							/>
						</Grid>
						<Grid item xs={6}>
							<Button
								fullWidth
								variant="outlined"
								color="error"
								disabled={delDisable}
								onClick={props.delDrvHandler}
								size="large"
							>
								Delete Selected
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Divider>Drive Added</Divider>
						</Grid>
					</React.Fragment>
				)}
				<Grid item xs={12}>
					<Table
						data={tableData}
						checkbox
						selectedHandler={props.selectedHandler}
						selection={props.selection}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default DriveUpload;
