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
  Grid,
  Slide,
} from "@mui/material";

// COMPONENTS
import TextFieldWIcon from "../../../Shared/components/Input/TextFieldWIcon";

// ICONS
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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
      sx={{ minHeight: props.minHeight }}
      PaperProps={{
        sx: { borderRadius: 3, position: props.position, top: props.top },
      }}
    >
      {props.fullScreen && (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={props.searchBar ? 9.5 : 11.5}>
                <Typography
                  sx={{ ml: 0, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {props.title}
                </Typography>
              </Grid>
              {props.searchBar && (
                <Grid item xs={2}>
                  <TextFieldWIcon
                    startIcon={<SearchRoundedIcon />}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    value={props.value}
                    size="small"
                  />
                </Grid>
              )}
              <Grid item xs={0.5} align="end">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={props.close}
                  aria-label="close"
                >
                  <KeyboardArrowDownRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
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
          <DialogActions sx={{ padding: "23px" }}>
            {props.actions}
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
};

export default BasicDialog;
