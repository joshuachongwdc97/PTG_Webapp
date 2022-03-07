import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { DarkContext } from "../Shared/context/dark-context";
import { AuthContext } from "../Shared/context/auth-context";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip, Grid } from "@mui/material";

// ICONS
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = (props) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dark = useContext(DarkContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let darkToggleIcon = dark.dark ? (
    <DarkModeRoundedIcon />
  ) : (
    <LightModeRoundedIcon />
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={0.5}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={7}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                S.T.O.R.M
              </Typography>
            </Grid>

            <Grid
              item
              container
              xs={4.5}
              alignItems="center"
              justifyContent="end"
              columnSpacing={2}
            >
              <Grid
                item
                container
                xs={11}
                justifyContent="end"
                alignItems="center"
                columnSpacing={1}
              >
                {auth.isLoggedIn ? (
                  <React.Fragment>
                    <Grid item>
                      <AccountCircleRoundedIcon sx={{ display: "flex" }} />
                    </Grid>
                    <Grid item>
                      <Typography>{auth.email}</Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Logout">
                        <IconButton onClick={auth.logout}>
                          <LogoutRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <Grid item>
                    <Tooltip title="Login">
                      <IconButton component={Link} to="/auth">
                        <LoginRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={dark.toggle}>{darkToggleIcon}</IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key="inventory" component={Link} to="/">
            <ListItemIcon>
              <ViewQuiltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Drive Inventory" />
          </ListItem>
          <ListItem button key="system" component={Link} to="/system">
            <ListItemIcon>
              <DesktopWindowsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="System Tracker" />
          </ListItem>
          <ListItem button key="team" component={Link} to="/team">
            <ListItemIcon>
              <GroupsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
