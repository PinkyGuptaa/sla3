import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Agencymaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/agency/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/agency/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/agency/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/agency/list/${id}`)
    }
}
 export default new Agencymaster_service()