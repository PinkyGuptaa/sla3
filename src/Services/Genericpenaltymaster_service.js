import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Genericpenaltymaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/gpm/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/gpm/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/gpm/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/gpm/list/${id}`)
    }
}
 export default new Genericpenaltymaster_service()