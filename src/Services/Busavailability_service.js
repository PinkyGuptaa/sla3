import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;

class Busavailability_service{
   
    getAllbusavailable = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbybus`)
    }

    getAllbusbypto = async(pto) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getAllVehicle/${pto}`);
        
    }

    buswisedata = async(busno) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbybusno/${busno}`);
    }

    datewisedata = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbybusno/${dateto}/${datefrom}`);
    }

    datewisedatapto = async(dateto,datefrom,pto) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbybusnopto/${pto}/${dateto}/${datefrom}`);
    }
    busdatewisedata = async(busno,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbybusno/${busno}/${dateto}/${datefrom}`);
    }

    busdatewisedatabreakdown = async(busno,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/ByBus/${busno}/${dateto}/${datefrom}`);
    }


}

export default new Busavailability_service();