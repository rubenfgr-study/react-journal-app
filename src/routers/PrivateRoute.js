import { Redirect } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn 
    ? children 
    : <Redirect to="/auth/login" />;
};
