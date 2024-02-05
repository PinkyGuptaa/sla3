import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Driver_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/driverperformance/list`)
    }
    add = (details) => {
        return axios.post(`${MASTER_API_URL}/driverperformance/save`,details)
    }
    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/driverperformance/update/${id}`,details)
    }
    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/driverperformance/list/${id}`)
    }
    getbyisResolved = async() => {
        return await axios.get(`${MASTER_API_URL}/driverperformance/getbyisresolve`)
    }
    setisApproved = (sla)=>{
        return axios.post(`${MASTER_API_URL}/driverperformance/setisapproved/${sla}`)
    }
    setisReject = (sla)=>{
        return axios.post(`${MASTER_API_URL}/driverperformance/setisreject/${sla}`)
    }
}
 export default new Driver_service();