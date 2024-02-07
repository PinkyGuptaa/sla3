import { Box, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Bus_service from '../../Services/Bus_service';
import Select from 'react-select';
import Busavailability_service from '../../Services/Busavailability_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
function Busdetails (props){
    const [radioselected,setRadioselected] = useState("Schedule");
    const [regno,setRegNo] = useState("");
    const [allbuslist,setAllbuslist] = useState([]);
    const [aftersearch,setAfterseacrch] = useState(false);
    const [loading,setLoading] = useState(false)
    const [busdetails, setBusDetails] = useState([]);
    const [allbusdetails, setAllBusDetails] = useState([]);
     const [unavailablebus, setUnavailablebus] = useState([]);
    const [checktabledata,setChecktabledata] = useState(false);
    const [breakdownFactor, setBreakdownFactor] = useState(0);
    const [month,setMonth] = useState("")
    // const allmonths = [{key:"January",value:"2023-01-01_2023-01-31"},{key:"February",value:"2023-02-01_2023-02-28"},{key:"March",value:"2023-03-01_2023-03-31"},{key:"April",value:"2023-04-01_2023-04-30"},{key:"May",value:"2023-05-01_2023-05-31"},{key:"June",value:"2023-06-01_2023-06-30"},{key:"July",value:"2023-07-01_2023-07-31"},{key:"August",value:"2023-08-01_2023-08-31"},{key:"September",value:"2023-09-01_2023-09-30"},{key:"October",value:"2023-10-01_2023-10-31"},{key:"November",value:"2023-11-01_2023-11-30"},{key:"December",value:"2023-12-01_2023-12-31"}];
    const allmonths = [{key:"January",value:"01-01_01-31"},{key:"February",value:"02-01_02-28"},{key:"March",value:"03-01_03-31"},{key:"April",value:"04-01_04-30"},{key:"May",value:"05-01_05-31"},{key:"June",value:"06-01_06-30"},{key:"July",value:"07-01_07-31"},{key:"August",value:"08-01_08-31"},{key:"September",value:"09-01_09-30"},{key:"October",value:"10-01_10-31"},{key:"November",value:"11-01_11-30"},{key:"December",value:"12-01_12-31"}];
 const [year, setYear] = useState('');
    const [reportDetails, setReportDetails] = useState({
        countWayBillTrips: 0,
        countWayBillTripsWhereTimeIsNotZero: 0,
        wayBillTripsList: [],
      });
      const [isAddBusOpen, setIsAddBusOpen] = useState(false);
      const [error, setError] = useState(null);
    useEffect(()=>{
        console.log(props.pto)
        setReportDetails({
         countWayBillTrips: 0,
         countWayBillTripsWhereTimeIsNotZero: 0,
         wayBillTripsList: [],
       });
       setAfterseacrch(false)
        if(Boolean(props.pto)){
         console.log("props present")
         Bus_service.getAllbusbypto(props.pto).then((res)=>{
             let arr1 = [];
             let d1= res.data;
             d1.map((data)=>{
                 var obj1 = {"value":data.regno,"label":data.regno};
                 arr1.push(obj1);
             })
             setAllbuslist(arr1);
           console.log(arr1);
         }).catch((err)=>{
             console.log(err)
         })
        }
        else {
         Bus_service.getAllBus()
         .then((res) => {
             let arr = [];
             let d= res.data;
             d.map((data)=>{
                 var obj = {"value":data.regno,"label":data.regno};
                 arr.push(obj);
             })
             setAllbuslist(arr);
           console.log(arr);
         })
         .catch((err) => console.log(err));
        }
       },[props.pto])

       const handleGenerateReport = async () => {
        setLoading(true);
        if(radioselected==="Schedule"){
        //   let dateArray = filtervalue === 'buswise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
        let dateArray = month.split('_');
        if (month && year) {
          let startDate = `${year}-${month.split('_')[0]}`;
          let endDate = `${year}-${month.split('_')[1]}`;
          console.log(startDate,endDate,year,month.split('_')[0]);
          // await Bus_service.getdatabybusnodate(regno,dateArray[0], dateArray[1]).then((res)=>{
            await Bus_service.getdatabybusnodate(regno,startDate, endDate).then((res)=>{
  
          console.log(res)
                setReportDetails({
                  countWayBillTrips: res.data.countWayBillTrips,
                          countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
                          wayBillTripsList: res.data.wayBillTripsList,
                  });
                  // res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
                  // console.log(regno,res.data)
                  setLoading(false);
                  setAfterseacrch(true)
            }).catch((err)=>{
                console.log(err)
                setLoading(false);
                setAfterseacrch(false)
            })
          }else {
            setError('Please select both Month and Year');
          }
        }
        else  if(radioselected==="Availability"){
            //   let dateArray = filtervalue === 'buswise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
            let dateArray = month.split('_');
            if (month && year) {
              let startDate = `${year}-${month.split('_')[0]}`;
              let endDate = `${year}-${month.split('_')[1]}`;
              console.log(startDate,endDate,year,month.split('_')[0]);
              await Busavailability_service.busdatewisedata(regno,startDate, endDate).then((res)=>{

              // await Busavailability_service.busdatewisedata(regno,dateArray[0], dateArray[1]).then((res)=>{
                console.log(res)
                setReportDetails({
                    countWayBillTrips: res.data.count,
                    countWayBillTripsWhereTimeIsNotZero: 0,
                    wayBillTripsList: res.data.records,
                  });
                       res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
                      // console.log(regno,res.data)
                      setLoading(false);
                      setAfterseacrch(true)
                }).catch((err)=>{
                    console.log(err)
                    setLoading(false);
                    setAfterseacrch(false)
                })
              }else {
                setError('Please select both Month and Year');
              }
            }
            else  if(radioselected==="Breakdown"){
                //   let dateArray = filtervalue === 'buswise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
                let dateArray = month.split('_');
                if (month && year) {
                  let startDate = `${year}-${month.split('_')[0]}`;
                  let endDate = `${year}-${month.split('_')[1]}`;
                  console.log(startDate,endDate,year,month.split('_')[0]);
               
                  await Busavailability_service.busdatewisedatabreakdown(regno,startDate, endDate).then((res)=>{
                    let unavailableBuses = 1;
                    setUnavailablebus(unavailableBuses)
                  console.log(res.data)
                  
                    const totalCoveredDistance = res.data[0]?.totalCoveredDistance;
                    const calculatedBreakdownFactor =  parseFloat((unavailableBuses * 10000) / totalCoveredDistance).toFixed(3);
                    setBreakdownFactor(parseFloat(calculatedBreakdownFactor));
                    console.log(calculatedBreakdownFactor)
                    // setReportDetails({
                    //   countWayBillTrips: res.data.countWayBillTrips,
                    //   countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
                    //   wayBillTripsList: res.data.wayBillTripsList,
                    // });
                setAllBusDetails(res.data)
          // setUnavailableBuses(res.data[0].count);
          
          console.log(unavailableBuses);
                console.log(allbusdetails)
                setAfterseacrch(true); 
                    setLoading(false);
                    }).catch((err)=>{
                        console.log(err)
                        setLoading(false);
                        setAfterseacrch(false)
                    })
                }

              }else {
                setError('Please select both Month and Year');
              }
        
    
          
      }

      function onmonthchange(value){
        setMonth(value);
        // console.log(value)
        // console.log(value.split('_'))
        setAfterseacrch(false)
        // setReportflag(false);
        // setSelectedeffortdetails([]);
      }

    function handleradiochange(e){
        setRadioselected(e.target.value);
        console.log(e.target.value)
        setReportDetails({
            countWayBillTrips: 0,
                    countWayBillTripsWhereTimeIsNotZero: 0,
                    wayBillTripsList: [],
            });
           
            setLoading(false);
            setAfterseacrch(false)
            setChecktabledata(false)
    }
    const handleButtonClick = () => {
      setIsAddBusOpen(true);
    };
    const handleButtonClickIncentive = () => {
      setIsAddBusOpen(true);
    };
  return (  
  <div style={{ display: 'flex',flexDirection:"column", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
        
      <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
        Bus Details
      </Typography>
      </div>

      <Box style={{ display: 'flex',flexDirection:"column", alignItems: 'center', marginTop: '20px' }}>
       
       <div style={{display:'flex'}}>
       <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={radioselected}
        onChange = {handleradiochange}
      >
        <FormControlLabel value="Schedule" control={<Radio />} label="Schedule" />
        <FormControlLabel value="Breakdown" control={<Radio />} label="Breakdown" />
        <FormControlLabel value="Availability" control={<Radio />} label="Availability" />
        <FormControlLabel value="Frequency" control={<Radio />} label="Frequency" />
        <FormControlLabel value="Safety of Operation" control={<Radio />} label="Safety of Operation" />
      </RadioGroup>
    </FormControl>
       </div>

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
  {allbuslist.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.value}
    </MenuItem>
  ))}
</TextField>

        
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
        {
        Boolean(regno) && Boolean(month) && Boolean(year)?<button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600',cursor:"pointer" }}>
          Search
        </button>:""
            }
        </Box>

       {
        radioselected  === 'Schedule'?
        <>
        {/* <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
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
  {allbuslist.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.value}
    </MenuItem>
  ))}
</TextField>

        
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

        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600',cursor:"pointer" }}>
          Search
        </button>
        </Box> */}
        
        <Box style={{ display: 'flex',flexDirection:"column", alignItems: 'center', marginTop: '20px' }} >
        {aftersearch?
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
  <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
    Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
  </p>
</div>:"" 
        }

        {reportDetails.wayBillTripsList && reportDetails.wayBillTripsList.length > 0 && (
  
  <table className="report-table">
    <thead>
      <tr>
    
        
        {/* <th>Route Name</th> */}
        {/* <th>Conductor Name</th> */}
        <th>Driver Id</th>
        <th>Conductor Id</th>
       <th>Bus No.</th>
               {/* <th>waybillNo</th> */}
        <th>From Stop</th>
        <th>To Stop</th>
        <th>ETA From Stop</th>
        <th>ATA From Stop</th>
        <th>From Time Difference</th>
        <th>ETA To Stop</th>
        <th>ATA To Stop</th>
        {/* <th>Actual Distance</th> */}
        <th>To Time Difference</th>
        {/* <th>Trip Income</th> */}
        {/* <th>Action</th> */}
        {/* <th>busNo</th> */}
     
      </tr>
    </thead>
    <tbody>
      {reportDetails.wayBillTripsList.map((item, index) => (
        <tr key={index}>
  
          {/* <td>{item.routeName}</td> */}
          {/* <td>{item.conductorName}</td> */}
          <td>{item.driverId}</td>
          <td>{item.conductorId}</td>
        <td>{item.busNo}</td>
          {/* <td>{item.waybillNo}</td> */}
          <td>{item.fromStop}</td>
          <td>{item.toStop}</td>
          <td>{item.etaFromStop.slice(0, 5)}</td>
          <td>{item.ataFromStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeFromMinute>5?"#ed6e6e9c":""}}>{item.diffTimeFrom.slice(0, 5) }</td>
          <td>{item.etaToStop.slice(0, 5)}</td>
          <td>{item.ataToStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeToMinute>15?"#ebb990":""}}>{item.diffTimeTo.slice(0, 5)}</td>
          {/* <td>{item.actualDistance}</td> */}
          {/* <td>{item.tripIncome}</td> */}
         
         
        
  
        </tr>
      ))}
    </tbody>
  </table>
)}

        
      </Box>
        </>:
        radioselected === 'Availability'?
        <>
         

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  {/* <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
  <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
    Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
  </p> */}

{
  aftersearch?<>
           {/* <p>Total Buses : {allbuslist.length}</p>   */}
           <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Inactive Count: {reportDetails.countWayBillTrips}</p>
           <p style={{marginLeft : '50px', marginRight: '50px' }} >Availabilty Percentage : {(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} </p>
           {/* <p>{(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)<95?<button style={{padding:"10px",backgroundColor:"maroon",color:"white"}}> Action </button>:""}</p> */}
  </>:""
}

</div>


      {reportDetails.wayBillTripsList.length > 0 ? 
  <table className="report-table">
    <thead>
      <tr>
    
        
        {/* <th>Route Name</th> */}
        {/* <th>Conductor Name</th> */}
        <th>Reg No.</th>
        <th>Reg Date</th>
        {/* <th>waybillNo</th> */}
        <th>Inactive Date</th>
        <th>Fuel Type</th>
       
        {/* <th>Action</th> */}
        {/* <th>busNo</th> */}
     
      </tr>
    </thead>
    <tbody>
      {reportDetails.wayBillTripsList.map((item, index) => (
        <tr key={index}>
  
          {/* <td>{item.routeName}</td> */}
          {/* <td>{item.conductorName}</td> */}
          <td>{item.regnNo}</td>
          <td>{item.regnDt}</td>
          {/* <td>{item.waybillNo}</td> */}
          <td>{item.inactiveDt}</td>
          <td>{item.fuelType}</td>
          
          {/* <td>
            <button onClick={() => window.location.href = '/performancematrics'}>View Performance</button>
        </td> */}
        
     
          
        </tr>
      ))}
    </tbody>
  </table>:reportDetails.wayBillTripsList.length==0 && checktabledata?"":""
  // <div>
  //   No Data Available
  // </div>:""
}
        </>:
        radioselected === "Breakdown"?
        <>
         {/* <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
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
  {allbuslist.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.value}
    </MenuItem>
  ))}
</TextField>

        
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
        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600',cursor:"pointer" }}>
          Search
        </button>
        </Box> */}

        {
            aftersearch?allbusdetails.length > 0?
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
      

{/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Number of Unavailable Buses: 1 </p>
 

 
           </div> */}
           <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
           <p style={{marginLeft : '50px', marginRight: '50px' }}>Breakdown Factor = {breakdownFactor} </p>
        
           <p>
  {breakdownFactor > 0.5 ? (
    <button onClick={()=>handleButtonClick()} style={{ padding: '10px', backgroundColor: 'maroon', color: 'white' }}>
      Action
    </button>
  ) : breakdownFactor < 0.5 ? (
    <button onClick={handleButtonClickIncentive} style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
      Incentive
    </button>
  ) : null}
</p>
{isAddBusOpen && (
  <Addbus
    open
    onClose={() => setIsAddBusOpen(false)}
    //  defaultRegNo={selectedRegNo}
  />
)}
      </div>
            </>:
            <div style={{marginTop:"40px"}}>
                No Data Available
            </div>:""
        }

     
        </>:""
       }


      </Box>


      </div>

  )

}

export default Busdetails;