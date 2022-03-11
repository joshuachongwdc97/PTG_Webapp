import * as React from "react";
import {
  CardActionArea,
  Divider,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

const BasicCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        height: "100%",
        borderRadius: 3,
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
