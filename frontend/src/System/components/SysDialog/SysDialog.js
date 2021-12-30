import React from "react";

// COMPONENTS
import { Grid } from "@mui/material";
import BasicDialog from "../../../Shared/components/Dialog/Dialog";
import SysRackCard from "./components/SysRackCard";

const SysDialog = (props) => {
	//   console.log(props.systems);

	// GET RACK NUMBER ARRAYS
	let rackNoArr = props.systems.map((sys) => {
		return sys.rackNo;
	});

	rackNoArr = [...new Set(rackNoArr)];

	const RackCards = rackNoArr.map((rackNo) => {
		const sysInRack = props.systems.filter((sys) => {
			return sys.rackNo === rackNo;
		});

		return (
			<Grid item xs={4} key={rackNo}>
				<SysRackCard rackNo={rackNo} sysInRack={sysInRack} key={rackNo} />
			</Grid>
		);
	});

	return (
		<BasicDialog
			close={props.close}
			open={props.open}
			title="System Control Panel"
			fullScreen
		>
			<Grid container spacing={2}>
				{RackCards}
			</Grid>
		</BasicDialog>
	);
};

export default SysDialog;
