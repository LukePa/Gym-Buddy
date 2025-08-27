import {getLocalAuthToken, setLocalAuthToken} from "../helpers/auth.js";
import PostRefresh from "../requests/accounts/postRefresh.js";


class User {
    getAuthToken(): string | null {
        return getLocalAuthToken();
    }
    
    setAuthToken(token: string) {
        setLocalAuthToken(token);
    }
    
    // async login(username: string, password: string) {
    //    
    // }

    async refreshToken() {
        const refreshResponse = await PostRefresh();
        this.setAuthToken(refreshResponse.token);
    }
}


let globalUser: User;
export default function getUser(): User {
    if (!globalUser) globalUser = new User();
    
    return globalUser;
}