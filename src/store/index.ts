import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";


export default function configureStore() {
    const rootReducer = combineReducers(reducers);
    const store = createStore(
      rootReducer, 
      );
    return store;
  }