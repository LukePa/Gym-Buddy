import PostLogin from "../requests/accounts/postLogin.js";
import getUser from "../singleton/user.js";
import performAuthenticatedRequest from "../requests/performAuthenticatedRequest.js";
import {getApiUrl} from "../helpers/envHelpers.js";
import BanneredPage from "../components/BanneredPage/index.js";


export default function Root() {
    
    const performAuthenticatedReq = async () => {
        await performAuthenticatedRequest(`${getApiUrl()}/exercises`)
    }


    return (
        <BanneredPage>
            <div>
                <p>My frontend</p>
                <button onClick={performAuthenticatedReq}>Authenticated Request</button>
            </div>
        </BanneredPage>
    )
}