import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiUnsetError:
      return {
        ...state,
        msgError: null,
      };
    case types.loading:
      return {
        ...state,
        loading: true,
      };
    case types.unloading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
