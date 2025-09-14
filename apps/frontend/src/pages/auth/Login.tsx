import PostLogin from "../../requests/accounts/postLogin.js";
import getUser from "../../singleton/user.js";
import {useNavigate} from "react-router";

function Login() {
    const navigate = useNavigate();

    const loginClick = async () => {
        const user = getUser();
        await user.login("test", "test123");
        navigate("/")
    }
    
    return (
    
    <div>
        <button onClick={loginClick}>Login</button>
    </div>

    )
}

export default Login;