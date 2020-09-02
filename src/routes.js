import React from "react";
import Dashboard from "./containers/Dashboard/Dashboard";
import Floors from "./containers/Floors/Floors";
import User from "./containers/Users/Users";
import Zones from "./containers/Zones/Zones";
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
    path: "/zones",
    exact: true,
    name: "Zones",
    component: Zones,
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
