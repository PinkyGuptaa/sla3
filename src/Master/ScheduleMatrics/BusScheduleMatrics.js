
// import { Print, Search } from '@mui/icons-material';
// import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
// import { useState, useRef, useEffect } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import Bus_service from '../../Services/Bus_service';


// function Report(props) {
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [regno, SetRegNo] = useState('');
//     const [busdetails, setbusdetails] = useState([]);
//     const [date, SetDate] = useState('');
//     const [selectedSLAFor, setSelectedSLAFor] = useState('');
//     const [reportDetails, setReportDetails] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const componentRef = useRef();
//     const [showPDF, setShowPDF] = useState(false);
//     const [tripDate, settripDate] = useState(null);

//     const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//     });
//     useEffect(()=>{
//         Bus_service.getAllBus().then((res)=>{
//           setbusdetails(res.data);
//           console.log(res.data)
//         }).catch(err=>console.log(err))
//       },[])

 

//   const handleGenerateReport = async () => {
//     setLoading(true); 
//     try {
//         if (regno && tripDate) {
//           const apiUrl = `http://10.226.33.131:9000/waybill/getData/${regno}/${tripDate}`;
//           const response = await fetch(apiUrl, {
//             method: 'GET',
//             // Other necessary configurations like headers, etc.
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
    
//           const data = await response.json();
//           setReportDetails(data);
//           console.log(data)
//         } else {
//           setError('Please select both Registration No. and Date');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//       <Typography variant="h6" align="center" gutterBottom>
//         Bus Schedule Matrics
//       </Typography>
//       <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        
//  <TextField style={{width: '200px',marginRight: '10px'}} id="standard-basic" 
//       label="Select Bus No." variant="outlined" 
//         select
//       name='regno' value={regno} 
//       onChange={(e)=>SetRegNo(e.target.value)} 
//       required
//         >
            
//           {busdetails.map((option) => (
//             <MenuItem key={option.regno} value={option.regno}>
//               {option.regno}
//             </MenuItem>
//           ))}
//  </TextField>
//  <input type='date'  
//  style={{outlineColor:"blue",borderColor:"lightgrey",
//  height:"58px",width:"170px",
//  borderRadius:"5px",
//  paddingLeft:"10px"}}
//         value={tripDate}
//         onChange={(e) => settripDate(e.target.value)}
//         />

//         <Search style={{marginLeft:'30px'}} variant="contained" onClick={handleGenerateReport}>
//           Search
//         </Search>
//         {loading && <p>Loading...</p>}

       
        
//       </Box>

    
//       <div ref={componentRef}>
        
//       {reportDetails.length > 0 && (
//         <table   className="report-table">
//           <thead>
//             <tr>
//             <th>SL No</th>
//                 <th>SLA</th>
//                 <th>Agency</th>
//                 <th>Remarks</th>
//                 <th>SLA Type</th>
//                 <th>Details</th>
//                 <th>Penalty</th>
//                 <th>Penalty Detail</th>
//                 <th>Quality Type</th>
//                 <th>Complaint</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportDetails.map((item, index) => (
//               <tr key={index}>
//                 <td>{index+1}</td>
//                  <td>{item.slaMaster ? item.slaMaster.sla : 'N/A'}</td>
//                   <td>{item.slaMaster && item.slaMaster.agencyMaster ? item.slaMaster.agencyMaster.agencyname : 'N/A'}</td>
//                   <td>{item.slaMaster ? item.slaMaster.remarks : 'N/A'}</td>
//                   <td>{item.slaMaster && item.slaMaster.slaTypeMaster ? item.slaMaster.slaTypeMaster.slatype : 'N/A'}</td>
//                   <td>{item.slaMaster ? item.slaMaster.details : 'N/A'}</td>
//                   <td>{item.penalty || 'N/A'}</td>
//                   <td>{item.penaltydetail || 'N/A'}</td>
//                   <td>{item.qualityStandardMaster ? item.qualityStandardMaster.qualitytype : 'N/A'}</td>
//                   <td>{item.customerComplaint ? item.customerComplaint.complaint : 'N/A'}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//       )}
     
//     </div>


// {selectedMonth && selectedSLAFor && (
//       <Print variant="contained" onClick={() => {
//         handlePrint();
//         setShowPDF(true);
//       }} style={{ marginLeft: '10px' ,marginTop: '30px'}}>
//                Print 
//             </Print>
//     )}
 
//     </div>
    
//   );
// }
// export default Report;

// import { Box, MenuItem, TextField, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { FaEye } from 'react-icons/fa';
// import Select from 'react-select';
// import Bus_service from '../../Services/Bus_service';
// import Addbus from '../BusPerformanceMetrics/AddBus';
// function BusScheduleMatrics(props) {
//   const [regno, setRegNo] = useState('');
//   const [busdetails, setBusDetails] = useState([]);
//   const [allbuslist,setAllbuslist] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [filtervalue,setFiltervalue] = useState('buswise');
//   const [month,setMonth] = useState('');
//   const [quarter,setQuarter] = useState('');
//   const [halfyearly,setHalfyearly] = useState("")
//   const allmonths = [{key:"January",value:"2023-01-01_2023-01-31"},{key:"February",value:"2023-02-01_2023-02-28"},{key:"March",value:"2023-03-01_2023-03-31"},{key:"April",value:"2023-04-01_2023-04-30"},{key:"May",value:"2023-05-01_2023-05-31"},{key:"June",value:"2023-06-01_2023-06-30"},{key:"July",value:"2023-07-01_2023-07-31"},{key:"August",value:"2023-08-01_2023-08-31"},{key:"September",value:"2023-09-01_2023-09-30"},{key:"October",value:"2023-10-01_2023-10-31"},{key:"November",value:"2023-11-01_2023-11-30"},{key:"December",value:"2023-12-01_2023-12-31"}];

//   const allquarters = [{key:"January-March",value:"2023-01-01_2023-03-31"},{key:"April-June",value:"2023-04-01_2023-06-30"},{key:"July-Sep",value:"2023-07-01_2023-09-30"},{key:"Oct-Dec",value:"2023-10-01_2023-12-31"}];
//   const allhalfyearly = [{key:"January-June",value:"2023-01-01_2023-06-30"},{key:"July-December",value:"2023-07-01_2023-12-31"}];
    
//   const [checktabledata,setChecktabledata] = useState(false);

//   const [reportDetails, setReportDetails] = useState({
//     countWayBillTrips: 0,
//     countWayBillTripsWhereTimeIsNotZero: 0,
//     wayBillTripsList: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [modalopen,setModalopen] = useState(false)
//   const [updateid,setUpdateid] = useState('');
//   const [isAddBusOpen, setIsAddBusOpen] = useState(false);
//   const [selectedRegNo, setSelectedRegNo] = useState(''); // This is the selected regno from your logic

//   const styles = {
      
//     valueContainer: (css) => ({
//       ...css,
//       ...{ width: "200px",
//          textAlign:"left !important" }
//     })
//   };

//   // useEffect(() => {
//   //   Bus_service.getAllBus()
//   //     .then((res) => {
//   //       setBusDetails(res.data);
//   //       // console.log(res.data)
//   //     })
//   //     .catch((err) => console.log(err));
//   // }, []);

//   useEffect(()=>{
//     console.log(props.pto)
//     setReportDetails({
//      countWayBillTrips: 0,
//      countWayBillTripsWhereTimeIsNotZero: 0,
//      wayBillTripsList: [],
//    });
 
//     if(Boolean(props.pto)){
//      console.log("props present")
//      Bus_service.getAllbusbypto(props.pto).then((res)=>{
//          let arr1 = [];
//          let d1= res.data;
//          d1.map((data)=>{
//              var obj1 = {"value":data.regno,"label":data.regno};
//              arr1.push(obj1);
//          })
//          setAllbuslist(arr1);
//        console.log(arr1);
//      }).catch((err)=>{
//          console.log(err)
//      })
//     }
//     else {
//      Bus_service.getAllBus()
//      .then((res) => {
//          let arr = [];
//          let d= res.data;
//          d.map((data)=>{
//              var obj = {"value":data.regno,"label":data.regno};
//              arr.push(obj);
//          })
//          setAllbuslist(arr);
//        console.log(arr);
//      })
//      .catch((err) => console.log(err));
//     }
//    },[props.pto])
   
//   const changeFiltervalue = (e)=>{
//     setFiltervalue(e);
//     setReportDetails({
//         countWayBillTrips: 0,
//         countWayBillTripsWhereTimeIsNotZero: 0,
//         wayBillTripsList: [],
//       });
//   }
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     if(filtervalue==="buswise"){
//       let dateArray = filtervalue === 'buswise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');

//       await Bus_service.getdatabybusnodate(regno,dateArray[0], dateArray[1]).then((res)=>{
//         console.log(res)
//             setReportDetails({
//               countWayBillTrips: res.data.countWayBillTrips,
//                       countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
//                       wayBillTripsList: res.data.wayBillTripsList,
//               });
//               // res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
//               // console.log(regno,res.data)
//               setLoading(false);
//         }).catch((err)=>{
//             console.log(err)
//             setLoading(false);
//         })
//     }
    

//       else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
//         let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
//         if(Boolean(props.pto)){
//         // try {
//           // const res =
//            await Bus_service.datewisedatapto(props.pto,dateArray[0], dateArray[1],).then((res)=>{;
//           console.log(res.data)
//           setReportDetails({
//             countWayBillTrips: res.data.countWayBillTrips,
//             countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
//             wayBillTripsList: res.data.wayBillTripsList,
//           });
//           res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
//           console.log(regno,res.data)
//           setLoading(false);
//     }).catch((err)=>{
//         console.log(err)
//         setLoading(false);
//     })    
//   }

//           // await Bus_service.datewisedata(dateArray[0], dateArray[1]);
//           // console.log(res.data)
//           // setReportDetails({
//           //   countWayBillTrips: res.data.countWayBillTrips,
//           //   countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
//           //   wayBillTripsList: res.data.wayBillTripsList,
//           // });
//           else {

//             await Bus_service.datewisedata(dateArray[0],dateArray[1]).then((res)=>{
//                 setReportDetails({
//                     countWayBillTrips: res.data.countWayBillTrips,
//                     countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
//                     wayBillTripsList: res.data.wayBillTripsList,
//                   });
//                   res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
//                   console.log(regno,res.data)
//           setLoading(false);
//         }).catch((err)=>{
//           console.log(err)
//           setLoading(false);
//       })
//   }
// }
//   }
//   const handleChangeforbus = (e)=>{
//     setRegNo(e.value);
//     setSelectedDate(e.value);
//   }

//   function onmonthchange(value){
//     setMonth(value);
//     console.log(value)
//     console.log(value.split('_'))
//     // setReportflag(false);
//     // setSelectedeffortdetails([]);
//   }

//   function onquarterchange(value){
//     setQuarter(value);
//     console.log(value)
//   }

//   function onhalfyearlychange(value){
//     setHalfyearly(value);
//     console.log(value)
//   }
//   const updatedata = (id) =>{
//     setUpdateid(id);
//     setModalopen(true);
// }
// const handleEyeClick = () => {
//     setIsAddBusOpen(true);
//   };
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//     <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
//     <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
//     Bus Schedule Metrics
//       </Typography>
      
//       <div style={{display:"flex",alignItems:"center"}}>
//         <div style={{marginRight:"10px",color:"#678cdc",fontWeight:'600'}}>
//             Filter By :  
//         </div>
//         <div style={{backgroundColor:"white",marginRight:"10px",borderRadius:"4px"}}>
//         <TextField
//           style={{ width: '200px', margin: '10px',background:"white" }}
//           id="standard-basic"
//           label="Select Filter"
//           variant="outlined"
//           select
//           name="filter"
//           value={filtervalue}
//           onChange={(e)=>changeFiltervalue(e.target.value)}
//           required
//         >
//             <MenuItem key={1} value="buswise">
//               Bus Wise
//             </MenuItem>
//             <MenuItem key={2} value="monthwise">
//               Month Wise
//             </MenuItem>
//             <MenuItem key={3} value="quarterly">
//               Quarterly
//             </MenuItem>
//             <MenuItem key={4} value="halfyearly">
//               Half Yearly
//             </MenuItem>
//             </TextField>
//         </div>
//       </div>
//       </div>
     
//       {/* <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//         <TextField
//           style={{ width: '200px', marginRight: '10px' }}
//           id="standard-basic"
//           label="Select Bus No."
//           variant="outlined"
//           select
//           name="regno"
//           value={regno}
//           onChange={(e) => setRegNo(e.target.value)}
//           required
//         >
//           {busdetails.map((option) => (
//             <MenuItem key={option.regno} value={option.regno}>
//               {option.regno}
//             </MenuItem>
//           ))}
//         </TextField>
//         <input
//           type="date"
//           style={{
//             outlineColor: 'blue',
//             borderColor: 'lightgrey',
//             height: '58px',
//             width: '170px',
//             borderRadius: '5px',
//             paddingLeft: '10px',
//           }}
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />

//         <button onClick={handleGenerateReport} style={{ marginLeft: '30px' }}>
//           Search
//         </button>
//         {loading && <p>Loading...</p>}
//       </Box> */}
//           {filtervalue==='buswise'?
//      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//       <TextField
//   style={{ width: '200px', marginRight: '10px' }}
//   id="standard-basic"
//   label="Select Bus No."
//   variant="outlined"
//   select
//   name="regno"
//   value={regno}
//   onChange={(e) => setRegNo(e.target.value)}
//   required
//   SelectProps={{
//     MenuProps: {
//       PaperProps: {
//         style: {
//           maxHeight: '200px', 
//         },
//       },
//     },
//   }}
// >
//   {allbuslist.map((option) => (
//     <MenuItem key={option.value} value={option.value}>
//       {option.value}
//     </MenuItem>
//   ))}
// </TextField>

//         {/* <input
//           type="date"
//           style={{
//             outlineColor: 'blue',
//             borderColor: 'lightgrey',
//             height: '58px',
//             width: '170px',
//             borderRadius: '5px',
//             paddingLeft: '10px',
//           }}
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         /> */}

// <TextField
//           id="outlined-select-currency"
//           select
//           label="Month"
//           value={month}
//           onChange={(e)=>onmonthchange(e.target.value)}
//           required={true}
//           variant="filled"
          

//           sx={{
//             '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
//             '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
//               color:"black"
//             },
//             '& .css-1wc848c-MuiFormHelperText-root':{
//               color:"black"
//             },
//             '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
//           }}
//         >
//               {allmonths.map((option) => (
                
//             <MenuItem key={option.key} value={option.value}>
//               {option.key}
//             </MenuItem>
//           ))}
        
//         </TextField>
      

//         <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
//           Search
//         </button>
//         {/* {loading && <p>Loading...</p>} */}
//       </Box>:
//       filtervalue==='monthwise'?
//       <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//        <TextField
//           id="outlined-select-currency"
//           select
//           label="Month"
//           value={month}
//           onChange={(e)=>onmonthchange(e.target.value)}
//           required={true}
//           variant="filled"
          

//           sx={{
//             '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
//             '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
//               color:"black"
//             },
//             '& .css-1wc848c-MuiFormHelperText-root':{
//               color:"black"
//             },
//             '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
//           }}
//         >
//               {allmonths.map((option) => (
                
//             <MenuItem key={option.key} value={option.value}>
//               {option.key}
//             </MenuItem>
//           ))}
        
//         </TextField>

//         <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
//           Search
//         </button>
//         {/* {loading && <p>Loading...</p>} */}
//       </Box>:
//       filtervalue==="quarterly"?
//       <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//       <TextField
//          id="outlined-select-currency"
//          select
//          label="Quarter"
//          value={quarter}
//          onChange={(e)=>onquarterchange(e.target.value)}
//          required={true}
//          variant="filled"
         

//          sx={{
//            '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
//            '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
//              color:"black"
//            },
//            '& .css-1wc848c-MuiFormHelperText-root':{
//              color:"black"
//            },
//            '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
//          }}
//        >
//              {allquarters.map((option) => (
               
//            <MenuItem key={option.key} value={option.value}>
//              {option.key}
//            </MenuItem>
//          ))}
       
//        </TextField>

//        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
//          Search
//        </button>
//        {/* {loading && <p>Loading...</p>} */}
//      </Box>:
//      filtervalue==="halfyearly"?
//      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//       <TextField
//          id="outlined-select-currency"
//          select
//          label="Half Yearly"
//          value={halfyearly}
//          onChange={(e)=>onhalfyearlychange(e.target.value)}
//          required={true}
//          variant="filled"
         

//          sx={{
//            '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
//            '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
//              color:"black"
//            },
//            '& .css-1wc848c-MuiFormHelperText-root':{
//              color:"black"
//            },
//            '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"black"}
//          }}
//        >
//              {allhalfyearly.map((option) => (
               
//            <MenuItem key={option.key} value={option.value}>
//              {option.key}
//            </MenuItem>
//          ))}
       
//        </TextField>

//        <button onClick={handleGenerateReport} style={{ marginLeft: '30px',padding:"15px",background:"#136a8a",color:"white",borderRadius:"5px",fontWeight:'600' }}>
//          Search
//        </button>
//        {/* {loading && <p>Loading...</p>} */}
//      </Box>:""

//     } 
//       <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//   <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
//   <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
//     Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
//   </p>
// </div>


// {reportDetails.wayBillTripsList && reportDetails.wayBillTripsList.length > 0 && (
  
//   <table className="report-table">
//     <thead>
//       <tr>
    
        
//         {/* <th>Route Name</th> */}
//         {/* <th>Conductor Name</th> */}
//         <th>Driver Id</th>
//         <th>Conductor Id</th>
//         {filtervalue === 'monthwise' && <th>Bus No.</th>}
//         {/* <th>waybillNo</th> */}
//         <th>From Stop</th>
//         <th>To Stop</th>
//         <th>ETA From Stop</th>
//         <th>ATA From Stop</th>
//         <th>From Time Difference</th>
//         <th>ETA To Stop</th>
//         <th>ATA To Stop</th>
//         {/* <th>Actual Distance</th> */}
//         <th>To Time Difference</th>
//         {/* <th>Trip Income</th> */}
        
    
//         {/* <th>Action</th> */}
//         {/* <th>busNo</th> */}
     
//       </tr>
//     </thead>
//     <tbody>
//       {reportDetails.wayBillTripsList.map((item, index) => (
//         <tr key={index}>
  
//           {/* <td>{item.routeName}</td> */}
//           {/* <td>{item.conductorName}</td> */}
//           <td>{item.driverId}</td>
//           <td>{item.conductorId}</td>
//           {filtervalue === 'monthwise' && <td>{item.busNo}</td>}
//           {/* <td>{item.waybillNo}</td> */}
//           <td>{item.fromStop}</td>
//           <td>{item.toStop}</td>
//           <td>{item.etaFromStop.slice(0, 5)}</td>
//           <td>{item.ataFromStop.slice(0, 5)}</td>
//           <td>{item.diffTimeFrom.slice(0, 5)}</td>
//           <td>{item.etaToStop.slice(0, 5)}</td>
//           <td>{item.ataToStop.slice(0, 5)}</td>
//           <td>{item.diffTimeTo.slice(0, 5)}</td>
//           {/* <td>{item.actualDistance}</td> */}
//           {/* <td>{item.tripIncome}</td> */}
         
         
//           {/* <td> */}
//   {/* <FaEye
//     onClick={() => updatedata(item.id)}
//     style={{ cursor: 'pointer', color: 'black', marginLeft: '20px' }}
//   /> */}
//    {/* <FaEye style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={handleEyeClick} />

// {isAddBusOpen && (
// <Addbus open onClose={() => setIsAddBusOpen(false)} 
//  defaultRegNo={selectedRegNo}
// />)} */}

// {/* </td> */}
  
//         </tr>
//       ))}
//     </tbody>
//   </table>
// )}

//     </div>
//   );
// }

// export default BusScheduleMatrics;





// import { Print, Search } from '@mui/icons-material';
// import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
// import { useState, useRef, useEffect } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import Bus_service from '../../Services/Bus_service';


// function Report(props) {
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [regno, SetRegNo] = useState('');
//     const [busdetails, setbusdetails] = useState([]);
//     const [date, SetDate] = useState('');
//     const [selectedSLAFor, setSelectedSLAFor] = useState('');
//     const [reportDetails, setReportDetails] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const componentRef = useRef();
//     const [showPDF, setShowPDF] = useState(false);
//     const [tripDate, settripDate] = useState(null);

//     const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//     });
//     useEffect(()=>{
//         Bus_service.getAllBus().then((res)=>{
//           setbusdetails(res.data);
//           console.log(res.data)
//         }).catch(err=>console.log(err))
//       },[])

 

//   const handleGenerateReport = async () => {
//     setLoading(true); 
//     try {
//         if (regno && tripDate) {
//           const apiUrl = `http://10.226.33.131:9000/waybill/getData/${regno}/${tripDate}`;
//           const response = await fetch(apiUrl, {
//             method: 'GET',
//             // Other necessary configurations like headers, etc.
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
    
//           const data = await response.json();
//           setReportDetails(data);
//           console.log(data)
//         } else {
//           setError('Please select both Registration No. and Date');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//       <Typography variant="h6" align="center" gutterBottom>
//         Bus Schedule Matrics
//       </Typography>
//       <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        
//  <TextField style={{width: '200px',marginRight: '10px'}} id="standard-basic" 
//       label="Select Bus No." variant="outlined" 
//         select
//       name='regno' value={regno} 
//       onChange={(e)=>SetRegNo(e.target.value)} 
//       required
//         >
            
//           {busdetails.map((option) => (
//             <MenuItem key={option.regno} value={option.regno}>
//               {option.regno}
//             </MenuItem>
//           ))}
//  </TextField>
//  <input type='date'  
//  style={{outlineColor:"blue",borderColor:"lightgrey",
//  height:"58px",width:"170px",
//  borderRadius:"5px",
//  paddingLeft:"10px"}}
//         value={tripDate}
//         onChange={(e) => settripDate(e.target.value)}
//         />

//         <Search style={{marginLeft:'30px'}} variant="contained" onClick={handleGenerateReport}>
//           Search
//         </Search>
//         {loading && <p>Loading...</p>}

       
        
//       </Box>

    
//       <div ref={componentRef}>
        
//       {reportDetails.length > 0 && (
//         <table   className="report-table">
//           <thead>
//             <tr>
//             <th>SL No</th>
//                 <th>SLA</th>
//                 <th>Agency</th>
//                 <th>Remarks</th>
//                 <th>SLA Type</th>
//                 <th>Details</th>
//                 <th>Penalty</th>
//                 <th>Penalty Detail</th>
//                 <th>Quality Type</th>
//                 <th>Complaint</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportDetails.map((item, index) => (
//               <tr key={index}>
//                 <td>{index+1}</td>
//                  <td>{item.slaMaster ? item.slaMaster.sla : 'N/A'}</td>
//                   <td>{item.slaMaster && item.slaMaster.agencyMaster ? item.slaMaster.agencyMaster.agencyname : 'N/A'}</td>
//                   <td>{item.slaMaster ? item.slaMaster.remarks : 'N/A'}</td>
//                   <td>{item.slaMaster && item.slaMaster.slaTypeMaster ? item.slaMaster.slaTypeMaster.slatype : 'N/A'}</td>
//                   <td>{item.slaMaster ? item.slaMaster.details : 'N/A'}</td>
//                   <td>{item.penalty || 'N/A'}</td>
//                   <td>{item.penaltydetail || 'N/A'}</td>
//                   <td>{item.qualityStandardMaster ? item.qualityStandardMaster.qualitytype : 'N/A'}</td>
//                   <td>{item.customerComplaint ? item.customerComplaint.complaint : 'N/A'}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//       )}
     
//     </div>


// {selectedMonth && selectedSLAFor && (
//       <Print variant="contained" onClick={() => {
//         handlePrint();
//         setShowPDF(true);
//       }} style={{ marginLeft: '10px' ,marginTop: '30px'}}>
//                Print 
//             </Print>
//     )}
 
//     </div>
    
//   );
// }
// export default Report;

import { Box, Button, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import { SECTION_TYPE_GRANULARITY } from '@mui/x-date-pickers/internals/utils/getDefaultReferenceDate';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';

const customStyles = {
  header: {
		style: {
			fontSize: '20px',
			color: "black",
      textAlign:"justify",
      fontWeight:"700 !important",
			padding:"0px 0px 0px 10px !important",
      paddingLeft:"10px"
			
		},
	},
  rows: {
      style: {
        backgroundColor:"#b6e7e1",
        textAlign:"center !important",
         
      },
  },
  headCells: {
      style: {
        fontSize:'14px',
        height:"auto",
        backgroundColor:'#267871',
        borderRadius: "10",
        border: "#34ebcc 5px",
        textAlign:"center",
        //padding:"0px !important",
        fontWeight:"700 !important",
            paddingLeft:"10px",
        width:"fit-content",
        whiteSpace: "normal !important",
        wordBreak: "auto-phrase !important"
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', 
          paddingRight: '8px',
          textAlign:"center !important", 
      },
      
  },
  columns:{
    style:{
         borderRight:"white 5px"  
    },
  },
 
};

function BusScheduleMatrics(props) {
  const [regno, setRegNo] = useState('');
  const [busdetails, setBusDetails] = useState([]);
  const [allbuslist,setAllbuslist] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filtervalue,setFiltervalue] = useState('monthwise');
  const [month,setMonth] = useState('');
  const [quarter,setQuarter] = useState('');
  const [halfyearly,setHalfyearly] = useState("")
  // const allmonths = [{key:"January",value:"2023-01-01_2023-01-31"},{key:"February",value:"2023-02-01_2023-02-28"},{key:"March",value:"2023-03-01_2023-03-31"},{key:"April",value:"2023-04-01_2023-04-30"},{key:"May",value:"2023-05-01_2023-05-31"},{key:"June",value:"2023-06-01_2023-06-30"},{key:"July",value:"2023-07-01_2023-07-31"},{key:"August",value:"2023-08-01_2023-08-31"},{key:"September",value:"2023-09-01_2023-09-30"},{key:"October",value:"2023-10-01_2023-10-31"},{key:"November",value:"2023-11-01_2023-11-30"},{key:"December",value:"2023-12-01_2023-12-31"}];
  const allmonths = [{key:"January",value:"01-01_01-31"},{key:"February",value:"02-01_02-28"},{key:"March",value:"03-01_03-31"},{key:"April",value:"04-01_04-30"},{key:"May",value:"05-01_05-31"},{key:"June",value:"06-01_06-30"},{key:"July",value:"07-01_07-31"},{key:"August",value:"08-01_08-31"},{key:"September",value:"09-01_09-30"},{key:"October",value:"10-01_10-31"},{key:"November",value:"11-01_11-30"},{key:"December",value:"12-01_12-31"}];

  const allquarters = [{key:"January-March",value:"2023-01-01_2023-03-31"},{key:"April-June",value:"2023-04-01_2023-06-30"},{key:"July-Sep",value:"2023-07-01_2023-09-30"},{key:"Oct-Dec",value:"2023-10-01_2023-12-31"}];
  const allhalfyearly = [{key:"January-June",value:"2023-01-01_2023-06-30"},{key:"July-December",value:"2023-07-01_2023-12-31"}];
    
  const [checktabledata,setChecktabledata] = useState(false);

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
  const [timeformodal,setTimeformodal] = useState("");
  const [typeformodal,setTypeformodal] = useState("");
  const [selectedRegNo, setSelectedRegNo] = useState(''); // This is the selected regno from your logic
  const [aftersearch,setAfterseacrch] = useState(false);
  const [year, setYear] = useState('');
  const [allreadyfilledstartpun,setAllreadyfilledstartpun] = useState("");
  const [allreadyfilledarrivepun,setAllreadyfilledarrivepun] =useState("");
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');

  const styles = {
      
    valueContainer: (css) => ({
      ...css,
      ...{ width: "200px",
         textAlign:"left !important" }
    })
  };

 
  // useEffect(() => {
  //   Bus_service.getAllBus()
  //     .then((res) => {
  //       setBusDetails(res.data);
  //       // console.log(res.data)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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

   
   const columns = [
        
    {
        name: 'Driver Id',
        selector: row => row.driverId,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
       },
  {
    name: 'Conductor Id',
    selector: row => row.conductorId,
    sortable:true,
    center:true,
    wrap:true,
    width:"150px"
},
{
  name: 'Bus No.',
  selector: row => row.busNo,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'From Stop',
  selector: row => row.fromStop,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'To Stop',
  selector: row => row.toStop,
  sortable:true,
  center: true, 
  wrap: true
  // width:"250px",
 },
{
name: 'ETA From Stop',
selector: row => row.etaFromStop.slice(0, 5),
sortable:true,
center:true,
wrap:true,
width:"130px"
},
{
name: 'ATA From Stop',
selector: row => row.ataFromStop.slice(0, 5),
sortable:true,
center:true,
wrap:true
},
{
name: 'From Time Difference',
selector: row => row.diffTimeFrom.slice(0, 5),
sortable:true,
center:true,
wrap:true,
width:"130px",
conditionalCellStyles: [
  {
    when: row => row.diffTimeFromMinute>5,
    style: {
      backgroundColor: '#800000b5',
    },
  },
],
},
{
  name: 'ETA To Stop',
  selector: row => row.etaToStop.slice(0, 5),
  sortable:true,
  center:true,
  wrap:true
  },
  {
  name: 'ATA To Stop',
  selector: row => row.ataToStop.slice(0, 5),
  sortable:true,
  center:true,
  wrap:true
  },
  {
  name: 'To Time Difference',
  selector: row => row.diffTimeTo.slice(0, 5),
  sortable:true,
  center:true,
  wrap:true,
  width:"130px",
  conditionalCellStyles: [
    {
      when: row => row.diffTimeToMinute>15,
      style: {
        backgroundColor: '#800000b5',
      },
    },
  ],
  },

];
   
  const changeFiltervalue = (e)=>{
    setFiltervalue(e);
    setReportDetails({
        countWayBillTrips: 0,
        countWayBillTripsWhereTimeIsNotZero: 0,
        wayBillTripsList: [],
      });
      setAfterseacrch(false)
  }
  const handleGenerateReport = async () => {
    setLoading(true);
    let penaltycheckstartpun;
    let incrementcheckstartpun;
    let penaltycheckarrivepun;
    let incrementcheckarrivepun;

    checkiffilledalreadystartpun("Start Punctuality",month,year,aftercheck);
    checkiffilledalreadyarrivepun("Arrival Punctuality",month,year,aftercheckarrive);

    async function checkiffilledalreadystartpun(a,m,y){
      let monthnum = m.substr(0,2);
      await Bus_service.checkifalreadyfilledpenalty(a,monthnum,y).then((res)=>{
        penaltycheckstartpun = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      await Bus_service.checkifalreadyfilledincrement(a,monthnum,y).then((res)=>{
        incrementcheckstartpun = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      aftercheck();
    }

    async function checkiffilledalreadyarrivepun(a,m,y){
      let monthnum = m.substr(0,2);
      await Bus_service.checkifalreadyfilledpenalty(a,monthnum,y).then((res)=>{
        penaltycheckarrivepun = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      await Bus_service.checkifalreadyfilledincrement(a,monthnum,y).then((res)=>{
        incrementcheckarrivepun = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      aftercheckarrive();
    }

    async function aftercheck(){
      if(penaltycheckstartpun || incrementcheckstartpun){
        setAllreadyfilledstartpun(true);
        
      }
      else {
        setAllreadyfilledstartpun(false);
      }
      
    }

    async function aftercheckarrive(){
      if(penaltycheckarrivepun || incrementcheckarrivepun){
        setAllreadyfilledarrivepun(true);
        
      }
      else {
        setAllreadyfilledarrivepun(false);
      }
      
    }

    if(filtervalue==="buswise"){
      let dateArray = filtervalue === 'buswise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');

      await Bus_service.getdatabybusnodate(regno,dateArray[0], dateArray[1]).then((res)=>{
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
    }
    

      else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
        let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
        if (month && year) {
          let startDate = `${year}-${month.split('_')[0]}`;
          let endDate = `${year}-${month.split('_')[1]}`;
          console.log(startDate,endDate,year,month.split('_')[0]);
      
        if(Boolean(props.pto)){
        // try {
          // const res =
           await Bus_service.datewisedatapto(props.pto,startDate, endDate,).then((res)=>{;
          console.log(res.data)
          setReportDetails({
            countWayBillTrips: res.data.countWayBillTrips,
            countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
            wayBillTripsList: res.data.wayBillTripsList,
          });
          // res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
          console.log(regno,res.data)
          setLoading(false);
          setAfterseacrch(true)
    }).catch((err)=>{
        console.log(err)
        setLoading(false);
        setAfterseacrch(false)
    })    
  }

          // await Bus_service.datewisedata(dateArray[0], dateArray[1]);
          // console.log(res.data)
          // setReportDetails({
          //   countWayBillTrips: res.data.countWayBillTrips,
          //   countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
          //   wayBillTripsList: res.data.wayBillTripsList,
          // });
          else {

            await Bus_service.datewisedata(startDate,endDate).then((res)=>{
                setReportDetails({
                    countWayBillTrips: res.data.countWayBillTrips,
                    countWayBillTripsWhereTimeIsNotZero: res.data.countWayBillTripsWhereTimeIsNotZero,
                    wayBillTripsList: res.data.wayBillTripsList,
                  });
                  console.log(regno,res.data)
                  // res.data.records.length==0?setChecktabledata(true):setChecktabledata(false);
                  console.log(regno,res.data)
          setLoading(false);
          setAfterseacrch(true)
        }).catch((err)=>{
          console.log(err)
          setLoading(false);
          setAfterseacrch(false)
      })
  }
}
}else {
  setError('Please select both Month and Year');
}
  }
  const handleChangeforbus = (e)=>{
    setRegNo(e.value);
    setSelectedDate(e.value);
  }
  const handleButtonClick = (time,type) => {
    setTimeformodal(time);
    setTypeformodal(type)
    setIsAddBusOpen(true);

  };
  function onmonthchange(value){
    setMonth(value);
    console.log(value)
    console.log(value.split('_'))
    setAfterseacrch(false)
    // setReportflag(false);
    // setSelectedeffortdetails([]);
  }

  function onquarterchange(value){
    setQuarter(value);
    console.log(value)
    setAfterseacrch(false)
  }

  function onhalfyearlychange(value){
    setHalfyearly(value);
    console.log(value)
    setAfterseacrch(false)
  }
  const updatedata = (id) =>{
    setUpdateid(id);
    setModalopen(true);
}
const handleEyeClick = () => {
    setIsAddBusOpen(true);
  };

  const startpunctuality =()=>{
    let countstartpunctuality = 0;
    reportDetails.wayBillTripsList.map((data,index)=>{
      if(data.diffTimeFromMinute>5){
        countstartpunctuality++;
      }
    })
    let percentage = ((reportDetails.countWayBillTrips-countstartpunctuality)/reportDetails.countWayBillTrips)*100;
    console.log(percentage)
    return percentage.toFixed(2);
  }

  const arrivalpunctuality =()=>{
    let countarrivalpunctuality = 0;
    reportDetails.wayBillTripsList.map((data,index)=>{
      if(data.diffTimeToMinute>15){
        countarrivalpunctuality++;
      }
    })
    let percentage = ((reportDetails.countWayBillTrips-countarrivalpunctuality)/reportDetails.countWayBillTrips)*100;
    console.log(percentage)
    return percentage.toFixed(2);
  }

  const handleSnackClose = ()=>{
    setOpensnack(false);
  }; 

 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Snackbar  ContentProps={{
    sx: {
      background: snackcolor,
      color:'white',
      padding:"15px",
      letterSpacing:"1.5px",
      fontWeight:"500",
      textAlign:"center",
      
    }
  }}
  anchorOrigin={{vertical:'top',horizontal:'center'}}
  open={opensnack}
  autoHideDuration={6000}
  onClose={handleSnackClose}
  message={errormessage}
  />
    <div  className='pageheader'>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',fontWeight:'900'}} gutterBottom>
    Bus Schedule Metrics
      </Typography>
      
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{marginRight:"10px",color:"white",fontWeight:'600'}}>
            Filter By :  
        </div>
        <div style={{marginRight:"10px"}}>
          <TextField
       style={{ margin: '10px'}}
id="outlined-select-currency"
select
label="Select Filter"
name="filter"
value={filtervalue}
onChange={(e)=>changeFiltervalue(e.target.value)}
required
variant="filled"
sx={{
'& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
'& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
color:"white"
},
'& .css-1wc848c-MuiFormHelperText-root':{
color:"white"
},
'& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"white"},
'& .css-19mk8g1-MuiInputBase-root-MuiFilledInput-root':{
color:"white"
},
'& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
color:"rgb(255 255 255 / 71%)",
fill:"rgb(255 255 255 / 71%)"
},
'& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
  color:"white"
}
}}
>
<MenuItem key={1} value="monthwise">
        Month Wise
      </MenuItem>
          </TextField>
        </div>
      </div>
      </div>
     
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

        <button onClick={handleGenerateReport} style={{ marginLeft: '30px' }}>
          Search
        </button>
        {loading && <p>Loading...</p>}
      </Box> */}
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
  {allbuslist.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.value}
    </MenuItem>
  ))}
</TextField>

        {/* <input
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
        /> */}

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
      filtervalue==='monthwise'?
      <Box className='monthwiseform'>
        <div style={{display:"flex"}}>
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
              color:"white"
            },
            '& .css-1wc848c-MuiFormHelperText-root':{
              color:"white"
            },
            '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"white"},
            '& .css-19mk8g1-MuiInputBase-root-MuiFilledInput-root':{
              color:"white"
            },
            '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
              color:"rgb(255 255 255 / 71%)",
              fill:"rgb(255 255 255 / 71%)"
            },
            '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
              color:"white"
            }
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
    '& > :not(style)': {  width: '25ch',marginRight:"20px",textAlign:"left !important" },
    '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root':{
      color:"white"
    },
    '& .css-1wc848c-MuiFormHelperText-root':{
      color:"white"
    },
    '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root':{color:"white"},
    '& .css-19mk8g1-MuiInputBase-root-MuiFilledInput-root':{
      color:"white"
    },
    '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
      color:"rgb(255 255 255 / 71%)",
      fill:"rgb(255 255 255 / 71%)"
    },
    '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':{
      color:"white"
    }
  }}
>
<MenuItem value="2023">2023</MenuItem>
<MenuItem value="2024">2024</MenuItem>
</TextField>
       {Boolean(month) && Boolean(year)?<Button onClick={handleGenerateReport} className="monthwiseformbutton">
          Search
        </Button>:""
      }
      
     </div>
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

  


{reportDetails.wayBillTripsList && reportDetails.wayBillTripsList.length > 0 && (
  <>
  {/* <table className="report-table">
    <thead>
      <tr>
    
        <th>Driver Id</th>
        <th>Conductor Id</th>
        {filtervalue === 'monthwise' && <th>Bus No.</th>}
      
        <th>From Stop</th>
        <th>To Stop</th>
        <th>ETA From Stop</th>
        <th>ATA From Stop</th>
        <th>From Time Difference</th>
        <th>ETA To Stop</th>
        <th>ATA To Stop</th>
      
        <th>To Time Difference</th>
       
     
      </tr>
    </thead>
    <tbody>
      {reportDetails.wayBillTripsList.map((item, index) => (
        <tr key={index}>
            <td>{item.driverId}</td>
          <td>{item.conductorId}</td>
          {filtervalue === 'monthwise' && <td>{item.busNo}</td>}
       
          <td>{item.fromStop}</td>
          <td>{item.toStop}</td>
          <td>{item.etaFromStop.slice(0, 5)}</td>
          <td>{item.ataFromStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeFromMinute>5?"#800000b5":""}}>{item.diffTimeFrom.slice(0, 5) }</td>
          <td>{item.etaToStop.slice(0, 5)}</td>
          <td>{item.ataToStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeToMinute>15?"#800000b5":""}}>{item.diffTimeTo.slice(0, 5)}</td>
          
  
        </tr>
      ))}
    </tbody>
  </table> */}

<DataTable
columns={columns}
data={reportDetails.wayBillTripsList}
fixedHeader
fixedHeaderScrollHeight="600px"
pagination
responsive
// striped
subHeaderAlign="right"
subHeaderWrap
// subHeader
// subHeaderComponent={<input type="text" placeholder="Search here"  style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
customStyles={customStyles}
highlightOnHover
desnse

/>
</>
)}

{aftersearch?<>
      <div style={{ display: 'flex',justifyContent:"center", alignItems: 'center', marginTop: '5px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
  <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
    Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
  </p>
</div>
{
filtervalue!=="buswise" && reportDetails.wayBillTripsList.length > 0?
<div style={{ display: 'flex', alignItems: 'center',justifyContent:"center", marginTop: '10px' }}>
<p style={{marginLeft : '50px', marginRight: '50px' }}>
  <span style={{fontWeight:"bold"}}> Start Punctuality: </span> {startpunctuality()} {startpunctuality()<=89?
  <Button onClick={()=>handleButtonClick("start","penalty")} disabled={allreadyfilledstartpun} style={{backgroundColor:allreadyfilledstartpun?"lightgrey":"maroon",color:"white",margin:"0 15px",cursor:"pointer"}}>Action</Button>:startpunctuality()>=91?
  <Button onClick={()=>handleButtonClick("start","incentive")} disabled={allreadyfilledstartpun} style={{backgroundColor:allreadyfilledstartpun?"lightgrey":"#188718",color:"white",margin:"0 15px",cursor:"pointer"}}> Incentive </Button>:""} 
  <span style={{marginLeft:"20px"}}>|</span> </p>

  <p style={{marginLeft : '50px', marginRight: '50px' }}>
  <span style={{fontWeight:"bold"}}> Arrival Punctuality:</span> {arrivalpunctuality()} {arrivalpunctuality()<=79?
  <Button onClick={()=>handleButtonClick("arrival","penalty")} disabled={allreadyfilledarrivepun} style={{backgroundColor:allreadyfilledarrivepun?"lightgrey":"maroon",color:"white",margin:"0 15px",cursor:"pointer"}}>Action</Button>:arrivalpunctuality()>=81?
  <Button onClick={()=>handleButtonClick("arrival","incentive")} style={{backgroundColor:allreadyfilledarrivepun?"lightgrey":"#188718",color:"white",margin:"0 15px",cursor:"pointer"}}> Incentive </Button>:""}</p>
   
  </div>:""}
  </>:""
}

{isAddBusOpen?typeformodal==="penalty"?
  <Addbus open onCloseerror={() => {setIsAddBusOpen(false)
    setOpensnack(true);
    setErrormessage("Not able to submit now. Please try again later"); 
    setSnackcolor("#e34242"); 
   }
 } 
 onClose={() => {setIsAddBusOpen(false)
   setSnackcolor("#458a32");
   setErrormessage(" Data Saved Successfully ")
   setOpensnack(true);
   handleGenerateReport();
  }
 } 
  startpunper={startpunctuality()}   
  arrivalpunper={arrivalpunctuality()} 
  timeformodal={timeformodal} 
  from="Schedule"
  month={month.substring(0,2)} year={year}
/>:<AddBusIncentive open onCloseerror={() => {setIsAddBusOpen(false)
   setOpensnack(true);
   setErrormessage("Not able to submit now. Please try again later"); 
   setSnackcolor("#e34242"); 
  }
} 
onClose={() => {setIsAddBusOpen(false)
  setSnackcolor("#458a32");
  setErrormessage(" Data Saved Successfully ")
  setOpensnack(true);
  handleGenerateReport();
 }
}  
  startpunper={startpunctuality()}   
  arrivalpunper={arrivalpunctuality()} 
  timeformodal={timeformodal} 
  from="Schedule" month={month.substring(0,2)} year={year} />:""
}
    </div>
  );
}

export default BusScheduleMatrics;

