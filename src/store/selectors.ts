import { RootState } from '.';

export const getIsLogged = (state: RootState) => state.auth;

export const selectAdverts = (state: RootState) => state.adverts || []; //Si no hay, devuelve un array

export const selectAdDetail = (state: RootState) => state.adDetail;

export const selectTags = (state: RootState) => state.tags || [];

export const getUi = (state: RootState) => state.ui;
