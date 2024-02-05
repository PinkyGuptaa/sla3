import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Outcomemaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/om/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/om/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/om/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/om/list/${id}`)
    }
}
 export default new Outcomemaster_service()