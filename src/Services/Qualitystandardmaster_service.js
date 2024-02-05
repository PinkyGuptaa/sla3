import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class QualityStandardMaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/QualityStandard/list`)
    }
    addQualityType = (qualitytypedetails) => {
        return axios.post(`${MASTER_API_URL}/QualityStandard/save`,qualitytypedetails)
    }
    updateQualityType = (id,qualitytypedetails)=>{
        return axios.put(`${MASTER_API_URL}/QualityStandard/update/${id}`,qualitytypedetails)
    }
    getQualitybyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/QualityStandard/list/${id}`)
    }  
}
 export default new  QualityStandardMaster_service()