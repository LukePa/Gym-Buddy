import {GlobalDataManager} from "../data/globalDataManager.js";


let globalDataManager: GlobalDataManager | undefined;


export default function getGlobalDataManager(): GlobalDataManager {
    if (!globalDataManager) {
        globalDataManager = new GlobalDataManager({});
    }
    
    return globalDataManager;
}