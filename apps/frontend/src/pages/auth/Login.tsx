import PostLogin from "../../requests/accounts/postLogin.js";
import getUser from "../../singleton/user.js";
import {useNavigate} from "react-router";

function Login() {
    const navigate = useNavigate();

    const loginClick = async () => {
        const t = await PostLogin("test", "test123")
        const user = getUser();
        user.setAuthToken(t.token);
        navigate("/")
    }
    
    return (
    
    <div>
        <button onClick={loginClick}>Login</button>
    </div>

    )
}

export default Login;