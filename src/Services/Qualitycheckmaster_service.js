import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Qualitycheckmaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/qcp/list`)
    } 

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/qcp/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/qcp/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/qcp/list/${id}`)
    }
}
 export default new Qualitycheckmaster_service()