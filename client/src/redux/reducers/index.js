import { combineReducers } from "redux";
import dashboard from "./dashboard";
import auth from "./auth";
import alert from "./alert";

export default combineReducers({ auth, dashboard, alert });
