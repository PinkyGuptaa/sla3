

import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import IncentivePage from '../BusPerformanceMetrics/AddBusIncentive';
import PenaltyPage from '../BusPerformanceMetrics/AddBus';

import { Edit } from '@mui/icons-material';
import Addbus from '../BusPerformanceMetrics/AddBus';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';
import './SO.css';
function SafetyOperation(props) {
  const [regno, setRegNo] = useState('');
  const [busdetails, setBusDetails] = useState([]);
  const [allbusdetails, setAllBusDetails] = useState([]);

  const [unavailablebus, setUnavailablebus] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filtervalue,setFiltervalue] = useState('monthwise');
  const [month,setMonth] = useState('');
  const [quarter,setQuarter] = useState('');
  const [halfyearly,setHalfyearly] = useState("")

  const [breakdownFactor, setBreakdownFactor] = useState(0);
const [totalActualDistance, setTotalActualDistance] = useState(0);
const [totalCoveredDistance, setTotalCoveredDistance] = useState(0);
  const [aftersearch,setAftersearch] = useState(false);

  const allmonths = [{key:"January",value:"01-01_01-31"},{key:"February",value:"02-01_02-28"},{key:"March",value:"03-01_03-31"},{key:"April",value:"04-01_04-30"},{key:"May",value:"05-01_05-31"},{key:"June",value:"06-01_06-30"},{key:"July",value:"07-01_07-31"},{key:"August",value:"08-01_08-31"},{key:"September",value:"09-01_09-30"},{key:"October",value:"10-01_10-31"},{key:"November",value:"11-01_11-30"},{key:"December",value:"12-01_12-31"}];

  const allquarters = [{key:"January-March",value:"2023-01-01_2023-03-31"},{key:"April-June",value:"2023-04-01_2023-06-30"},{key:"July-Sep",value:"2023-07-01_2023-09-30"},{key:"Oct-Dec",value:"2023-10-01_2023-12-31"}];
  const allhalfyearly = [{key:"January-June",value:"2023-01-01_2023-06-30"},{key:"July-December",value:"2023-07-01_2023-12-31"}];
    
 
  const [reportDetails, setReportDetails] = useState({
    countWayBillTrips: 0,
    countWayBillTripsWhereTimeIsNotZero: 0,
    wayBillTripsList: [],
  });

  const [tripData, setTripData] = useState({
    dispatch: 0,
    waybilltrip: 0,
  });
  const [totalDispatch, setTotalDispatch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalopen,setModalopen] = useState(false)
  const [updateid,setUpdateid] = useState('');
  // const [typeformodal,setTypeformodal] = useState("");
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [selectedRegNo, setSelectedRegNo] = useState(''); 
  const [year, setYear] = useState('');
  const [showIncentivePage, setShowIncentivePage] = useState(false);
  const [showPenaltyPage, setShowPenaltyPage] = useState(false);
  const [timeformodal,setTimeformodal] = useState("");
  const [typeformodal,setTypeformodal] = useState("");
  const [minorIncidents, setMinorIncidents] = useState([]);
  const [majorIncidents, setMajorIncidents] = useState([]);
  const [majorCount, setMajorCount] = useState(0);
  const [minorCount, setMinorCount] = useState(0);
  const [distance, setDistance] = useState(0);

  const styles = {
      
    valueContainer: (css) => ({
      ...css,
      ...{ width: "200px",
         textAlign:"left !important" }
    })
  };

  useEffect(() => {
    Bus_service.getAllBus()
      .then((res) => {
        setBusDetails(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  const changeFiltervalue = (e)=>{
    setFiltervalue(e);
    setReportDetails({
        countWayBillTrips: 0,
        countWayBillTripsWhereTimeIsNotZero: 0,
        wayBillTripsList: [],
      });
  }
  const fetchTripData = async (startDate, endDate) => {
    const apiUrl = `http://10.226.33.132:9100/busperformance/getMergeDataSum/${startDate}/${endDate}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch trip data');
      }
  
      const data = await response.json();
  
      // Assuming the data structure for total scheduled and completed trips is available in data
      setTripData({
        dispatch: data.dispatch,
        waybilltrip: data.waybilltrip,
      });

    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  };
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     if(filtervalue==="buswise")
    
    
//   if (regno && selectedDate) {
 
//         const apiUrl = `http://10.226.33.132:9100/busperformance/getData/${regno}/${selectedDate}`;

//         const response = await fetch(apiUrl, {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         setReportDetails({
//           countWayBillTrips: data.countWayBillTrips,
//           countWayBillTripsWhereTimeIsNotZero: data.countWayBillTripsWhereTimeIsNotZero,
//           wayBillTripsList: data.wayBillTripsList,
//         });
//       } else {
//         setError('Please select both Bus No. and Date');
//       }

//       else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
//         let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
//         if (month && year) {
//           let startDate = `${year}-${month.split('_')[0]}`;
//           let endDate = `${year}-${month.split('_')[1]}`;
//           console.log(startDate,endDate,year,month.split('_')[0]);

// try {
//   const res = await Bus_service.getAllAccidents(startDate, endDate); 
//   const busData = res.data;
//   console.log(res)
//   const minorIncidents = [];
// const majorIncidents = [];

// busData.forEach(item => {
//   if (item.incidentType === 'minor') {
//     minorIncidents.push(item);
//   } else if (item.incidentType === 'major') {
//     majorIncidents.push(item);
//   }
// });

// console.log('Minor Incidents:', minorIncidents);
// console.log('Major Incidents:', majorIncidents);
 

//   setAftersearch(true);
//   setLoading(false);
// } catch (error) {
//   console.error('Error fetching data:', error);
//   setLoading(false);
// }

//       }else {
//         setError('Please select both Month and Year');
//       }
//     }
//   };

const fetchAccidentsData = async () => {
  try {
    const startDate = `${year}-${month.split('_')[0]}`;
    const endDate = `${year}-${month.split('_')[1]}`;
    const res = await Bus_service.getAllAccidents(startDate, endDate);
    console.log(res.data)
    const accidentsData = res.data.IncidentData;
    console.log(accidentsData)
    let majoraccident = res.data.countMajorIncident;
    let minoraccident = res.data.countMinorIncident;
    let kmsRun = res.data.distance
    setMajorCount(majoraccident);
    setMinorCount(minoraccident);
    
    console.log(majorCount);
    console.log(minorCount);
    console.log(distance)
    const minorIncidentsData = [];
    const majorIncidentsData = [];

    accidentsData.forEach(item => {
      if (item.incidentType === 'minor') {
        minorIncidentsData.push(item);
      } else if (item.incidentType === 'major') {
        majorIncidentsData.push(item);
      }
    });

    setMinorIncidents(minorIncidentsData);
    setMajorIncidents(majorIncidentsData);
    setDistance(kmsRun)
    setAftersearch(true);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// const fetchAccidentsData = async () => {
//   try {
//     const startDate = `${year}-${month.split('_')[0]}`;
//     const endDate = `${year}-${month.split('_')[1]}`;
//     const res = await Bus_service.getAllAccidents(startDate, endDate);
//     console.log(res.data)
//     const accidentsData = res.data.IncidentData;
//     console.log(accidentsData)
//     let majoraccident = res.data.countMajorIncident;
//     let minoraccident = res.data.countMinorIncident;
//     let kmsRun = res.data.distance
//     setMajorCount(majoraccident);
//     setMinorCount(minoraccident);
    
//     console.log(majorCount);
//     console.log(minorCount);
//     console.log(distance)

//     if (Array.isArray(accidentsData)) {
//       const minorIncidentsData = [];
//       const majorIncidentsData = [];

//       accidentsData.forEach(item => {
//         if (item.incidentType === 'minor') {
//           minorIncidentsData.push(item);
//         } else if (item.incidentType === 'major') {
//           majorIncidentsData.push(item);
//         }
//       });

//       setMinorIncidents(minorIncidentsData);
//       setMajorIncidents(majorIncidentsData);
//     } else {
//       console.error('Accidents data is not an array:', accidentsData);
//     }

//     setDistance(kmsRun)
//     setAftersearch(true);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

const handleGenerateReport = () => {
  if (filtervalue === 'monthwise' && month && year) {
    fetchAccidentsData();
  } else {
    alert('Please select both Month and Year');
  }
};
  const handleChangeforbus = (e)=>{
    setRegNo(e.value);
    setSelectedDate(e.value);
  }
  const openIncentivePage = () => {
    setShowIncentivePage(true);
    // Additional logic if needed
  };

  const openPenaltyPage = () => {
    setShowPenaltyPage(true);
    // Additional logic if needed
  };
  const handleButtonClick = (time,type) => {
    setTimeformodal(time);
    setTypeformodal(type)
    setIsAddBusOpen(true);

    
  
  
  };
  function onmonthchange(value) {
    setMonth(value);

  }

  function onquarterchange(value){
    setQuarter(value);
    console.log(value)
  }

  function onhalfyearlychange(value){
    setHalfyearly(value);
    console.log(value)
  }
  const updatedata = (id) =>{
    setUpdateid(id);
    setModalopen(true);
}
const handleEyeClick = () => {
    setIsAddBusOpen(true);
  };
 
//calculate minor accident percentage 
  const MinorAccident =  minorCount > 0 
  ? (minorCount*10000/distance).toFixed(2) : 0;
 
console.log(MinorAccident)
 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
   Safety of Operation
      </Typography>
      
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{marginRight:"10px",color:"#678cdc",fontWeight:'600'}}>
            Filter By :  
        </div>
        <div style={{backgroundColor:"white",marginRight:"10px",borderRadius:"4px"}}>
        <TextField
          style={{ width: '200px', margin: '10px',background:"white" }}
          id="standard-basic"
          label="Select Filter"
          variant="outlined"
          select
          name="filter"
          value={filtervalue}
          onChange={(e)=>changeFiltervalue(e.target.value)}
          required
        >
            {/* <MenuItem key={1} value="buswise">
              Bus Wise
            </MenuItem> */}
            <MenuItem key={1} value="monthwise">
              Month Wise
            </MenuItem>
            {/* <MenuItem key={3} value="quarterly">
              Quarterly
            </MenuItem>
            <MenuItem key={4} value="halfyearly">
              Half Yearly
            </MenuItem> */}
            </TextField>
        </div>
      </div>
      </div>
     
     
    {filtervalue==='buswise'?
     <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <TextField
  style={{ width: '200px', marginRight: '10px' }}
  id="standard-basic"
  label="Select Bus No."
  variant="outlined"
  select
  name="regno"
  value={regno}
  onChange={(e) => setRegNo(e.target.value)}
  required
  SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: '200px', 
        },
      },
    },
  }}
>
  {busdetails.map((option) => (
    <MenuItem key={option.regno} value={option.regno}>
      {option.regno}
    </MenuItem>
  ))}
</TextField>
        <input
          type="date"
          style={{
            outlineColor: 'blue',
            borderColor: 'lightgrey',
            height: '58px',
            width: '170px',
            borderRadius: '5px',
            paddingLeft: '10px',
          }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
          Search
        </button>
        {/* {loading && <p>Loading...</p>} */}
      </Box>:
      filtervalue==='monthwise'?
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
       <TextField
          id="outlined-select-currency"
          select
          label="Month"
          value={month}
          onChange={(e)=>onmonthchange(e.target.value)}
          required={true}
          variant="filled"
          

          sx={{
            '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
            '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
              color:"black"
            },
            '& .css-1wc848c-MuiFormHelperText-root':{
              color:"black"
            },
            '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
          }}
        >
              {allmonths.map((option) => (
                
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        
        </TextField>
        <TextField
  id="outlined-select-currency"
  select
  label="Year"
  value={year}
  onChange={(e) => setYear(e.target.value)}
  required={true}
  variant="filled"
  sx={{
    '& > :not(style)': { width: '25ch', marginRight: "20px", textAlign: "left !important" },
    '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
      color: "black"
    },
    '& .css-1wc848c-MuiFormHelperText-root': {
      color: "black"
    },
    '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root': { color: "black" }
  }}
>
<MenuItem value="2023">2023</MenuItem>
<MenuItem value="2024">2024</MenuItem>
</TextField>
        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
          Search
        </button>
        {/* {loading && <p>Loading...</p>} */}
      </Box>:
      filtervalue==="quarterly"?
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <TextField
         id="outlined-select-currency"
         select
         label="Quarter"
         value={quarter}
         onChange={(e)=>onquarterchange(e.target.value)}
         required={true}
         variant="filled"
         

         sx={{
           '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
           '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
             color:"black"
           },
           '& .css-1wc848c-MuiFormHelperText-root':{
             color:"black"
           },
           '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
         }}
       >
             {allquarters.map((option) => (
               
           <MenuItem key={option.key} value={option.value}>
             {option.key}
           </MenuItem>
         ))}
       
       </TextField>

       <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
         Search
       </button>
       {/* {loading && <p>Loading...</p>} */}
     </Box>:
     filtervalue==="halfyearly"?
     <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <TextField
         id="outlined-select-currency"
         select
         label="Half Yearly"
         value={halfyearly}
         onChange={(e)=>onhalfyearlychange(e.target.value)}
         required={true}
         variant="filled"
         

         sx={{
           '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
           '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
             color:"black"
           },
           '& .css-1wc848c-MuiFormHelperText-root':{
             color:"black"
           },
           '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
         }}
       >
             {allhalfyearly.map((option) => (
               
           <MenuItem key={option.key} value={option.value}>
             {option.key}
           </MenuItem>
         ))}
       
       </TextField>

       <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
         Search
       </button>
       {/* {loading && <p>Loading...</p>} */}
     </Box>:""

  }
  {aftersearch && (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
    {/* Minor Accident Table */}
 {/* Minor Accident Table */}
<div style={{ width: '48%' }}>
  <Typography variant="h6" gutterBottom>
    Minor Accidents
  </Typography>
  <table className="accident-table">
    <thead>
      <tr>
        <th>Depot Code</th>
        <th>Trip No.</th>
        <th>Lot No.</th>
        <th>Incident</th>
        <th>Exact Location</th>
        <th>Exact Time</th>
        <th>Remarks</th>
      </tr>
    </thead>
    <tbody>
      {minorIncidents.map((incident, index) => (
        <tr key={index}>
          <td>{incident.depotCode}</td>
          <td>{incident.tripNo}</td>
          <td>{incident.lotno}</td>
          <td>{incident.incident}</td>
          <td>{incident.exactLocation}</td>
          <td>{incident.exactTime}</td>
          <td>{incident.remarks}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <p>{MinorAccident<=0.01?
           <button onClick={()=>handleButtonClick("minoraccident","penalty")} style={{padding:"10px",backgroundColor:"maroon",color:"white"}}>
             Action </button>:MinorAccident>0.01?<button onClick={()=>handleButtonClick("minoraccident","incentive")} 
             style={{padding:"10px",backgroundColor:"lightgreen",color:"white"}}>
             Incentive </button>:""}</p>
</div>


    {/* Major Accident Table */}
    <div style={{ width: '48%' }}>
      <Typography variant="h6" gutterBottom>
        Major Accidents
      </Typography>
     
  <table className="accident-table">
    <thead>
      <tr>
      <th>Depot Code</th>
        <th>Trip No.</th>
        <th>Lot No.</th>
        <th>Incident</th>
        <th>Exact Location</th>
        <th>Exact Time</th>
        <th>Remarks</th>
      </tr>
    </thead>
    <tbody>
      {majorIncidents.map((incident, index) => (
        <tr key={index}>
            <td>{incident.depotCode}</td>
          <td>{incident.tripNo}</td>
          <td>{incident.lotno}</td>
          <td>{incident.incident}</td>
          <td>{incident.exactLocation}</td>
          <td>{incident.exactTime}</td>
          <td>{incident.remarks}</td>
        </tr>
      ))}
    </tbody>
  </table>
  {/* <p>{tripFrequency<=93?
           <button onClick={()=>handleButtonClick("tripfrequency","penalty")} style={{padding:"10px",backgroundColor:"maroon",color:"white"}}>
             Action </button>:tripFrequency>=95?<button onClick={()=>handleButtonClick("tripfrequency","incentive")} style={{padding:"10px",backgroundColor:"lightgreen",color:"white"}}>
             Incentive </button>:""}</p> */}
            
             {isAddBusOpen?typeformodal==="penalty"?
  <Addbus open onClose={() => setIsAddBusOpen(false)} 
  from="Major"
 
  timeformodal={timeformodal}
/>:<AddBusIncentive open onClose={() => setIsAddBusOpen(false)} 
    from="Major"
    // buskmfrequencyper={BusKMsFrequency}
    // frequencyper={tripFrequency} 
    timeformodal={timeformodal}
    />:""
} 
    </div>

    {/* Add styling for the tables */}
    <style jsx>{`
      .accident-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      .accident-table th, .accident-table td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      .accident-table th {
        background-color: #f2f2f2;
      }
      .accident-table tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      .accident-table tbody tr:hover {
        background-color: #ddd;
      }
    `}</style>
  </div>
)}



     </div>
   );
 }
export default SafetyOperation;

