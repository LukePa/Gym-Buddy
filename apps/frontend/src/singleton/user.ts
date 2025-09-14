import {clearLocalAuthToken, getLocalAuthToken, setLocalAuthToken} from "../helpers/auth.js";
import PostRefresh from "../requests/accounts/postRefresh.js";
import PostLogin from "../requests/accounts/postLogin.js";


class User {
    getAuthToken(): string | null {
        return getLocalAuthToken();
    }
    
    setAuthToken(token: string) {
        setLocalAuthToken(token);
    }
    
    async login(username: string, password: string) {
        const res = await PostLogin(username, password);
        this.setAuthToken(res.token);
    }

    async refreshToken() {
        const refreshResponse = await PostRefresh();
        this.setAuthToken(refreshResponse.token);
    }
    
    clear() {
        clearLocalAuthToken();
    }
}


let globalUser: User;
export default function getUser(): User {
    if (!globalUser) globalUser = new User();
    
    return globalUser;
}