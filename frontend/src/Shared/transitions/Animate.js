import React from "react";
import { Fade, Paper } from "@mui/material";

const Animate = (props) => {
	return (
		<Fade
			in={props.show}
			timeout={700} // transition period
			style={{
				transitionDelay: props.delay,
			}}
			mountOnEnter
			unmountOnExit
		>
			<Paper sx={{ height: "100%" }}>{props.children}</Paper>
		</Fade>
	);
};

export default Animate;
