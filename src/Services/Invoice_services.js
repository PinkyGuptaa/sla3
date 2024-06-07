import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Invoice_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/invoice/list`)
    }

    add = (details) => {
        return axios.post(`${MASTER_API_URL}/agency/save`,details)
    }

    update = (details)=>{
        return axios.put(`${MASTER_API_URL}/invoice/update`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/agency/list/${id}`)
    }
}
 export default new Invoice_service()