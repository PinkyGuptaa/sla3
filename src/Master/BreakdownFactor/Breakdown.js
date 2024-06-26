
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
import { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import { Edit } from '@mui/icons-material';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';
import DataTable from 'react-data-table-component';


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
        backgroundColor:"white",
        textAlign:"center !important",
        '&:hover': {
          backgroundColor: '#267871 !important',
          color:"white !important",
          fontWeight:"500 !important"
        },
      },
  },
  headCells: {
      style: {
        fontSize:'14px',
        height:"auto",
        backgroundColor:'#136a8a',
        borderRadius: "10",
        border: "#34ebcc 5px",
        textAlign:"center",
        //padding:"0px !important",
        fontWeight:"700 !important",
      
        paddingLeft:"10px",
        width:"fit-content",
          whiteSpace: "normal !important",
          wordBreak: "auto-phrase !important",
          color:"white"
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
  pagination: {
		style: {
			color: "black",
			fontSize: '13px',
			minHeight: '56px',
		  marginTop:"50px",
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
		  alignItems:"right",
      marginBottom:"10px",
      width:"100%",

		}
  }
};

function BusScheduleMatrics(props) {
  const [regno, setRegNo] = useState('');
  const [busdetails, setBusDetails] = useState([]);
  const [allbusdetails, setAllBusDetails] = useState([]);
  const [typeformodal,setTypeformodal] = useState("");
  const [unavailablebus, setUnavailablebus] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filtervalue,setFiltervalue] = useState('monthwise');
  const [month,setMonth] = useState('');
  const [quarter,setQuarter] = useState('');
  const [halfyearly,setHalfyearly] = useState("")

  const [breakdownFactor, setBreakdownFactor] = useState(0);
const [totalActualDistance, setTotalActualDistance] = useState(0);
  const [aftersearch,setAftersearch] = useState(false);

  // const allmonths = [{key:"January",value:"2023-01-01_2023-01-31"},{key:"February",value:"2023-02-01_2023-02-28"},{key:"March",value:"2023-03-01_2023-03-31"},{key:"April",value:"2023-04-01_2023-04-30"},{key:"May",value:"2023-05-01_2023-05-31"},{key:"June",value:"2023-06-01_2023-06-30"},{key:"July",value:"2023-07-01_2023-07-31"},{key:"August",value:"2023-08-01_2023-08-31"},{key:"September",value:"2023-09-01_2023-09-30"},{key:"October",value:"2023-10-01_2023-10-31"},{key:"November",value:"2023-11-01_2023-11-30"},{key:"December",value:"2023-12-01_2023-12-31"}];
  const allmonths = [{key:"January",value:"01-01_01-31"},{key:"February",value:"02-01_02-28"},{key:"March",value:"03-01_03-31"},{key:"April",value:"04-01_04-30"},{key:"May",value:"05-01_05-31"},{key:"June",value:"06-01_06-30"},{key:"July",value:"07-01_07-31"},{key:"August",value:"08-01_08-31"},{key:"September",value:"09-01_09-30"},{key:"October",value:"10-01_10-31"},{key:"November",value:"11-01_11-30"},{key:"December",value:"12-01_12-31"}];

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
  const [year, setYear] = useState('');
  const [allreadyfilled,setAllreadyfilled] = useState(false);
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

 
  useEffect(() => {
    Bus_service.getAllBus()
      .then((res) => {
        setBusDetails(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
                  
    {
        name: 'Bus No.',
        selector: row => row.busNo,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
       },
  {
    name: 'Distance To Cover',
    selector: row => row.totalActualDistance,
    sortable:true,
    center:true,
    wrap:true
},
{
  name: 'Distance Covered',
  selector: row => row.totalCoveredDistance,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Distance Difference',
  selector: row => row.totalDifferenceCovered,
  sortable:true,
  center:true,
  wrap:true
},

];

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
    let penaltycheck;
    let incrementcheck;

    checkiffilledalready("Reliability (BF)",month,year,aftercheck);

    async function checkiffilledalready(a,m,y){
      let monthnum = m.substr(0,2);
      await Bus_service.checkifalreadyfilledpenalty(a,monthnum,y).then((res)=>{
        penaltycheck = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      await Bus_service.checkifalreadyfilledincrement(a,monthnum,y).then((res)=>{
        incrementcheck = res.data;
        console.log(res.data);
      }).catch(err=>console.log(err));

      aftercheck();
    }

    async function aftercheck(){
      if(penaltycheck || incrementcheck){
        setAllreadyfilled(true);
        console.log(penaltycheck,incrementcheck)
      }
      else {
        setAllreadyfilled(false);
      }
      
    }

    if(filtervalue==="buswise")
       {
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
     
        }
      
    // if (regno && selectedDate) {
   
    //       const apiUrl = `http://10.226.33.132:9100/busperformance/getData/${regno}/${selectedDate}`;
  
    //       const response = await fetch(apiUrl, {
    //         method: 'GET',
    //       });
  
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //       }
  
    //       const data = await response.json();
    //       setReportDetails({
    //         countWayBillTrips: data.countWayBillTrips,
    //         countWayBillTripsWhereTimeIsNotZero: data.countWayBillTripsWhereTimeIsNotZero,
    //         wayBillTripsList: data.wayBillTripsList,
    //       });
    //     } else {
    //       setError('Please select both Bus No. and Date');
    //     }
  
        else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
          // let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
         
          if (month && year) {
            let startDate = `${year}-${month.split('_')[0]}`;
            let endDate = `${year}-${month.split('_')[1]}`;
            console.log(startDate,endDate,year,month.split('_')[0]);
          try {
            // const res = await Bus_service.getAllMergeData(dateArray[0], dateArray[1]);
            const res = await Bus_service.getAllMergeData(startDate, endDate);
  
            let unavailableBuses = res.data[0].count
            setUnavailablebus(unavailableBuses)
            console.log(unavailablebus);
            console.log(res.data[0].count)
            console.log(res.data[1])
            const totalCoveredDistance = allbusdetails.reduce((sum, bus) => sum + bus.totalCoveredDistance, 0);
            const calculatedBreakdownFactor =  parseFloat((unavailableBuses * 10000) / totalCoveredDistance).toFixed(2)*10;
            const final = Math.trunc(calculatedBreakdownFactor)/10;
            setBreakdownFactor(parseFloat(final));
            console.log(calculatedBreakdownFactor,final)
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
        }else {
          setError('Please select both Month and Year');
        }
      }

   
  };

  const handleChangeforbus = (e)=>{
    setRegNo(e.value);
    setSelectedDate(e.value);
  }
  const handleButtonClick = (type) => {
    setIsAddBusOpen(true);
    setTypeformodal(type);
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
        // const calculatedBreakdownFactor = parseFloat((unavailablebus * 10000) / totalCoveredDistance).toFixed(1);
        // setBreakdownFactor(parseFloat(calculatedBreakdownFactor));
        const calculatedBreakdownFactor =  parseFloat((unavailablebus * 10000) / totalCoveredDistance).toFixed(2)*10;
        const final = Math.trunc(calculatedBreakdownFactor)/10;
        setBreakdownFactor(parseFloat(final));
        console.log(calculatedBreakdownFactor,final)
      }  
    };


    calculateBreakdownFactor();
  }, [allbusdetails, unavailablebus]);

  const handleSnackClose = ()=>{
    setOpensnack(false);
  }; 

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
       <Snackbar ContentProps={{
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
    <div className='pageheader'>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',fontWeight:'900'}} gutterBottom>
    Breakdown Factor
      </Typography>
      
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{marginRight:"10px",color:"white  ",fontWeight:'600'}}>
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
       {Boolean(month) && Boolean(year)?<Button onClick={handleGenerateReport} className="monthwiseformbutton ">
          Search
        </Button>:""
      }
        {/* {loading && <p>Loading...</p>} */}
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
  


{aftersearch && allbusdetails && allbusdetails.length > 0 ?
 
 <>  
      

        <DataTable
            columns={columns}
            data={allbusdetails}
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

<table className="report-table" style={{marginTop:"-115px",width:"100%", backgroundColor:"#b6e7e1"}}>
          <thead>
           
          </thead>
          <tbody>
           
          <tr>
        <td colSpan="1" style={{textAlign:"center",width:"25%",fontWeight:"900"}}>Total</td>
        <td style={{textAlign:"center",width:"25%"}}>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalActualDistance, 0)}
        </td>
        <td style={{textAlign:"center",width:"25%"}}>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalCoveredDistance, 0)}
        </td>
        <td style={{textAlign:"center",width:"25%"}}>
          {allbusdetails.reduce((sum, bus) => sum + bus.totalDifferenceCovered, 0)}
        </td>
     
      </tr>
    
      
          </tbody>
        </table>
      

<div style={{ display: 'flex', alignItems: 'center',justifyContent:"center", marginTop: '40px' }}>
  <p style={{marginLeft : '50px', marginRight: '50px' }}>Number of Unavailable Buses: {unavailablebus} </p>
 

 
           </div>

           <div style={{ display: 'flex',flexDirection:"column", alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center'}}>
            {allreadyfilled?<p style={{color:"red"}}> Penalty/Increment already filled for this month. </p>:""}
           </div>
           <div style={{ display: 'flex', alignItems: 'center'}}>
           <p style={{marginLeft : '50px', marginRight: '50px' }}>Breakdown Factor = {breakdownFactor} </p>
           <p>{breakdownFactor>=0.6?
           <Button onClick={()=>handleButtonClick("penalty")} disabled={allreadyfilled} style={{padding:"10px",backgroundColor:allreadyfilled?"lightgrey":"maroon",color:"white",cursor:"pointer",}}>
             Action </Button>:
             breakdownFactor<=0.4?
             <Button onClick={()=>handleButtonClick("incentive")} disabled={allreadyfilled} style={{padding:"10px",backgroundColor:allreadyfilled?"lightgrey":"#188718",color:"white",cursor:"pointer"}}>
             Incentive </Button>:""}</p>
            
     
      </div>
      </div>
</>
     :aftersearch && allbusdetails.length==0?
     <>
       <div style={{marginTop:"30px",display:"flex",justifyContent:"center"}}>No Data Available</div>
     </>:""
    }

{
        isAddBusOpen?typeformodal==="penalty"?
        <Addbus open onCloseerror={() => {setIsAddBusOpen(false)
          setOpensnack(true);
          setErrormessage("Not able to submit now. Please try again later"); 
          setSnackcolor("#e34242"); 
         }
       } 
       onClose={() => {setIsAddBusOpen(false)
       }
      } 
      
      onClosesuccess={() => {setIsAddBusOpen(false)
      setSnackcolor("#458a32");
      setErrormessage(" Data Saved Successfully ")
      setOpensnack(true);
      handleGenerateReport();
      }
      } 
       from="Breakdown" breakdownper={breakdownFactor} month={month.substring(0,2)} year={year}
      
      />:<AddBusIncentive open onCloseerror={() => {setIsAddBusOpen(false)
        setOpensnack(true);
        setErrormessage("Not able to submit now. Please try again later"); 
        setSnackcolor("#e34242"); 
       }
     } 
     onClose={() => {setIsAddBusOpen(false)
     }
    } 
    
    onClosesuccess={() => {setIsAddBusOpen(false)
    setSnackcolor("#458a32");
    setErrormessage(" Data Saved Successfully ")
    setOpensnack(true);
    handleGenerateReport();
    }
    } 
          from="Breakdown" breakdownper={breakdownFactor} month={month.substring(0,2)} year={year} />:""
      }
     </div>
     
   );
  
 }
export default BusScheduleMatrics;

