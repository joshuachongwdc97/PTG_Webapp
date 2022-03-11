import * as React from "react";
import { CardActionArea, Card, CardMedia } from "@mui/material";

const MediaCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        height: "100%",
        borderRadius: 3,
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
