import { combineReducers } from "redux"

import mouse from "./mouseReducer"
import history from "./historyReducer"

export default combineReducers({
  mouse,
  history,
})
