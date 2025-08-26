import {createContext, useEffect, useState} from "react";
import PostLogin from "./requests/accounts/postLogin.js";


function App() {
    const buttonClick = async () => {
        const t = await PostLogin("test", "test123")
        console.log(t)
    }
    
    const [currentAuthToken, setAuthToken] = useState("");
    
    const AuthTokenContext = createContext<string>("");
    
    
    return (
        <>
          <div>
            <p>My frontend</p>
              <button onClick={buttonClick}>Do something</button>
          </div>
            
            <AuthTokenContext value={currentAuthToken}>
                
            </AuthTokenContext>
        </>
    )
}

export default App
