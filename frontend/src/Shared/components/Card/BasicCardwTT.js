import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const BasicCardwTT = (props) => {
  return (
    <Tooltip title={props.ttTitle} placement={props.ttPlacement}>
      <Card
        sx={{
          minWidth: props.minWidth,
          maxWidth: props.maxWidth,
          height: "100%",
          backgroundColor: props.backgroundColor,
        }}
        raised
        onClick={props.onClick}
      >
        {props.click ? (
          <CardActionArea sx={{ height: "100%", width: "100%" }}>
            <CardContent>{props.children}</CardContent>
          </CardActionArea>
        ) : (
          <CardContent>{props.children}</CardContent>
        )}
        {props.actions && <CardActions>{props.actions}</CardActions>}
      </Card>
    </Tooltip>
  );
};

export default BasicCardwTT;
