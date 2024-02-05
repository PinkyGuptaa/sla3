import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Incentivemaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/incentive/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/incentive/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/incentive/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/incentive/list/${id}`)
    }
}
 export default new Incentivemaster_service()