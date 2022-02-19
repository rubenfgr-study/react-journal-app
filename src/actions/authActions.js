import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import Swal from "sweetalert2";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import {
  loadingAction, unloadingAction,
  unsetErrorAction
} from "./uiActions";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(loadingAction());

    signInWithEmailAndPassword(getAuth(), email, password)
      .then(({ user }) => {
        dispatch(loginAction(user.uid, user.displayName));
        dispatch(unsetErrorAction());
        dispatch(unloadingAction());
      })
      .catch((err) => {
        dispatch(unloadingAction());
        if (err.code.includes("invalid-email")) {
          Swal.fire({title: 'Error', text: "Invalid email", icon: 'error'});
        }
        if (err.code.includes("user-not-found")) {
          Swal.fire({title: 'Error', text: "User not found", icon: 'error'});
        }
        if (err.code.includes("wrong-password")) {
          Swal.fire({title: 'Error', text: "Wrong password", icon: 'error'});
        }
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(getAuth(), googleAuthProvider)
      .then(({ user }) => {
        dispatch(loginAction(user.uid, user.displayName));
        dispatch(unsetErrorAction());
        dispatch(unloadingAction());
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const startGoogleRegister = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(loginAction(user.uid, user.displayName));
        dispatch(unsetErrorAction());
      })
      .catch((err) => {
        if (err.code.includes("email-already-in-use")) {
          Swal.fire({title: 'Error', text: "email already in use", icon: 'error'});
        } else {
          Swal.fire({title: 'Error', text: "uncontrolled error", icon: 'error'});
        }
      });
  };
};

export const loginAction = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(getAuth());
    dispatch(logoutAction());
  };
};

export const logoutAction = () => ({
  type: types.logout,
});
