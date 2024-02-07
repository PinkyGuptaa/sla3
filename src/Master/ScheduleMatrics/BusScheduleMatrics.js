
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

import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { SECTION_TYPE_GRANULARITY } from '@mui/x-date-pickers/internals/utils/getDefaultReferenceDate';
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';

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

  console.log(aftersearch);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
    Bus Schedule Metrics
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
            </MenuItem> */}
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

    {aftersearch?<>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
  <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
    Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
  </p>
</div>
{
filtervalue!=="buswise" && reportDetails.wayBillTripsList.length > 0?
<div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
<p style={{marginLeft : '50px', marginRight: '50px' }}>
  <span style={{fontWeight:"bold"}}> Start Punctuality: </span> {startpunctuality()} {startpunctuality()<=96?
  <button onClick={()=>handleButtonClick("start","penalty")} style={{backgroundColor:"#ed6e6e9c",margin:"0 15px"}}>Action</button>:startpunctuality()>=96?
  <button onClick={()=>handleButtonClick("start","incentive")} style={{backgroundColor:"lightgreen",margin:"0 15px"}}> Incentive </button>:""} 
  <span style={{marginLeft:"20px"}}>|</span> </p>

  <p style={{marginLeft : '50px', marginRight: '50px' }}>
  <span style={{fontWeight:"bold"}}> Arrival Punctuality:</span> {arrivalpunctuality()} {arrivalpunctuality()<=79?
  <button onClick={()=>handleButtonClick("arrival","penalty")} style={{backgroundColor:"#800000e0",margin:"0 15px",cursor:"pointer"}}>Action</button>:arrivalpunctuality()>=81?
  <button onClick={()=>handleButtonClick("arrival","incentive")} style={{backgroundColor:"#188718",margin:"0 15px",cursor:"pointer"}}> Incentive </button>:""}</p>
   
  </div>:""}
  </>:""
}


{reportDetails.wayBillTripsList && reportDetails.wayBillTripsList.length > 0 && (
  
  <table className="report-table">
    <thead>
      <tr>
    
        
        {/* <th>Route Name</th> */}
        {/* <th>Conductor Name</th> */}
        <th>Driver Id</th>
        <th>Conductor Id</th>
        {filtervalue === 'monthwise' && <th>Bus No.</th>}
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
          {filtervalue === 'monthwise' && <td>{item.busNo}</td>}
          {/* <td>{item.waybillNo}</td> */}
          <td>{item.fromStop}</td>
          <td>{item.toStop}</td>
          <td>{item.etaFromStop.slice(0, 5)}</td>
          <td>{item.ataFromStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeFromMinute>5?"#800000b5":""}}>{item.diffTimeFrom.slice(0, 5) }</td>
          <td>{item.etaToStop.slice(0, 5)}</td>
          <td>{item.ataToStop.slice(0, 5)}</td>
          <td style={{backgroundColor:item.diffTimeToMinute>15?"#800000b5":""}}>{item.diffTimeTo.slice(0, 5)}</td>
          {/* <td>{item.actualDistance}</td> */}
          {/* <td>{item.tripIncome}</td> */}
         
         
          {/* <td> */}
  {/* <FaEye
    onClick={() => updatedata(item.id)}
    style={{ cursor: 'pointer', color: 'black', marginLeft: '20px' }}
  /> */}
   {/* <FaEye style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={handleEyeClick} />

{isAddBusOpen && (
<Addbus open onClose={() => setIsAddBusOpen(false)} 
 defaultRegNo={selectedRegNo}
/>)}

</td> */}
  
        </tr>
      ))}
    </tbody>
  </table>
)}
{isAddBusOpen?typeformodal==="penalty"?
  <Addbus open onClose={() => setIsAddBusOpen(false)} 
  startpunper={startpunctuality()}   
  arrivalpunper={arrivalpunctuality()} 
  timeformodal={timeformodal} 
  from="Schedule"
/>:<AddBusIncentive open onClose={() => setIsAddBusOpen(false)} 
  startpunper={startpunctuality()}   
  arrivalpunper={arrivalpunctuality()} 
  timeformodal={timeformodal} 
  from="Schedule" />:""
}
    </div>
  );
}

export default BusScheduleMatrics;

