import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import ListTile from "./ListTile.js";
import LogoutIcon from "@mui/icons-material/Logout";
import BreadcrumbsComponent from "./BreadcrumbsComponent.js";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TopicIcon from "@mui/icons-material/Topic";
import logoLg from "../asstes/logo_lg.jpg";
import logo from "../asstes/logo.jpg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "@mui/icons-material/Dashboard";
import RestoreIcon from "@mui/icons-material/Restore";
import { AccountCircle } from "@mui/icons-material";

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
    width: `calc(${theme.spacing(8)} + 1px)`,
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

export default function DrawerComponent(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [dropdownOpen, setDropdownOpen] = React.useState(true);
  const [renewOpen, setRenewOpen] = React.useState(false);
  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleRenewClick = () => {
    setRenewOpen(!renewOpen);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        // width: "100",
        backgroundColor: "#eceff4",
      }}
    >
      <CssBaseline />
      <AppBar
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #00b8e1, #00b0d9, #00a8d0, #00a1c8, #0099c0)",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>

          <BreadcrumbsComponent />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="body2"
            style={{ marginInline: "auto", display: open ? "block" : "none" }}
          >
            MENU
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <>
                <ChevronLeftIcon />
              </>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListTile
            open={open}
            title="Dashboard"
            page={"/"}
            icon={<DashboardIcon />}
          />
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <TopicIcon />
            </ListItemIcon>
            <ListItemText primary="Masters" />
            {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListTile
                open={open}
                title="Service Group "
                page={"/service-group"}
                icon={<CategoryIcon />}
              />
              <ListTile
                open={open}
                title="Service"
                page={"/service"}
                icon={<InventoryIcon />}
              />

              <ListTile
                open={open}
                title="Party"
                icon={<PersonIcon />}
                page={"/party"}
              />

              <ListTile
                open={open}
                title="Company"
                icon={<WarehouseIcon />}
                page={"/company"}
              />

              <ListTile
                open={open}
                title="Dealer"
                icon={<ContactEmergencyIcon />}
                page={"/dealer"}
              />
              <ListTile
                open={open}
                title="Admin"
                icon={<AccountCircle />}
                page={"/admin"}
              />
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListTile
            open={open}
            title="Renewals"
            icon={<RestoreIcon />}
            page={"/renewals"}
          />
        </List>

        <Divider />
        <List>
          <ListTile
            open={open}
            title="Logout"
            icon={<LogoutIcon />}
            page="/logout"
          />
        </List>
        {open ? (
          <List
            style={{
              alignSelf: "center",
              top: "87%",
              position: "fixed",
            }}
          >
            <a href="http://yeshasoftware.com/" target="_blank">
              <img src={logoLg} style={{ maxWidth: "10rem" }} />
            </a>
          </List>
        ) : (
          <List
            style={{
              alignSelf: "center",
              top: "90%",
              position: "fixed",
            }}
          >
            <a href="http://yeshasoftware.com/" target="_blank">
              <img src={logo} style={{ maxWidth: "3rem" }} />
            </a>
          </List>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {props.children}
      </Box>
    </Box>
  );
}
