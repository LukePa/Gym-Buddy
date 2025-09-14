import {GlobalDataManager} from "../data/globalDataManager.js";
import ApiRepository from "../data/apiRepository.js";


let globalDataManager: GlobalDataManager | undefined;


export default function getGlobalDataManager(): GlobalDataManager {
    if (!globalDataManager) {
        const apiRepository = new ApiRepository();
        globalDataManager = new GlobalDataManager(apiRepository);
    }
    
    return globalDataManager;
}