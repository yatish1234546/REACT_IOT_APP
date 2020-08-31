import React from "react";
import { connect } from "react-redux";

import "./App.css";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import * as actionCreator from "../src/state/actions/index";

import NavbarLeft from "./components/NavbarLeft/NavbarLeft";
import Login from "./components/Login/Login";

const App = props => {
  const login = async creds => {
    props.login(creds).then(() => {
      props.setDrawer(true);
      props.history.push({ pathname: "/dashboard" });
    });
  };

  return (
    <Box>
      <Switch>
        {props.user ? (
          <NavbarLeft />
        ) : (
          <Route path="/">
            <Login
              submit={creds => {
                login(creds);
              }}
            />
          </Route>
        )}
      </Switch>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(actionCreator.login(payload)),
    setDrawer: state => dispatch(actionCreator.setDrawer(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
