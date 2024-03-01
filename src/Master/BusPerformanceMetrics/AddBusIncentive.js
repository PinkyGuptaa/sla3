import { Box, Button, Checkbox, CircularProgress, Fade, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Bus_service from '../../Services/Bus_service';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';
import axios from 'axios';
import Qualitycheckmaster_service from '../../Services/Qualitycheckmaster_service';
import Reasonmaster_service from '../../Services/Reasonmaster_service';
import Penaltymaster_service from '../../Services/Penaltymaster_service';
import Incentivemaster_service from '../../Services/Incentivemaster_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import Driver_service from '../../Services/Driver_service';
import Conductor_service from '../../Services/Conductor_service';
import Slamaster_service from '../../Services/Slamaster_service';
import Environment from '../../Environment/Environment.json'; 
import {toast} from 'react-toastify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Addincentive(props) {

  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [slafor,setSlafor] = useState('');
  const [slafortype,setSlafortype] = useState("Bus");
  const slaForMaster = {"id" : slafor};
  const [slafordetails,setslafordetails] = useState([]);
  // const [complaint,setcomplaint] = useState('');
  const [qualitytype, setQualityType]=useState('')
  const qualityStandardMaster = {"id": qualitytype}
  const [details,setdetails] = useState('');
  const [name,setname] = useState('');
  const actionMaster = {"id": name}
  const [wname, setwname] = useState('');
  const warningMaster = {"id": wname};
  const [gname, setgname] = useState('');
  const genericPenaltyMaster = {"id": gname};

  const [reasonName, setreasonName] = useState('');
  const reasonMaster = {"id": reasonName};
  const [busno, Setbusno] = useState(props.defaultRegNo || '');
  const [qc, Setqc] = useState('');
  const [incentive, setIncentive] = useState('');

  const [busdetails, setbusdetails] = useState([]);
  const [actiondetails,setactiondetails] = useState([]);
  const [warningdetails,setwarningdetails] = useState([]);
  const [genericpenaltydetails,setgenericpenaltydetails] = useState([]);
  const [qcdetails,setqcdetails] = useState([]);
  const [reasondetails,setreasondetails] = useState([]);
  
  const [incentivedetail,setincentivedetail] = useState([]);
  const [incentivePercentage,setIncentivepercentage] = useState("");
  const [remarks,setremarks] = useState('');
  const [agencyname,setagencyname] = useState('');
  const [sladetails,setsladetails] = useState([]);
  const [slaBus, setSlaBus] = useState([]);
 const [selectedSla, setSelectedSla] = useState('');
  const [qualitydetails,setqualitydetails] = useState([]);
  const [filedate,setfiledate] = useState('');
  const [resolvedate,setresolvedate] = useState('');
  const [bycustomer,setbycustomer] = useState('');
  const [complaintid, setcomplaintid] = useState('')
  const customerComplaint = {"complaintid" : complaintid}
  const [complaintdetails,setcomplaintdetails] = useState([]);
  const [byCustomerChecked, setByCustomerChecked] = useState(false);
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;
  const [slaNames, setSlaNames] = useState([]);
  const [slaQuality, setSlaQuality] = useState([]);
  const [slaOptions, setSlaOptions] = useState([]);
  const [slaQualityOptions, setSlaQualityOptions] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [isWarningChecked, setIsWarningChecked] = useState(false);
const [isActionChecked, setIsActionChecked] = useState(false);
const [isGenericPenaltyChecked, setIsGenericPenaltyChecked] = useState(false);
const Base_Url = Environment.Base_Url;
const Base_Url1 = Environment.Base_Url1;
const [pto,setPto] = useState('');
const [ptodetails,setPtodetails] = useState([]);


  useEffect(()=>{
    if(cleanform){
      // setbus('');
      setsla('')
      setdetails('')
      setname('');
      // setpenalty('');
      // setpenaltydetail([]);
      setQualityType('');
      setfiledate('');
      setbycustomer('');
      setresolvedate('')
      setcomplaintid('')

    }
  },[cleanform])

  useEffect(()=>{
    axios.get(`${Base_Url1}/busperformance/getpto`).then((res)=>{
        setPtodetails(res.data);
        
    }).catch((err)=>{
     console.log(err);
    })
  },[])

  useEffect(()=>{
    if(props.updateid){


    Bus_service.getbyid(props.updateid).then((res)=>{
      
      setSlafor(res.data.slaForMaster.id);
      setsla(res.data.slaMaster.id)
      setdetails(res.data.details);
      setname(res.data.actionMaster.id);
      // setpenalty(res.data.penalty);
      // setpenaltydetail(res.data.penaltydetail);
      setQualityType(res.data.qualityStandardMaster.id);
      setfiledate(res.data.filedate);
      setbycustomer(res.data.bycustomer);
      setcomplaintid(res.details.customerComplaint.id);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

  const handleActionChange = (event) => {
    setSelectedAction(event.target.name);
  };
//slafor
useEffect(()=>{
  Slaformaster_service.getAll().then((res)=>{
    setslafordetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

const getSLABus = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/busperformance/getSlaBus`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SLA data:', error);
    throw error;
  }
};

const getQualityBus = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/busperformance/qualityBus/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SLA data:', error);
    throw error;
  }
};

useEffect(() => {

  fetchSlaData('Bus');
}, []);

const fetchSlaData = async (slaforValue) => {
  try {
    const response = await Slamaster_service.getslabyBus(slaforValue); 
    const slaData = response.data;
    setsladetails(slaData);
  } catch (error) {
    console.error('Error fetching SLAs:', error);
  }
};



const handleSlaforChange = async (event) => {
  setSlafor(event.target.value)
  slafordetails.map((data)=>{
    if(data.id===event.target.value){
      setSlafortype(data.slafor)
      console.log(data.slafor)
    }
  })
// console.log(slafortype)
  const selectedSlaForId = event.target.value; 
  console.log(selectedSlaForId)
  if (selectedSlaForId) {
    try {
      const slaBusData = await getSLABus(selectedSlaForId);
      const qualityBusData = await getQualityBus(selectedSlaForId)
      const slaOptions = slaBusData.map((sla) => ({
        id: sla.id,
        slaName: sla.sla,
      }));
      const slaQualityOptions = qualityBusData.map((sla) => ({
        id: sla.id,
        qualitytype: sla.qualitytype,
      }));
      setSlaOptions(slaOptions);
      setSlaQualityOptions(slaQualityOptions)
      console.log(slaOptions)
      console.log(slaQualityOptions)
      console.log('SLA Bus Data:', slaBusData);
    } catch (error) {
      console.error('Error fetching SLA Bus data:', error);
    }
  }
};

const fetchIncentiveRate = (id)=>{
  incentivedetail.map((data)=>{
    if(data.qualityStandardMaster.id===id){
      setIncentive(data.incentive);
      if(props.from==="Schedule"){
        let startpun = Math.floor(props.startpunper);
        let arrivalpun = Math.floor(props.arrivalpunper);
        let startdiff = startpun-90;
        let arrivaldiff = arrivalpun - 80;
        let startincentiveper = startdiff<0?0:startdiff*data.incentive;
        let arrivalincentiveper = arrivaldiff<0?0:arrivaldiff*data.incentive;
      setIncentivepercentage(props.timeformodal==="start"?startincentiveper:arrivalincentiveper);
    }
    else if(props.from==="Availability"){
      let avaiper = Math.floor(props.availableper);
      let diff = avaiper-95;
      let incenper = diff*data.incentive;
      setIncentivepercentage(incenper);
    }
    else if(props.from==="Breakdown"){
      let breakper = props.breakdownper;
      let diff = (0.5-breakper)*10;
      let breakincenper = (diff*data.incentive)*10; 
      setIncentivepercentage(Math.trunc(breakincenper)/10);
      console.log(breakper,diff,breakincenper,data.incentive,diff*data.incentive)
    }
    else if (props.from === "Frequency") {
      let busKmFrequency = Math.floor(props.buskmfrequencyper);
      let tripFrequency = Math.floor(props.frequencyper);
      let buskmdifference = busKmFrequency - 94;
      let buskmincentivepercentage = buskmdifference < 0 ? 0 : buskmdifference * data.incentive;
      let tripfreqdifference = tripFrequency - 94;
      let tripfreqincentivepercentage = tripfreqdifference < 0 ? 0 : tripfreqdifference * data.incentive;
      setIncentivepercentage(
        props.timeformodal !== "tripfrequency" ? buskmincentivepercentage : tripfreqincentivepercentage
      );
      console.log(busKmFrequency,tripFrequency,buskmdifference,buskmincentivepercentage,tripfreqdifference,tripfreqincentivepercentage)
      }
      else if(props.from==="SafetyOperation"){
        console.log(props.minorpercent,props.timeformodal)
        let MinorAccidents = Math.floor(props.minorpercent);
        let majorAccidents = Math.floor(props.majorpercent);
        let minordifference = (0.005-MinorAccidents)*1000;
        let majorpenaltypercent = majorAccidents*0.05;
        let minorpenaltypercent = (minordifference)*0.05;
        console.log(minorpenaltypercent)
        setIncentivepercentage(props.timeformodal!=="majoraccident"?minorpenaltypercent:majorpenaltypercent);
        }
    }
  })
}

useEffect(() => {
  // When the qualitytype changes, make the API call
  if (qualitytype) {
    fetchIncentiveRate(qualitytype);
  }
}, [qualitytype]);

useEffect(()=>{
  Qualitystandardmaster_service.getAll().then((res)=>{
    setqualitydetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])
//
// useEffect(()=>{
//   Bus_service.getSLANames().then((res)=>{
//     setSlaNames(res.data);
//     console.log(res.data)
//   }).catch(err=>console.log(err))
// },[])
useEffect(() => {
  Bus_service.getSLANames()
    .then((res) => {
      const uniqueSlaNames = Array.from(new Set(res.data.map(option => option.slaMaster.sla)))
      .map(sla => {
        return res.data.find(option => option.slaMaster.sla === sla);
      });
      setSlaNames(uniqueSlaNames);
      console.log(uniqueSlaNames);
      console.log(res)
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  Bus_service.getSLANames()
    .then((res) => {
      const uniqueSlaNames = Array.from(new Set(res.data.map(option => option.slaMaster.sla)))
        .map(sla => {
          const foundOption = res.data.find(option => option.slaMaster.sla === sla);
          const agencyName = foundOption.slaMaster.agencyMaster.agencyname;
          return {
            ...foundOption,
            agencyName
          };
        });
      setSlaNames(uniqueSlaNames);

      // Logging unique SLA names and their corresponding agency names
      uniqueSlaNames.forEach(sla => {
        console.log(`SLA: ${sla.slaMaster.sla}, Agency: ${sla.agencyName}`);
      });
    })
    .catch((err) => console.log(err));
}, []);

// useEffect(()=>{
//   Customercomplaint_service.getAll().then((res)=>{
//     setcomplaintdetails(res.data);
//     console.log(res.data)
//   }).catch(err=>console.log(err))
// },[])
//ActionMaster
// useEffect(()=>{
//   Actionmaster_service.getAll().then((res)=>{
//     setactiondetails(res.data);
//     console.log(res.data)
//   }).catch(err=>console.log(err))
// },[])

//WarningMaster
// useEffect(()=>{
//  Warningmaster_service.getAll().then((res)=>{
//     setwarningdetails(res.data);
//     console.log(res.data)
//   }).catch(err=>console.log(err))
// },[])
//Incentive Master 
useEffect(()=>{
  Incentivemaster_service.getAll().then((res)=>{
    setincentivedetail(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])
// get bus no 
useEffect(()=>{
  Bus_service.getAllBus().then((res)=>{
    setbusdetails(res.data);
    // console.log(res.data)
  }).catch(err=>console.log(err))
},[])
useEffect(() => {
  if (props.defaultRegNo) {
    Setbusno(props.defaultRegNo);
    console.log(props.defaultRegNo)
  }
}, [props.defaultRegNo]);

//get qc name 
useEffect(()=>{
  Qualitycheckmaster_service.getAll().then((res)=>{
    setqcdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[]);
//get penalty
// useEffect(()=>{
//   Incentivemaster_service.getAll().then((res)=>{
//     setincentivedetail(res.data);
//     console.log(res.data)
//   }).catch(err=>console.log(err))
// },[]);

useEffect(()=>{
  Reasonmaster_service.getAll().then((res)=>{
    setreasondetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

  const submitbutton = ()=>{
    const fieldempty =   slaForMaster && slaMaster && details && filedate && pto; 
    // && actionMaster &&  penalty && penaltydetail && qualityStandardMaster && filedate && bycustomer  
    ;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={busmasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const busmasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby") ; 
     
    if(props.updateid){
      const busdetails = {
        slaForMaster,
        slaMaster, 
        details, 
        actionMaster, 
        // penalty:parseFloat(penalty), 
        // penaltydetail , 
        qualityStandardMaster, 
        filedate,
        entryby
      };
      console.log(busdetails);
      (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).update(busdetails).then((res)=>{
        props.onClosesuccess();
        // setSnackcolor("#458a32");
        // setErrormessage(" Data Updated Successfully ")
        // setOpensnack(true);
      }).catch(err=>{console.log(err)
        // setSnackcolor("#e34242");
        // setErrormessage("Not able to update data. Please try again later !")
        // setOpensnack(true);
        props.onCloseerror();
      })
     }
     else 
     {
      
      const busdetails = { slaMaster,details, qualityStandardMaster, filedate,incentive,"incentivepercentage":incentivePercentage,"month":props.month,"year":props.year,"ptoid":pto,
        // bycustomer: bycustomer === 'Yes',
        // customerComplaint: bycustomer === 'Yes' ? customerComplaint : null,
        entryby};
        // let warningdetails = {warningMaster};
        // let actiondetails = {actionMaster};
        // let genericdetails = {genericPenaltyMaster};
        // let busdetails = Boolean(wname)?Object.assign(busdetails2,warningdetails):Boolean(name)?Object.assign(busdetails2,actiondetails):Boolean(gname)?Object.assign(busdetails2,genericdetails):"";
        // console.log(wname,name,gname);
      console.log(busdetails);
      (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).addincentive(busdetails).then((res)=>{
        // Bus_service.add(busdetails).then((res)=>{  
     
        setLoading(false);
        // setSnackcolor("#458a32");
        // setErrormessage(" Data Saved Successfully ")
        // setOpensnack(true);
        console.log(slafortype)
        props.onClosesuccess();
      }).catch((err)=>{
        console.log(slafortype)
        console.log(err)
       
        // setSnackcolor("#e34242");
        //  setErrormessage("Not able to submit data. Please try again later!")
        //  setOpensnack(true);      
         setLoading(false);
      
         props.onCloseerror(); 
        //  setTimeout(() => {
        //   props.onClose();  
        //  }, 2000);
        
      })

      // if(slafortype==="Bus"){
      //   Bus_service.add(busdetails).then((res)=>{
      //     props.onClose();
      //     setLoading(false);
      //     setSnackcolor("#458a32");
      //     setErrormessage(" Data Saved Successfully ")
      //     setOpensnack(true);
      // }).catch(err=>{console.log(err)
      //   setSnackcolor("#e34242");
      //   setErrormessage("Not able to submit data. Please try again later!")
      //   setOpensnack(true);      
      //   setLoading(false);   
      // })  
      // }
      // else if(slafortype==="Driver"){
      //   Driver_service.add(busdetails).then((res)=>{
      //     props.onClose();
      //     setLoading(false);
      //     setSnackcolor("#458a32");
      //     setErrormessage(" Data Saved Successfully ")
      //     setOpensnack(true);
      // }).catch(err=>{console.log(err)
      //   setSnackcolor("#e34242");
      //   setErrormessage("Not able to submit data. Please try again later!")
      //   setOpensnack(true);      
      //   setLoading(false);   
      // })
      // }
      // else if(slafortype==="Conductor"){
      //   Conductor_service.add(busdetails).then((res)=>{
      //     props.onClose();
      //     setLoading(false);
      //     setSnackcolor("#458a32");
      //     setErrormessage(" Data Saved Successfully ")
      //     setOpensnack(true);
      // }).catch(err=>{console.log(err)
      //   setSnackcolor("#e34242");
      //   setErrormessage("Not able to submit data. Please try again later!")
      //   setOpensnack(true);      
      //   setLoading(false);   
      // })
      // }
  }
}

const handleptoChange = (e)=>{
  setPto(e.target.value)
 //  console.log(e.target.value);
  sessionStorage.setItem("pto",e.target.value);
}

  const handleSnackClose = ()=>{
    setOpensnack(false);
  };

  const uniqueSlaNames = Array.from(new Set(slaNames.map(option => option.id)))
  .map(id => {
    return slaNames.find(option => option.id === id);
  });

  const handleSlaChange = (e) => {
    const selectedSlaId = e.target.value;
    setsla(selectedSlaId);
  
    
    const selectedSlaData = sladetails.find((sla) => sla.id === selectedSlaId);
    if (selectedSlaData) {
      const agencyMaster = selectedSlaData.agencyMaster;
  
      if (agencyMaster) {
        setagencyname(agencyMaster.agencyname);
        console.log(agencyMaster.agencyname);
      } else {
        console.error('AgencyMaster not found in selectedSlaData:', selectedSlaData);
      }
    }
  };
  // const handleSlaChange = (e) => {
  //   const selectedSlaId = e.target.value;
  //   const selectedSla = slaNames.find(option => option.id === selectedSlaId);
  
  //   if (selectedSla) {
  //     setsla(selectedSla.id);
  //     setagencyname(selectedSla.slaMaster.agencyMaster.agencyname);
  //   } else {
  //     setsla('');
  //     setagencyname('');
  //   }
  // };
  return (
        <div>
          {/* <Snackbar  ContentProps={{
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
  /> */}
      <Modal
            // onClose={handlemodalclose}
            // open={modalopen}
            {...props}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop':{
                backgroundColor: "rgb(0 0 0 / 26%)"
              },
            }}
            >
  <Box sx={style}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
      <Grid item xs={12}>
        <Typography className='heading' id="modal-modal-title" variant="h6" component="h2" color="primary">
           Add Performance Metrics
        </Typography>
     </Grid>
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
    {/* <TextField id="standard-basic" 
      select
      label="SLA For"  
      variant="standard" 
      name='slafor' value={slafor} 
      onChange={handleSlaforChange}
      // onChange={(e)=>setSlafor(e.target.value)} 
      required
        >
  {slafordetails.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.slafor}
        </MenuItem>
      ))}
        </TextField> */}
<TextField
  id="standard-basic"
  label="SLA For"
  variant="standard"
  name="slafor"
  value={slafor || 'Bus'} // Autofill with 'Bus' if slafor is empty
  onChange={handleSlaforChange}
  required
  InputLabelProps={{
    shrink: true,
  }}

/>



      {/* <TextField id="standard-basic" 
      select
      label="SLA"  
      variant="standard" 
      name='sla' value={sla} 
      // onChange={handleSlaChange}
      onChange={(e)=>setsla(e.target.value)} 
      required
        >
    {slaNames.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.slaMaster.sla}
        </MenuItem>
      ))}

        </TextField> */}
   
   <TextField
  id="standard-basic"
  select
  label="SLA"
  variant="standard"
  name='sla'
  value={sla}
  onChange={handleSlaChange}
  required
>
  {sladetails.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.sla}
    </MenuItem>
  ))}
</TextField>
{/* <TextField
  id="standard-basic"
  select
  label="SLA"
  variant="standard"
  name='sla'
  value={sla}
  onChange={handleSlaChange}
  // onChange={(e) => setsla(e.target.value)}
  required
>
  {uniqueSlaNames.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.slaMaster.sla}
    </MenuItem>
  ))}
</TextField> */}

        <TextField id="standard-basic" 
      label="Agency Name" variant="standard" 
      name='agencyname' value={agencyname} 
      onChange={(e)=>setagencyname(e.target.value)} 
      required
        >

        </TextField>
        <TextField id="standard-basic" 
      select
      label="Quality Parameter"  
      variant="standard" 
      name='qualitytype' value={qualitytype} 
      onChange={(e)=>setQualityType(e.target.value)} 
      required
        >

    {incentivedetail.map((option) => (
            <MenuItem key={option.qualityStandardMaster.id} value={option.qualityStandardMaster.id}>
              {option.qualityStandardMaster.qualitytype}
            </MenuItem>
          ))}

        </TextField>

        {/* <TextField id="standard-basic" 
      select
      label="Incentive %"  
      variant="standard" 
      name='incentive' value={incentive} 
      onChange={(e)=>setIncentive(e.target.value)} 
      required
        >

{incentivedetail.map((option) => (
            <MenuItem key={option.incentive} value={option.incentive}>
              {option.incentive}
            </MenuItem>
          ))}

        </TextField> */}

<TextField id="standard-basic" label="Incentive Rate" 
      variant="standard" name='incentive' value={incentive} 
       required 

      />  

<TextField id="standard-basic" label="Incentive Percentage" 
      variant="standard" name='incentivePercentage' value={incentivePercentage} 
       required 

      />

<TextField id="standard-basic" label="Detail" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 

      />   
      

        <TextField id="standard-basic" 
      label="File Date"
      type="date" 
      variant="standard" 
      name='filedate' value={filedate} 
      onChange={(e)=>setfiledate(e.target.value)} 
      required={true} 
      InputLabelProps={{
            shrink: true,
          }}/>

                   <TextField
                    id="standard-basic"
                    select
                    label="Select PTO"
                    variant="standard"
                    name="pto"
                    value={pto}
                    onChange={handleptoChange}
                    // onChange={(e)=>setSlafor(e.target.value)}
                    required
                    sx={{ width: "20ch", margin: "20px" }}
                  >
                    {
                     ptodetails.map((data)=>(
                      <MenuItem key={data.ptoid} value={data.ptoid}>
                      {data.ptostname}:{data.ptoid}
                    </MenuItem>
                     ))
                  }
                   
                   
                  </TextField>

    </Box>
    <Grid item xs={12} sx={{mt:2}}>
      {submitbutton()}
      <div style={{display:"inline"}}>
      <Fade
      in={loading}
      style={{
        transitionDelay: loading ? '50ms' : '0ms',
        marginLeft:"10px",
        marginTop:"10px"
      }}
      unmountOnExit
      >
        <CircularProgress style={{marginLeft:"10px",
        marginTop:"10px"}}/>
        </Fade>
        </div>
    </Grid>
    </Grid>
  </Box>
</Modal>
        </div>
    );
}
export default Addincentive;
