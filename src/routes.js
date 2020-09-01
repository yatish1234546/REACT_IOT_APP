import React from "react";
import Dashboard from "./containers/Dashboard/Dashboard.js";
import Floors from "./containers/Floors/Floors.js";
import User from "./containers/Users/Users.js";
import Clusters from "./containers/Clusters/Clusters.js";
import {
  GroupWork,
  Dashboard as DashIcon,
  Person,
  Apartment
} from "@material-ui/icons";

const route = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    icon: <DashIcon />
  },
  {
    path: "/floors",
    exact: true,
    name: "Floors",
    component: Floors,
    icon: <Apartment />
  },
  {
    path: "/clusters",
    exact: true,
    name: "Clusters",
    component: Clusters,
    icon: <GroupWork />
  },
  {
    path: "/users",
    exact: true,
    name: "Users",
    component: User,
    icon: <Person />
  }
];
export default route;
