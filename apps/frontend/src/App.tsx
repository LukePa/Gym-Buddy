import {createContext, useEffect, useState} from "react";


function App() {
    const buttonClick = async () => {
        const t = await fetch("http://localhost:5312/exercises/test", {
            method: "post"
        })
        const body = t.json();
        console.log(body)
    }
    
    const [currentAuthToken, setAuthToken] = useState("");
    useEffect(() => {
        //Store auth token
    }, [currentAuthToken])
    
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
