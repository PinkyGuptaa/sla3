import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Slatypemaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/SLATypeMaster/list`)
    }
    addsla = (details) => {
        return axios.post(`${MASTER_API_URL}/SLATypeMaster/save`,details)
    }
    updatesla = (id,sladetails)=>{
        return axios.put(`${MASTER_API_URL}/SLATypeMaster/update/${id}`,sladetails)
    }
    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/SLATypeMaster/list/${id}`)
    }
}
 export default new Slatypemaster_service()