//jodi user loggedin kora thakey thakley <Private></Private> diye wrap kora children component/route a user k jetey dibo otherwise loggedin na thakley user k onno route a redirect korey dibo
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  //console.log("private route diye wrapped children", children); //<Private></Private> wrap kora component pabo children hisabey

  //now check if user logged in or not with the help of redux store
  const isLoggedIn = useAuth();

  //user loggedin na thakley public route gula tey shey access kortey parbey
  return !isLoggedIn ? children : <Navigate to="/inbox"></Navigate>;
};

export default PublicRoute;
