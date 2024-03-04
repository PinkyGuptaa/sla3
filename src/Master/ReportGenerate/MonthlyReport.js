

import { Box, Button, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import { useState, useEffect,useRef } from 'react';
import { FaEye } from 'react-icons/fa';
import Environment from '../../Environment/Environment.json';
import axios from "axios";
import Select from 'react-select';
import Bus_service from '../../Services/Bus_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
import { Edit } from '@mui/icons-material';
import AddBusIncentive from '../BusPerformanceMetrics/AddBusIncentive';
import DataTable from 'react-data-table-component';
import ReactToPrint from 'react-to-print';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';
const Base_url = Environment.Base_Url

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
  // pagination: {
	// 	style: {
	// 		color: "black",
	// 		fontSize: '13px',
	// 		minHeight: '56px',
	// 	  marginTop:"50px",
	// 		borderTopStyle: 'solid',
	// 		borderTopWidth: '1px',
	// 	  alignItems:"right",
  //     marginBottom:"10px",
  //     width:"100%",

	// 	}
  // }
};

function MonthlyReport(props) {
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
  const [qualityTypes, setQualityTypes] = useState([]);
  const [penaltydetails,setpenaltydetails] = useState([]);
  const [incrementdetails,setIncrementdetails] = useState([]);
  const [modifiedBusDetails, setModifiedBusDetails] = useState([]);
  const componentRef = useRef();

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
        setAllBusDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Qualitystandardmaster_service.getAll()
      .then((res) => {
        const qualityTypes = res.data.map(item => item.qualitytype);
        console.log(qualityTypes);
        setQualityTypes(qualityTypes);

      })
      .catch((err) => console.log(err));
}, []);
useEffect(()=>{
   
  axios.get(`${Base_url}/busperformance/getQualityTypeCount`).then((res)=>{
     setpenaltydetails(res.data);
  }).catch((err)=>console.log(err));

  axios.get(`${Base_url}/pincentive/getQualityTypeCount`).then((res)=>{
    setIncrementdetails(res.data);
}).catch((err)=>console.log(err));

},[]);
const checkpenalty = (type) =>{
  let value = 0;
  penaltydetails.map((data)=>{
   if(data.quality==type){
       value = data.totalCountPenalty;
       console.log(value)
   }
  })
  return value;
}

const checkincrement = (type) =>{
  let value = 0;
  incrementdetails.map((data)=>{
   if(data.quality==type){
       value = data.totalCountIncentive;
   }
  })
  return value;
}
  const columns = [
                  
    {
        name: 'SL No.',
        selector: (row, index) => index + 1,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
       },
  {
    name: 'Parameter Name',
    selector: 'qualityType',
    sortable:true,
    center:true,
    wrap:true
},
{
  name: 'Penalty',
//   selector: row => {
//     const penaltyDetail = penaltydetails.find(detail => detail.quality === row.qualityType);
//     return penaltyDetail ? penaltyDetail.totalCountPenalty : 0;
// },
selector: 'penaltyCount',
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Incentive',
//   selector:  row => {
//     const incrementDetail = incrementdetails.find(detail => detail.quality === row.qualityType);
//     return incrementDetail ? incrementDetail.totalCountIncentive : 0;
// },
selector: 'incentiveCount',
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


    if(filtervalue==="buswise")
       {
        }
        else if (filtervalue === 'monthwise' || filtervalue === 'quarterly' || filtervalue === 'halfyearly') {
          // let dateArray = filtervalue === 'monthwise' ? month.split('_') : filtervalue === 'quarterly' ? quarter.split('_') : halfyearly.split('_');
         
          if (month && year) {
            let startDate = `${year}-${month.split('_')[0]}`;
            let endDate = `${year}-${month.split('_')[1]}`;
            console.log(startDate,endDate,year,month.split('_')[0]);
            try {
              let penaltyResponse = null;
              let incentiveResponse = null;
      
  
              [penaltyResponse, incentiveResponse] = await Promise.all([
                  Bus_service.getpenaltycount(startDate, endDate),
                  Bus_service.getincentivecount(startDate, endDate)
              ]);
              const penaltyCounts = penaltyResponse.data;
              const incentiveCounts = incentiveResponse.data;
              console.log(penaltyCounts)
              const modifiedDetails = qualityTypes.map(qualityType => {
                  const penaltyDetail = penaltyCounts.find(detail => detail.quality === qualityType);
                  const incentiveDetail = incentiveCounts.find(detail => detail.quality === qualityType);
                  console.log(penaltyDetail, incentiveDetail)
                  return {
                      qualityType,
                      penaltyCount: penaltyDetail ? penaltyDetail.totalCountPenalty : 0,
                      incentiveCount: incentiveDetail ? incentiveDetail.totalCountIncentive : 0
                  };
              });

              setModifiedBusDetails(modifiedDetails);
              console.log(modifiedDetails)
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


  const handleSnackClose = ()=>{
    setOpensnack(false);
  }; 

 
//   const modifiedBusDetails = qualityTypes.map((qualityType, index) => ({
//     qualityType: qualityType,
// }));

const handleDownloadCSV = () => {
  const csvData = generateCSV(modifiedBusDetails);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'report.csv');
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
};
const generateCSV = (data) => {
  const header = Object.keys(data[0]).join(',') + '\n';
  const rows = data.map((item) => {
      return Object.values(item).join(',');
  }).join('\n');
  const csv = header + rows;

  return csv;
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
    Monthly Report
      </Typography>
      

      </div>
     
     
          {filtervalue==='buswise'?
     <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
    

        

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
    
{aftersearch && qualityTypes && qualityTypes.length>0?
 
 <>  
 <div ref={componentRef}>
        <DataTable
            columns={columns}
            data={modifiedBusDetails}
            fixedHeader
            // fixedHeaderScrollHeight="600px"
            // pagination
            // paginationPerPage={10}
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
</div>
<div style={{marginLeft: '50%',
    margiinRight: '50%',
    borderRadius:'10px'}}>
    <ReactToPrint
  trigger={() => <button style={{backgroundColor:'#267871', color:'white', width: '80px', padding:'10px',borderRadius:'10px',marginTop:'20px',marginBottom:'20px'}}>Print</button>}
  content={() => componentRef.current}
/>
<button onClick={handleDownloadCSV} style={{backgroundColor:'#267871', color:'white', width: '150px', padding:'10px', borderRadius:'10px', marginTop:'10px', marginLeft: '10px'}}>Download CSV</button>
</div>

           
</>
     :aftersearch && allbusdetails.length==0?
     <>
       <div style={{marginTop:"30px",display:"flex",justifyContent:"center"}}>No Data Available</div>
     </>:""
    }


     </div>
     
   );
  
 }
export default MonthlyReport;

