import * as actionTypes from "./actionTypes";

const initialState = {
  alfabet: null,
  gjendje: null,
  relacione: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALFABET:
      return {
        ...state,
        alfabet: action.alfabet
      };

    case actionTypes.SET_GJENDJE:
      return {
        ...state,
        gjendje: action.gjendje
      };

    case actionTypes.SET_RELACIONE:
      return {
        ...state,
        relacione: action.relacione
      };
    default:
      return state;
  }
};

export default reducer;
