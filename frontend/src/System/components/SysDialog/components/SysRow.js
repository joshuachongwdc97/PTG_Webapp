import React from "react";

import { Grid, Typography, LinearProgress } from "@mui/material";

// COMPONENTS
import BasicCard from "../../../../Shared/components/Card/BasicCard";

// FUNCTIONS
import sysStatus from "../../../../Shared/functions/SysStatus";

const SysRow = (props) => {
	const systems = props.sysInRow.map((sys) => {
		let sysMargin = 2.4;
		if (props.sysInRow.length > 5) {
			sysMargin = 2;
		}

		const SysStatus = sysStatus(sys);

		return (
			<Grid item key={sys.id} xs={sysMargin} align="center">
				<BasicCard click>
					<Grid container spacing={1.5}>
						<Grid item xs={12} align="center">
							<Typography variant="subtitle2">{sys.rackLoc}</Typography>
						</Grid>
						<Grid item xs={12}>
							<LinearProgress
								color="success"
								variant="determinate"
								value={SysStatus === "online" ? 100 : 0}
								sx={{ maxWidth: "30px", width: "80%", borderRadius: 5 }}
							/>
						</Grid>
					</Grid>
				</BasicCard>
			</Grid>
		);
	});

	return (
		<Grid container spacing={2}>
			{systems}
		</Grid>
	);
};

export default SysRow;
