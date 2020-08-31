import Dashboard from "./containers/Dashboard/Dashboard.js";
import Floors from "./containers/Floors/Floors.js";
import User from "./containers/Users/Users.js";

const route = [
  { path: "/", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/floors", exact: true, name: "Facility", component: Floors },
  { path: "/users", exact: true, name: "Users", component: User }
];
export default route;
