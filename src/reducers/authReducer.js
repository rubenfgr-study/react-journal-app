import { types } from "../types/types";

/*
     {
         uid: jdsifjasdfk342k34j34k334234
         name: rubenfgr
     }
*/
const initialState = {
  uid: "jdsifjasdfk342k34j34k334234",
  name: "rubenfgr",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
