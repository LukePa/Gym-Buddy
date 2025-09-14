import BanneredPageWithCenteredContent from "../../components/BanneredPageWithCenteredContent/index.tsx";
import getUser from "../../singleton/user.js";
import getGlobalDataManager from "../../singleton/globalDataManager.js";
import Button from "../../components/Button/index.js";
import {useNavigate} from "react-router";

export default function ErrorPage() {
    const navigate = useNavigate();
    
    const user = getUser();
    user.clear();
    
    const globalData = getGlobalDataManager();
    globalData.clear();
    
    const onNavigateToLoginClick = () => {
        navigate("/auth/login");
    }
    
    return (
        <BanneredPageWithCenteredContent>
                <p className="light">Something has gone wrong</p>
                <Button onClick={onNavigateToLoginClick}>Click here to log in</Button>
        </BanneredPageWithCenteredContent>
    )
}