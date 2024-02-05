import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Conductor_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/conductorperformance/list`)
    }
    get = async() => {
        return await axios.get(`${MASTER_API_URL}/conductorperformance/slaconducter`)
    }
    add = (details) => {
        return axios.post(`${MASTER_API_URL}/conductorperformance/save`,details)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/conductorperformance/update/${id}`,details)
    }

    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/conductorperformance/list/${id}`)
    }
    
    getbyisResolved = async() => {
        return await axios.get(`${MASTER_API_URL}/conductorperformance/getbyisresolve`)
}
setisApproved = (sla)=>{
    return axios.post(`${MASTER_API_URL}/conductorperformance/setisapproved/${sla}`)
}
setisReject = (sla)=>{
    return axios.post(`${MASTER_API_URL}/conductorperformance/setisreject/${sla}`)
}
}
export default new Conductor_service()