import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Slaformaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/SLAFor/list`)
    }

    addsla = (details) => {
        return axios.post(`${MASTER_API_URL}/SLAFor/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/SLAFor/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/SLAFor/list/${id}`)
    }
}
 export default new Slaformaster_service()