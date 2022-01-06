import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const MediaCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        height: "100%",
      }}
      raised
    >
      <CardActionArea>
        <CardMedia component="img" height={props.height} image={props.media} />
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
