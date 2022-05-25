import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postUploadReducer from "./postUploadReducer";

const rootReducer = combineReducers({
  userReducer,
  postUploadReducer,
});

export default rootReducer;
