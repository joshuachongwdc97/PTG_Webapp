import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BasicDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={props.close}
      fullWidth
      fullScreen={props.fullScreen}
      maxWidth={props.maxWidth}
      style={{ minHeight: props.minHeight }}
    >
      {props.fullScreen && (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              {props.title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {!props.fullScreen && props.title && (
        <React.Fragment>
          <DialogTitle>{props.title}</DialogTitle>
          <Divider />
        </React.Fragment>
      )}
      <DialogContent>{props.children}</DialogContent>
      {props.actions && (
        <React.Fragment>
          <Divider />
          <DialogActions style={{ padding: "23px" }}>
            {props.actions}
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BasicDialog;
