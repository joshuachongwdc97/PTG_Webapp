import * as React from "react";
import {
  CardActionArea,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

const OutlinedCard = (props) => {
  return (
    <Card
      // variant="outlined"
      sx={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        borderRadius: 3,
      }}
    >
      {props.click ? (
        <CardActionArea sx={{ height: "100%" }}>
          <CardContent>{props.children}</CardContent>
        </CardActionArea>
      ) : (
        <Grid container alignItems={props.align} sx={{ height: "100%" }}>
          <Grid item xs={12}>
            <CardContent>{props.children}</CardContent>
          </Grid>
        </Grid>
      )}

      {props.actions && <CardActions>{props.actions}</CardActions>}
    </Card>
  );
};

export default OutlinedCard;
