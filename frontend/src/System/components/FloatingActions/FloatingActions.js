import React from "react";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

// ICONS
import AddToQueueRoundedIcon from "@mui/icons-material/AddToQueueRounded";

const FloatingActions = (props) => {
	return (
		<SpeedDial
			ariaLabel="SpeedDial"
			sx={{ position: "absolute", bottom: 25, right: 25 }}
			icon={<SpeedDialIcon />}
		>
			<SpeedDialAction
				icon={<AddToQueueRoundedIcon />}
				tooltipTitle="Add System(s)"
				onClick={props.showAddSysHandler}
			/>
		</SpeedDial>
	);
};

export default FloatingActions;
