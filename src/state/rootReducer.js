import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import applicationReducer from "./reducers/applicationReducer";
import floorReducer from "./reducers/floor";
import zoneReducer from "./reducers/zones";
const rootReducer = combineReducers({
  auth: authReducer,
  appState: applicationReducer,
  floors: floorReducer,
  zoneReducer: zoneReducer
});

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
