import React, { useEffect, useState } from "react";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import { blue } from "@mui/material/colors";

// COMPONENTS
import BasicCountCard from "../../../Shared/components/Card/BasicCountCard";

// FUNCTIONS
import SysStatus from "../../../Shared/functions/SysStatus";

const SysCard = (props) => {
	const [availSys, setAvailSys] = useState([]);

	useEffect(() => {
		setAvailSys(
			props.sys.filter((sys) => {
				const status = SysStatus(sys);
				return status === "online";
			})
		);
	}, [setAvailSys, props.sys]);

	return (
		<BasicCountCard
			title="Available Systems"
			data={availSys.length}
			icon={<SdStorageIcon />}
			color={blue[400]}
			onClick={props.onClick}
		/>
	);
};

export default SysCard;
