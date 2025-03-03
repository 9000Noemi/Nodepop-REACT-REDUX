import { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const selectAdverts  = (state: RootState) => state.adverts;