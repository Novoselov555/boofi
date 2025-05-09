import React from "react";
import { Navigate, Outlet} from "react-router-dom";
export default function PrivateRoute() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        return <Navigate to={"/auth/login"} replace />;
    }
    return <Outlet/>;
}