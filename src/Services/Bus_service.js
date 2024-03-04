import axios from "axios";
import Environment from '../Environment/Environment.json'
const MASTER_API_URL = Environment.Base_Url;
const MASTER_API_URL1 = Environment.Base_Url1;
class Bus_service {
    getAll = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/list`)
    }

    getslaBus = (id) => {
        return  axios.get(`${MASTER_API_URL}/busperformance/slaBus/${id}`)
    }
    add = (details) => {
        return axios.post(`${MASTER_API_URL}/busperformance/save`,details)
    }

    addincentive = (details) => {
        return axios.post(`${MASTER_API_URL}/pincentive/save`,details)
    }
    getIncentive = async() => {
        return await axios.get(`${MASTER_API_URL}/pincentive/list`)
    }

    update = (id,details)=>{
        return axios.put(`${MASTER_API_URL}/busperformance/update/${id}`,details)
    }
    getbyid = (id) =>{
        return axios.get(`${MASTER_API_URL}/busperformance/list/${id}`)
    }
    getbyisResolved = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbyisresolve`)
    }
    getbyisApproved = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getbyisresolvee`)
    }
    setisApproved = (sla,remarks)=>{
        console.log(sla);
        return axios.put(`${MASTER_API_URL}/busperformance/setisapproved/${sla,remarks}`)
    }
    setisReject = (sla)=>{
        return axios.put(`${MASTER_API_URL}/busperformance/setisreject/${sla}`)
    }
    getAllPerformance = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getallperformance`)
    }
   
    getAllBus = async() => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getAllBus`)
    }
    getdatabybusnodate = async(busno, dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getDataByBus/${busno}/${dateto}/${datefrom}`);
    }
    // getdatabybusnodate = async(busno, dateto,datefrom) => {
    //     return await axios.get(`${MASTER_API_URL}/busperformance/getData/${busno}/${dateto}/${datefrom}`);
    // }
    getdatabydate = async(date) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getDatabyDate/${date}`);
    }
    datewisedata = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getDataBetween/${dateto}/${datefrom}`);
    }
    
    getSLANames = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getSlaBus`)
    }
    // http://10.226.33.132:9100/busperformance/getQuality
    getSLAQuality = async() => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getQuality`)
    }
    //bypto
    getAllbusbypto = async(pto) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getAllVehicle/${pto}`);
    }
    datewisedatapto = async(pto,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getWaybillDataBetweenDate/${dateto}/${datefrom}/${pto}`);
    }
    // Frequency - Bus km  //getAllData
    getAllData = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getDataBy/${dateto}/${datefrom}`);
    }
    getAllMergeData = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getMergeData/${dateto}/${datefrom}`);
    }


    //checkifalreadyfilledformonth
    checkifalreadyfilledpenalty = async(parameter,month,year)=>{
        return await axios.get(`${MASTER_API_URL}/busperformance/getQualityWise/${parameter}/${month}/${year}`)
    }  

    checkifalreadyfilledincrement = async(parameter,month,year)=>{
        return await axios.get(`${MASTER_API_URL}/pincentive/getQualityWise/${parameter}/${month}/${year}`)
    } 
    
   
    
    getAllAccidentswithpto = async(pto,dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getData/${dateto}/${datefrom}/${pto}`)
    }
    
    getAllAccidents = async(dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/dataBetweenDates/${dateto}/${datefrom}`)
    }
    //For Frequency -- bus details
    getFrequencyData = async(busno, dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/ByBusNo/${busno}/${dateto}/${datefrom}`);
    }
    
    getTripFrequencyData = async(regno, dateto,datefrom) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getMergeMultipleApi/${regno}/${dateto}/${datefrom}`);
    }
    //for safety of operation
    getSafetyOperationData = async(regno, startDate,endDate) => {
        return await axios.get(`${MASTER_API_URL1}/busperformance/getDataBetweenDateByBusNo/${regno}/${startDate}/${endDate}`);
    }
    getSafetyOperationDatawithpto = async(regno, startDate,endDate,pto) => {
        return await axios.get(`${MASTER_API_URL}/busperformance/getDataBetweenDateByBusNo/${regno}/${startDate}/${endDate}/${pto}`);
    }
    //get count of penalty 
    getpenaltycount = async(startDate,endDate) => {
        return await axios.get(`${MASTER_API_URL}/report/getQualityTypeCount/${startDate}/${endDate}`);
    }
    //get incentive count
    getincentivecount = async(startDate,endDate) => {
        return await axios.get(`${MASTER_API_URL}/report/getQualityTypeCountByDateWise/${startDate}/${endDate}`);
    }

//parameter report 
// http://10.226.33.132:9100/pincentive/getPDetails/2023/Reliability (BF)
getparameterReport = async(year, parameter) => {
    return await axios.get(`${MASTER_API_URL}/pincentive/getPDetails/${year}/${parameter}`);
}
}
export default new Bus_service();
