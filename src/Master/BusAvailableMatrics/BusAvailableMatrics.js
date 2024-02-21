import { Box, Button, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Bus_service from '../../Services/Bus_service';
import Select from 'react-select';
import Busavailability_service from '../../Services/Busavailability_service';
import Addbus from '../BusPerformanceMetrics/AddBus';
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
      
        paddingLeft:"10px"
        
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

  useEffect(()=>{
    handleGenerateReport()
  },[isAddBusOpen])

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

  const columns = [
        
    {
        name: 'Reg No.',
        selector: row => row.regnNo,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
       },
  {
    name: 'Reg Dt',
    selector: row => row.regnDt,
    sortable:true,
    center:true,
    wrap:true
},
{
  name: 'Inactive Dt',
  selector: row => row.inactiveDt,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Fuel Type',
  selector: row => row.fuelType,
  sortable:true,
  center:true,
  wrap:true
},

];

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
    let penaltycheck;
    let incrementcheck;

    checkiffilledalready("Operational Availability",month,year,aftercheck);

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

        // let datearray = filtervalue==='monthwise'?month.split('_'):filtervalue==='quarterly'?quarter.split('_'):filtervalue==='halfyearly'?halfyearly.split('_'):yearly.split('_');

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
        Bus Available Matrix
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
      </Box>
      :
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

   


      {reportDetails.wayBillTripsList.length > 0 ? 
  <>
  {/* // <table className="report-table">
  //   <thead>
  //     <tr>
        
      
  //       <th>Reg No.</th>
  //       <th>Reg Date</th>
  
  //       <th>Inactive Date</th>
  //       <th>Fuel Type</th>
       
        
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {reportDetails.wayBillTripsList.map((item, index) => (
  //       <tr key={index}>
  //           <td>{item.regnNo}</td>
  //         <td>{item.regnDt}</td>
  //         <td>{item.inactiveDt}</td>
  //         <td>{item.fuelType}</td>
          
  //       </tr>
  //     ))}
  //   </tbody>
  // </table> */}

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
  :reportDetails.wayBillTripsList.length==0 && checktabledata?
  <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
    No Data Available
  </div>:""
}

<div style={{ display: 'flex',justifyContent:"center", alignItems: 'center', marginTop: '20px',flexDirection:'column' }}>
            {/* <p style={{marginLeft : '50px', marginRight: '50px' }}>Total Trips Count: {reportDetails.countWayBillTrips}</p>
            <p style={{ color: reportDetails.countWayBillTripsWhereTimeIsNotZero > 0 ? 'red' : 'inherit' }}>
              Number of Trips Violated: {reportDetails.countWayBillTripsWhereTimeIsNotZero}
            </p> */}
            {
              <div style={{ display: 'flex', alignItems: 'center'}}>
              {aftersearch && allreadyfilled?<p style={{color:"red"}}> Penalty/Increment already filled for this month. </p>:""}
             </div>
            }
          
          {
            aftersearch?<>
                   <div style={{ display: 'flex', alignItems: 'center'}}>
                     <p> <span style={{fontWeight:"bold"}}> Total Buses : </span> {allbuslist.length}</p>  
                     <p style={{marginLeft : '50px', marginRight: '50px' }}> <span style={{fontWeight:"bold"}}> Total Inactive Buses : </span> {reportDetails.countWayBillTrips}</p>
                     <p> <span style={{fontWeight:"bold"}}> Availability Percentage : </span> 
                      {(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} 
                      </p>
                     <p style={{marginLeft : '50px', marginRight: '50px' }}>
                      {(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)<=94?
                     <Button onClick={()=>handleButtonClick("penalty")} disabled={allreadyfilled} style={{padding:"10px",backgroundColor:allreadyfilled?"lightgrey":"maroon",color:"white",cursor:"pointer"}}> Penalty </Button>:
                     (((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)>=96?
                     <Button onClick={()=>handleButtonClick("incentive")} disabled={allreadyfilled} style={{padding:"10px",backgroundColor:allreadyfilled?"lightgrey":"#188718",color:"white",cursor:"pointer"}}> Incentive </Button>:""}</p>
                     </div>
            </>:""
          }
          
          </div>


{
  isAddBusOpen?typeformodal==="penalty"?
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
 } from="Availability" availableper={(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} month={month.substring(0,2)} year={year}

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
  // startpunper={startpunctuality()} arrivalpunper={arrivalpunctuality()}
    from="Availability" availableper={(((Number(allbuslist.length)-Number(reportDetails.countWayBillTrips))/Number(allbuslist.length))*100).toFixed(2)} month={month.substring(0,2)} year={year} />:""
}

    </div>
  );
}

export default Busavailablematrics;