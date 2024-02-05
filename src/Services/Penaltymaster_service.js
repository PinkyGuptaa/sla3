import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Penaltymaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/pmqc/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/pmqc/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/pmqc/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/pmqc/list/${id}`)
    }
}
 export default new Penaltymaster_service()