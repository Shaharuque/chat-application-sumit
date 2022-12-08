//jodi user loggedin kora thakey thakley <Private></Private> diye wrap kora children component/route a user k jetey dibo otherwise loggedin na thakley user k onno route a redirect korey dibo
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  //console.log("private route diye wrapped children", children); //<Private></Private> wrap kora component pabo children hisabey

  //now check if user logged in or not with the help of redux store
  const isLoggedIn = useAuth();

  //if user logged in then children route accessable otherwise navigate to login route
  return isLoggedIn ? children : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
