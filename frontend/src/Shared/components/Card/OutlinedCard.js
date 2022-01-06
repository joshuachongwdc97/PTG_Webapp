import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const OutlinedCard = (props) => {
  return (
    <Card
      // variant="outlined"
      sx={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        height: "100%",
      }}
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

export default OutlinedCard;
