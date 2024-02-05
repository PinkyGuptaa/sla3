import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class CustomerComplaint_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/customercomplaint/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/customercomplaint/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/customercomplaint/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/customercomplaint/list/${id}`)
    }
}
 export default new CustomerComplaint_service()