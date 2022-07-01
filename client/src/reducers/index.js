import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import contact from "./contact";

export default combineReducers({ posts, auth, contact });
