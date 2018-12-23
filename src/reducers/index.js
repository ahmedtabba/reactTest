import { combineReducers } from "redux";
import branchReducer from "./branchReducer";
import countryReducer from "./countryReducer";
import authReducer from "./authReducer";

export default combineReducers({
  branches: branchReducer,
  countries: countryReducer,
  auth: authReducer
});
