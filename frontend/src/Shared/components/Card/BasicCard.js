import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const BasicCard = (props) => {
	return (
		<Card
			sx={{
				minWidth: props.minWidth,
				maxWidth: props.maxWidth,
				height: "100%",
			}}
			raised
			onClick={props.onClick}
		>
			{props.click ? (
				<CardActionArea sx={{ height: "100%" }}>
					<CardContent>{props.children}</CardContent>
				</CardActionArea>
			) : (
				<CardContent>{props.children}</CardContent>
			)}
			{props.actions && <CardActions>{props.actions}</CardActions>}
		</Card>
	);
};

export default BasicCard;
