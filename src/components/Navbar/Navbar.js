import React from "react";
import { connect } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import * as actionCreator from "../../state/actions/index";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.scss";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar
}));

const Navbar = props => {
  const classes = useStyles();

  const handleLogout = () => {
    props.logout();
    props.setDrawer(false);
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {props.drawer ? <MenuIcon /> : null}
        </IconButton>
        <Typography variant="h6" className="title">
          Imperium
        </Typography>
        {props.user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
