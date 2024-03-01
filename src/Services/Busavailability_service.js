import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;
const MASTER_API_URL1 = Environment.Base_Url1;
class Busavailability_service{
   
    getAllbusavailable = async() => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getbybus`)
    }

    getAllbusbypto = async(pto) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getAllVehicle/${pto}`);
        
    }

    buswisedata = async(busno) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getbybusno/${busno}`);
    }

    datewisedata = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getbybusno/${dateto}/${datefrom}`);
    }

    datewisedatapto = async(dateto,datefrom,pto) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getbybusnopto/${pto}/${dateto}/${datefrom}`);
    }
    busdatewisedata = async(busno,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getbybusno/${busno}/${dateto}/${datefrom}`);
    }

    busdatewisedatabreakdown = async(busno,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/ByBus/${busno}/${dateto}/${datefrom}`);
    }


}

export default new Busavailability_service();