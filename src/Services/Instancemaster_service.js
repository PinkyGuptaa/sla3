import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Instancemaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/instance/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/instance/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/instance/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/instance/list/${id}`)
    }
}
 export default new Instancemaster_service()