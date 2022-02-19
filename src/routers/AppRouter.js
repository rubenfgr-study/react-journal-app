import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { loginAction } from "../actions/authActions";
import { startLoadingNotes } from "../actions/noteActions";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(
      async (user) => {
        if (user?.uid) {
          dispatch(loginAction(user.uid, user.displayName));
          setIsLoggedIn(true);

          // LOAD NOTES
          dispatch(startLoadingNotes(user.uid));

        } else {
          setIsLoggedIn(false);
        }
        setChecking(false);
      },
    );
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/auth">
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          </Route>

          <Route exact path="/">
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          </Route>


          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
