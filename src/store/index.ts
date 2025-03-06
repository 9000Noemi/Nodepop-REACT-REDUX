import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as thunk from "redux-thunk";
import { Actions } from "./actions";
import { createBrowserRouter } from "react-router-dom";

type Router = ReturnType<typeof createBrowserRouter>;

type ExtraArgument = {
  router: Router;
};

export default function configureStore(preloadedState: Partial<State>, router: Router,) {
    const rootReducer = combineReducers(reducers);
    const store = createStore(
      rootReducer, 
      preloadedState as never,
      composeWithDevTools(
        applyMiddleware(
          thunk.withExtraArgument<State, Actions, ExtraArgument>({
            router
          
          }))))
    return store;
  }

/*
Tipos de TypeScript
*/

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
