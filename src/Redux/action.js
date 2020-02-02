import * as actionTypes from "./actionTypes";

export const setAlfabet = (alfabet)=>{
    return{
        type: actionTypes.SET_ALFABET,
        alfabet: alfabet
    }
};

export const setGjendje = (gjendje)=>{
    return {
        type: actionTypes.SET_GJENDJE,
        gjendje: gjendje
    }
};

export const setRelacione = (relacione)=>{
    return {
        type: actionTypes.SET_RELACIONE,
        relacione: relacione
    }
};