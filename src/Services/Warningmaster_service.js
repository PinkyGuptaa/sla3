import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Warningmaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/wmc/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/wmc/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/wmc/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/wmc/list/${id}`)
    }
}
 export default new Warningmaster_service()