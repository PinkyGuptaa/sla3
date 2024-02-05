import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Actionmaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/am/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/am/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/am/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/am/list/${id}`)
    }
}
 export default new Actionmaster_service()