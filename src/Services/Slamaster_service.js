import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class SlaMaster_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/SLA/list`)
    }
    getslabyBus = (value) =>{
        return axios.get(`${MASTER_API_URL}/SLA/list1/Bus`)
    }
    addsla = (sladetails) => {
        return axios.post(`${MASTER_API_URL}/SLA/save`,sladetails)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/SLA/update/${id}`,details)
    }

    getslabyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/SLA/list/${id}`)
    }
}
 export default new SlaMaster_service()