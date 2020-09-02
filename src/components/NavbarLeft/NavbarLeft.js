import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
  MenuItem,
  MenuList
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import routes from "../../routes";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../state/actions/index";
import "./NavbarLeft.scss";
import { toolbarColor } from "../../styles";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    backgroundColor: "transparent",
    color: "black",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    ...toolbarColor
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  menuItem: {
    padding: "15px"
  },
  activeMenu: {
    backgroundColor: "#738bdc",
    backgroundImage: "linear-gradient(315deg, #738bdc 0%, #48c3eb 74%)"
  },
  icon: {
    paddingRight: "15px"
  }
}));

const NavbarLeft = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = props.location.pathname;

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <route.component {...props} />}
      />
    ) : null;
  });

  const [admin] = props.user.user.roles.filter(
    role => role === "Admin" || role === "System Admin"
  );

  const menulist = (
    <MenuList>
      {routes.map((route, index) => {
        if (!admin && route.name === "Users") {
          return null;
        }
        return (
          <MenuItem
            key={route.name}
            component={Link}
            to={route.path}
            className={`${classes.menuItem} ${
              activeRoute === route.path ? classes.activeMenu : null
            }`}
          >
            <span className={classes.icon}>{route.icon}</span>
            {route.name}
          </MenuItem>
        );
      })}
    </MenuList>
  );
  const handleLogout = () => {
    props.logout();
    props.setDrawer(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Imperium
          </Typography>
          <Button className="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        {menulist}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        <Switch> {menu} </Switch>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    drawer: state.appState.drawer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreator.logout()),
    setDrawer: state => dispatch(actionCreator.setDrawer(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLeft);
