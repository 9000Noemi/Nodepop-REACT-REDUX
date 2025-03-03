import { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const selectAdverts  = (state: RootState) => state.adverts;

export const selectAdvert = (advertId?: string) => (state: RootState) =>
    state.adverts.find((advert) => advert.id === Number(advertId));