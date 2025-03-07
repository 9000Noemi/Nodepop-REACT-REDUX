import { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const selectAdverts  = (state: RootState) => state.adverts || [] ; //Si no hay, devuelve un array

//Selector para adDetail:
export const selectAdDetail = (advertId?: string) => (state: RootState) => 
    state.adverts?.find((advert) => advert.id === Number(advertId));


export const getUi = (state: RootState) => state.ui;