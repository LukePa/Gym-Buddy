import {createContext, useEffect, useState} from "react";
import PostLogin from "./requests/accounts/postLogin.js";
import getUser from "./singleton/user.js";
import {getApiUrl} from "./helpers/envHelpers.js";
import performAuthenticatedRequest from "./requests/performAuthenticatedRequest.js";


function App() {
    const loginClick = async () => {
        const t = await PostLogin("test", "test123")
        const user = getUser();
        user.setAuthToken(t.token);
    }
    
    const performAuthenticatedReq = async () => {
        await performAuthenticatedRequest(`${getApiUrl()}/exercises`)
    }
    
    
    return (
        <>
          <div>
            <p>My frontend</p>
              <button onClick={loginClick}>Login</button>
              <button onClick={performAuthenticatedReq}>Authenticated Request</button>
          </div>
        </>
    )
}

export default App
