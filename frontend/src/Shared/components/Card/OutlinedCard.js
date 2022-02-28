import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Grid } from "@mui/material";

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
        <CardActionArea style={{ height: "100%" }}>
          <CardContent>{props.children}</CardContent>
        </CardActionArea>
      ) : (
        <Grid container alignItems={props.align} style={{ height: "100%" }}>
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
