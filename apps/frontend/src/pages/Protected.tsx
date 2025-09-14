import {JSX, useState} from "react";
import {getLocalAuthToken} from "../helpers/auth.js";
import {Navigate} from "react-router";
import {Outlet} from "react-router";
import getUser from "../singleton/user.js";
import getGlobalDataManager from "../singleton/globalDataManager.js";
import BanneredPageWithCenteredContent from "../components/BanneredPageWithCenteredContent/index.js";
import LoadingScreen from "../components/LoadingScreen/index.js";
import ErrorPage from "./error/index.js";


function Protected () {
    const user = getUser();
    const token = user.getAuthToken();
    
    if (!token) return <Navigate to="/auth/login" replace />
    
    const globalData = getGlobalDataManager();
    const [isInitialised, setIsInitialised] = useState(globalData.isInitialised);
    const [encounteredLoadingError, setEncounteredLoadingError] = useState(false);
    
    if (encounteredLoadingError) {
        return <Navigate to="/error" replace />
    }
    
    if (!isInitialised) {
        globalData.intialise()
            .then(() => setIsInitialised(globalData.isInitialised))
            .catch(() => {setEncounteredLoadingError(true)})
        
        return <BanneredPageWithCenteredContent>
            <LoadingScreen />
        </BanneredPageWithCenteredContent>
    }
    
    return <Outlet />;
} 


export default Protected