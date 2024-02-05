import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Deleteservice {
        
    deleteQualitybyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/QualityStandard/delete/${id}`)
    }
    deleteslabyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/SLA/delete/${id}`)
    }
    deleteslatypebyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/SLATypeMaster/delete/${id}`)
    }
    deleteslaforbyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/SLAFor/delete/${id}`)
    }

    deletecustomerbyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/customercomplaint/delete/${id}`)
    }
    
    deletebusbyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/busperformance/delete/${id}`)
    }
    deleteagencybyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/agency/delete/${id}`)
    }
    deleteinstancebyid = (id)=>{
        return axios.delete(`${MASTER_API_URL}/instance/delete/${id}`)
    }
    deleteactionbyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/am/delete/${id}`)
    }
    deletegenericbyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/gpm/delete/${id}`)
    }
    deletewarningbyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/wmc/delete/${id}`)
    }
    deletereasonbyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/rmc/delete/${id}`)
    }
    deletequalitycheckbyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/qcp/delete/${id}`)
    }
    deleteincentivebyid= (id)=>{
        return axios.delete(`${MASTER_API_URL}/incentive/delete/${id}`)
    }
    // deletePurchasebyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/pt/deletebyid/${id}`)
    // }
    // deleteRoutebyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/rm/deletebyid/${id}`)
    // }
    // deleteFuelTypebyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/ft/deletebyid/${id}`)
    // }
    // deleteBunkerbyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/bm/deletebyid/${id}`)
    // }
    // deleteRoutetripbyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/rte/deletebyid/${id}`)
    // }
    // deleteOperationbyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/ot/deletebyid/${id}`)
    // }
    // deleteVehiclebyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/vm/deletebyid/${id}`)
    // }
    // deleteSchedulerbyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/s/deleteById/${id}`)
    // }
    // deleteNonrevenuebyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/nr/deletebyid/${id}`)

    // }
    // deletepobyid = (id)=>{
    //     return axios.delete(`${MASTER_API_URL}/po/deletebyid/${id}`)

    // }
}
 export default new Deleteservice()