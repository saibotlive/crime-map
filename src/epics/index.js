import { combineEpics } from "redux-observable";
import { dataEpic } from "./data-epic";

export default combineEpics(dataEpic);
