import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
const BasicCard = (props) => {
  const CardContentEvenPadding = styled(CardContent)(
    `padding: 16px; &:last-child { padding-bottom: 16px; }`
  );

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
        <CardContentEvenPadding>{props.children}</CardContentEvenPadding>
      )}
      {props.actions && <CardActions>{props.actions}</CardActions>}
    </Card>
  );
};

export default BasicCard;
