import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Divider } from "@mui/material";
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
      {props.actions && (
        <React.Fragment>
          <Divider />
          <CardActions>{props.actions}</CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

export default BasicCard;
