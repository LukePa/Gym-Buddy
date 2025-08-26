import type {JSX} from "react";
import {getLocalAuthToken} from "../helpers/auth.js";
import {Navigate} from "react-router";
import {Outlet} from "react-router";


function Protected () {
    const token = getLocalAuthToken();
    
    if (!token) return <Navigate to="/auth/login" replace />
    
    return <Outlet />;
} 


export default WithAuth