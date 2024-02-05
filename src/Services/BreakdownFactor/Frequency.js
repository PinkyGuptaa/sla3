

import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import { Edit } from '@mui/icons-material';

function Frequency(props) {
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
  const [aftersearch,setAftersearch] = useState(false);

  const allmonths = [{key:"January",value:"2024-01-01_2023-01-31"},{key:"February",value:"2024-02-01_2024-02-28"},{key:"March",value:"2024-03-01_2024-03-31"},{key:"April",value:"2024-04-01_2024-04-30"},{key:"May",value:"2024-05-01_2024-05-31"},{key:"June",value:"2024-06-01_2024-06-30"},{key:"July",value:"2024-07-01_2024-07-31"},{key:"August",value:"2024-08-01_2024-08-31"},{key:"September",value:"2024-09-01_2024-09-30"},{key:"October",value:"2024-10-01_2024-10-31"},{key:"November",value:"2024-11-01_2024-11-30"},{key:"December",value:"2024-12-01_2024-12-31"}];

  const allquarters = [{key:"January-March",value:"2023-01-01_2023-03-31"},{key:"April-June",value:"2023-04-01_2023-06-30"},{key:"July-Sep",value:"2023-07-01_2023-09-30"},{key:"Oct-Dec",value:"2023-10-01_2023-12-31"}];
  const allhalfyearly = [{key:"January-June",value:"2023-01-01_2023-06-30"},{key:"July-December",value:"2023-07-01_2023-12-31"}];
    
 
  const [reportDetails, setReportDetails] = useState({
    countWayBillTrips: 0,
    countWayBillTripsWhereTimeIsNotZero: 0,
    wayBillTripsList: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalopen,setModalopen] = useState(false)
  const [updateid,setUpdateid] = useState('');
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [selectedRegNo, setSelectedRegNo] = useState(''); 

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
  const handleGenerateReport = async () => {
    setLoading(true);
    if(filtervalue==="buswise")
    // {
    //     const data = await Bus_service.getdatabybusnodate(regno,selectedDate).then((res)=>{
    //           setReportDetails({
    //             countWayBillTrips: data.countWayBillTrips,
    //                   countWayBillTripsWhereTimeIsNotZero: data.countWayBillTripsWhereTimeIsNotZero,
    //                   wayBillTripsList: data.wayBillTripsList,
    //             });
    //             console.log(regno,selectedDate,res.data)
    //             setLoading(false);
    //       }).catch((err)=>{
    //           console.log(err)
    //           setLoading(false);
    //       })
    //   }
    
  if (regno && selectedDate) {
 
        const apiUrl = `http://10.226.33.132:9100/busperformance/getData/${regno}/${selectedDate}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setReportDetails({
          countWayBillTrips: data.countWayBillTrips,
          countWayBillTripsWhereTimeIsNotZero: data.countWayBillTripsWhereTimeIsNotZero,
          wayBillTripsList: data.wayBillTripsList,
        });
      } else {
        setError('Please select both Bus No. and Date');
      }

      else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
        let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
      
        try {
          const res = await Bus_service.getAllMergeData(dateArray[0], dateArray[1]);

          let unavailableBuses = res.data[0].count
          setUnavailablebus(unavailableBuses)
          console.log(unavailablebus);
          console.log(res.data[0].count)
          console.log(res.data[1])
          const totalCoveredDistance = allbusdetails.reduce((sum, bus) => sum + bus.totalCoveredDistance, 0);
          const calculatedBreakdownFactor =  parseFloat((unavailableBuses * 10000) / totalCoveredDistance).toFixed(3);
          setBreakdownFactor(parseFloat(calculatedBreakdownFactor));
          console.log(calculatedBreakdownFactor)
          // setReportDetails({
          //   countWayBillTrips: res.data.countWayBillTrips,
          //   countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
          //   wayBillTripsList: res.data.wayBillTripsList,
          // });
      setAllBusDetails(res.data[1])
// setUnavailableBuses(res.data[0].count);

console.log(unavailableBuses);
      console.log(allbusdetails)
      setAftersearch(true); 
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
  };
  const handleChangeforbus = (e)=>{
    setRegNo(e.value);
    setSelectedDate(e.value);
  }
  const handleButtonClick = () => {
    setIsAddBusOpen(true);
  };
  function onmonthchange(value){
    setMonth(value);
    console.log(value)
    console.log(value.split('_'))
    // setReportflag(false);
    // setSelectedeffortdetails([]);
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
  // function calculateDistanceDifference(actualDistance, coveredDistance) {

  //   const difference = actualDistance - coveredDistance;
  //   return difference.toFixed(2); 
  // }


  useEffect(() => {
   
    const calculateBreakdownFactor = () => {
      if (allbusdetails.length > 0) {
        const totalCoveredDistance = allbusdetails.reduce((sum, bus) => sum + bus.totalCoveredDistance, 0);
        const calculatedBreakdownFactor = parseFloat((unavailablebus * 10000) / totalCoveredDistance).toFixed(3);
        setBreakdownFactor(parseFloat(calculatedBreakdownFactor));
      }  
    };


    calculateBreakdownFactor();
  }, [allbusdetails, unavailablebus]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
   Frequency
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
  


{aftersearch && allbusdetails && allbusdetails.length > 0 && (
 
 <>

  
        <table className="report-table">
          <thead>
            <tr>
              <th>Bus No.</th>
              <th>Distance To Cover</th>
              <th>Distance Covered</th>
              <th>Distance Difference</th>
              {/* <th>Breakdown Factor</th> */}
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {allbusdetails.map((bus, index) => (
              <tr key={index}>
                <td>{bus.busNo}</td>
                <td>{bus.totalActualDistance}</td>
                <td>{bus.totalCoveredDistance}</td>
                <td>{bus.totalDifferenceCovered}</td>
                {/* <td>{}</td> */}
                {/* <td>   <Edit style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={handleEyeClick} />
</td> */}
             
              </tr>
            ))}
          <tr>
        <td colSpan="1">Total</td>
        <td>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalActualDistance, 0)}
        </td>
        <td>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalCoveredDistance, 0)}
        </td>
        <td>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalDifferenceCovered, 0)}
        </td>
        {/* <td colSpan="2"></td> */}
      </tr>
    
      
          </tbody>
        </table>
      

<div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Number of Unavailable Buses: {unavailablebus} </p>
 

 
           </div><div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
           <p style={{marginLeft : '50px', marginRight: '50px' }}>Breakdown Factor = {breakdownFactor} </p>
           <p>{breakdownFactor<0.5?
           <button onClick={handleButtonClick} style={{padding:"10px",backgroundColor:"maroon",color:"white"}}>
             Action </button>:""}</p>
      {isAddBusOpen && (
<Addbus open onClose={() => setIsAddBusOpen(false)} 
//  defaultRegNo={selectedRegNo}
/>)}
      </div>
</>
     )}
     </div>
   );
 }
export default Frequency;

