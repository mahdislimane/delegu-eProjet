import { combineReducers } from "redux";
import FirstReducer from "./FirstReducer";
import DoctorsReducer from "./DoctorsReducer";
import DrugsReducer from "./DrugsReducer";
import ChosenReducer from "./ChosenReducer";

export default combineReducers({
  FirstReducer,
  DoctorsReducer,
  ChosenReducer,
  DrugsReducer,
});
