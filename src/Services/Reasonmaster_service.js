import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Reasonmaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/rmc/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/rmc/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/rmc/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/rmc/list/${id}`)
    }
}
 export default new Reasonmaster_service()