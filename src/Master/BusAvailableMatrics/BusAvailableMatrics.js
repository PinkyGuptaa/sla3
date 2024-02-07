import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Bus_service from '../../Services/Bus_service';
import Select from 'react-select';
import Busavailability_service from '../../Services/Busavailability_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';

function Busavailablematrics(props) {
  const [regno, setRegNo] = useState('');
  const [busdetails, setBusDetails] = useState([]);
  const [allbuslist,setAllbuslist] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filtervalue,setFiltervalue] = useState('monthwise');
  const [month,setMonth] = useState('');
  const [quarter,setQuarter] = useState('');
  const [halfyearly,setHalfyearly] = useState("");
  const [yearly,setYearly] = useState("");
  const [aftersearch,setAfterseacrch] = useState(false);
  const [checktabledata,setChecktabledata] = useState(false);
  // const allmonths = [{key:"January",value:"2023-01-01_2023-01-31"},{key:"February",value:"2023-02-01_2023-02-28"},{key:"March",value:"2023-03-01_2023-03-31"},{key:"April",value:"2023-04-01_2023-04-30"},{key:"May",value:"2023-05-01_2023-05-31"},{key:"June",value:"2023-06-01_2023-06-30"},{key:"July",value:"2023-07-01_2023-07-31"},{key:"August",value:"2023-08-01_2023-08-31"},{key:"September",value:"2023-09-01_2023-09-30"},{key:"October",value:"2023-10-01_2023-10-31"},{key:"November",value:"2023-11-01_2023-11-30"},{key:"December",value:"2023-12-01_2023-12-31"}];
  const allmonths = [{key:"January",value:"01-01_01-31"},{key:"February",value:"02-01_02-28"},{key:"March",value:"03-01_03-31"},{key:"April",value:"04-01_04-30"},{key:"May",value:"05-01_05-31"},{key:"June",value:"06-01_06-30"},{key:"July",value:"07-01_07-31"},{key:"August",value:"08-01_08-31"},{key:"September",value:"09-01_09-30"},{key:"October",value:"10-01_10-31"},{key:"November",value:"11-01_11-30"},{key:"December",value:"12-01_12-31"}];

  const allquarters = [{key:"First Quarter",value:"2023-01-01_2023-03-31"},{key:"Second Quarter",value:"2023-04-01_2023-06-30"},{key:"Third Quarter",value:"2023-07-01_2023-09-30"},{key:"Forth Quarter",value:"2023-10-01_2023-12-31"}];
  const allhalfyearly = [{key:"First Half",value:"2023-01-01_2023-06-30"},{key:"Second Half",value:"2023-07-01_2023-12-31"}];
  const allyearly = [{key:"2023",value:"2023-01-01_2023-12-31"},{key:"2024",value:"2024-01-01_2024-12-31"}];
    
  const [reportDetails, setReportDetails] = useState({
    countWayBillTrips: 0,
    countWayBillTripsWhereTimeIsNotZero: 0,
    wayBillTripsList: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeformodal,setTimeformodal] = useState("");
  const [typeformodal,setTypeformodal] = useState("");
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [year, setYear] = useState('');

  const styles = {
      
    valueContainer: (css) => ({
      ...css,
      ...{ width: "200px",
         textAlign:"left !important" }
    })
  };

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
    Busavailability_service.getAllbusbypto(props.pto).then((res)=>{
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

//   useEffect(() => {
//     Bus_service.getAllBus()
//       .then((res) => {
//         setBusDetails(res.data);
//       })
//       .catch((err) => console.log(err));

//       Busavailability_service.getAllbusavailable().then((res)=>{
//         setAllbuslist(res.data);
//         console.log(res.data)
//       })
//   }, []);

  const changeFiltervalue = (e)=>{
    setFiltervalue(e);
    setReportDetails({
        countWayBillTrips: 0,
        countWayBillTripsWhereTimeIsNotZero: 0,
        wayBillTripsList: [],
      });
      setAfterseacrch(false);
  }

  const handleGenerateReport = async () => {
    setLoading(true);
   console.log(regno)
    if(filtervalue==="buswise"){
      await Busavailability_service.buswisedata(regno).then((res)=>{
            setReportDetails({
                countWayBillTrips: res.data.count,
                countWayBillTripsWhereTimeIsNotZero: 0,
                wayBillTripsList: res.data.records,
              });
              res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
              console.log(regno,res.data)
              setLoading(false);
        }).catch((err)=>{
            console.log(err)
            setLoading(false);
        })
    }
    else if(filtervalue==='monthwise' || filtervalue==='quarterly' || filtervalue==='halfyearly' || filtervalue==='yearly'){
        let datearray = filtervalue==='monthwise'?month.split('_'):filtervalue==='quarterly'?quarter.split('_'):filtervalue==='halfyearly'?halfyearly.split('_'):yearly.split('_');
        if (month && year) {
          let startDate = `${year}-${month.split('_')[0]}`;
          let endDate = `${year}-${month.split('_')[1]}`;
          console.log(startDate,endDate,year,month.split('_')[0]);
        if(Boolean(props.pto)){
            await Busavailability_service.datewisedatapto(startDate, endDate,props.pto).then((res)=>{
                setReportDetails({
                    countWayBillTrips: res.data.count,
                    countWayBillTripsWhereTimeIsNotZero: 0,
                    wayBillTripsList: res.data.records,
                  });
                  res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
                  console.log(regno,res.data,"withpto")
                  setLoading(false);
                  setAfterseacrch(true);
            }).catch((err)=>{
                console.log(err)
                setLoading(false);
                setAfterseacrch(false);
            })    
        }
        else {

        await Busavailability_service.datewisedata(startDate, endDate).then((res)=>{
            setReportDetails({
                countWayBillTrips: res.data.count,
                countWayBillTripsWhereTimeIsNotZero: 0,
                wayBillTripsList: res.data.records,
              });
              res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
              console.log(regno,res.data)
              setLoading(false);
              setAfterseacrch(true);
        }).catch((err)=>{
            console.log(err)
            setLoading(false);
            setAfterseacrch(false);
        })
    }
    }else {
        setError('Please select both Month and Year');
      }
    
    }


    // try {
    //   if (regno && selectedDate) {
    //     const apiUrl = `http://10.226.33.131:9000/waybilltrip/getData/${regno}/${selectedDate}`;
    //     const response = await fetch(apiUrl, {
    //       method: 'GET',
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to fetch data');
    //     }

    //     const data = await response.json();
    //     setReportDetails({
    //       countWayBillTrips: data.countWayBillTrips,
    //       countWayBillTripsWhereTimeIsNotZero: data.countWayBillTripsWhereTimeIsNotZero,
    //       wayBillTripsList: data.wayBillTripsList,
    //     });
    //   } else {
    //     setError('Please select both Registration No. and Date');
    //   }
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };
  const handleButtonClick = (type) => {
    setIsAddBusOpen(true);
    setTypeformodal(type);
  };
  const handleChangeforbus = (e)=>{
    setRegNo(e.value);
  }

  function onmonthchange(value){
    setMonth(value);
    console.log(value)
    console.log(value.split('_'))
    setAfterseacrch(false);
    // setReportflag(false);
    // setSelectedeffortdetails([]);
  }

  function onquarterchange(value){
    setQuarter(value);
    console.log(value)
    setAfterseacrch(false);
  }

  function onhalfyearlychange(value){
    setHalfyearly(value);
    console.log(value)
    setAfterseacrch(false);
  }

  function onyearlychange(value){
    setYearly(value);
    console.log(value)
    setAfterseacrch(false);
  }
  // console.log((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips)))

  // console.log(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
        
      <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
        Bus Available Matrix
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
            <MenuItem key={2} value="monthwise">
              Month Wise
            </MenuItem>
            {/* <MenuItem key={3} value="quarterly">
              Quarterly
            </MenuItem>
            <MenuItem key={4} value="halfyearly">
              Half Yearly
            </MenuItem>
            <MenuItem key={5} value="yearly">
              Yearly
            </MenuItem> */}
            </TextField>
        </div>
      </div>
      </div>
     {filtervalue==='buswise'?
     <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        {/* <TextField
          style={{ width: '200px', marginRight: '10px' }}
          id="standard-basic"
          label="Select Bus No."
          variant="outlined"
          select
          name="regno"
          value={regno}
          onChange={(e) => setRegNo(e.target.value)}
          required
        >
          {busdetails.map((option) => (
            <MenuItem key={option.regno} value={option.regno}>
              {option.regno}
            </MenuItem>
          ))}
        </TextField> */}

        <Select
        className="basic-single"
        classNamePrefix="select"
        onChange={handleChangeforbus}
        placeholder=" Select Bus"
        isSearchable
        name="color"
        options={allbuslist}
        styles={styles}
      />

      

        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
          Search
        </button>
        {loading && <p>Loading...</p>}
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
       {Boolean(month) && Boolean(year)?<button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600',cursor:"pointer" }}>
          Search
        </button>:""}
        {loading && <p>Loading...</p>}
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
       {loading && <p>Loading...</p>}
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
       {loading && <p>Loading...</p>}
     </Box>:
      filtervalue==="yearly"?
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
       <TextField
          id="outlined-select-currency"
          select
          label="Yearly"
          value={yearly}
          onChange={(e)=>onyearlychange(e.target.value)}
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
              {allyearly.map((option) => (
                
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        
        </TextField>
 
        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
          Search
        </button>
        {loading && <p>Loading...</p>}
      </Box>:""

    } 

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  {/* <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
  <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
    Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
  </p> */}

{
  aftersearch?<>
           <p>Total Buses : {allbuslist.length}</p>  
           <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Inactive Buses: {reportDetails.countWayBillTrips}</p>
           <p >Availability Percentage : 
            {(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} 
            </p>
           <p style={{marginLeft : '50px', marginRight: '50px' }}>
            {(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)<=94?
           <button onClick={()=>handleButtonClick("penalty")} style={{padding:"10px",backgroundColor:"maroon",color:"white",cursor:"pointer"}}> Penalty </button>:
           (((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)>=96?
           <button onClick={()=>handleButtonClick("incentive")} style={{padding:"10px",backgroundColor:"#188718",color:"white",cursor:"pointer"}}> Incentive </button>:""}</p>
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
  </table>:reportDetails.wayBillTripsList.length==0 && checktabledata?
  <div>
    No Data Available
  </div>:""
}


{
  isAddBusOpen?typeformodal==="penalty"?
  <Addbus open onClose={() => setIsAddBusOpen(false)} from="Availability" availableper={(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)}

/>:<AddBusIncentive open onClose={() => setIsAddBusOpen(false)} 
  // startpunper={startpunctuality()} arrivalpunper={arrivalpunctuality()}
    from="Availability" availableper={(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} />:""
}

    </div>
  );
}

export default Busavailablematrics;