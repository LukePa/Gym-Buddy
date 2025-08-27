import type {JSX} from "react";
import {getLocalAuthToken} from "../helpers/auth.js";
import {Navigate} from "react-router";
import {Outlet} from "react-router";
import getUser from "../singleton/user.js";


function Protected () {
    const user = getUser();
    const token = user.getAuthToken();
    
    if (!token) return <Navigate to="/auth/login" replace />
    
    return <Outlet />;
} 


export default Protected