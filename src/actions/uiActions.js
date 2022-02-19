import { types } from "../types/types";

export const setErrorAction = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const unsetErrorAction = () => ({
  type: types.uiUnsetError,
});

export const loadingAction = () => ({
  type: types.loading,
});

export const unloadingAction = () => ({
  type: types.unloading,
});
