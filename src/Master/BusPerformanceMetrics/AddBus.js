import { Box, Button, Checkbox, CircularProgress, Fade, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Bus_service from '../../Services/Bus_service';
import Slamaster from '../SlaMaster/Slamaster';
import Slamaster_service from '../../Services/Slamaster_service';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';
import Customercomplaint_service from '../../Services/Customercomplaint_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import axios from 'axios';
import Driver_service from '../../Services/Driver_service';
import Conductor_service from '../../Services/Conductor_service';
import Instancemaster_service from '../../Services/Instancemaster_service';
import Actionmaster_service from '../../Services/Actionmaster_service';
import Warningmaster_service from '../../Services/Warningmaster_service';
import Genericpenaltymaster_service from '../../Services/Genericpenaltymaster_service';
import Qualitycheckmaster_service from '../../Services/Qualitycheckmaster_service';
import Reasonmaster_service from '../../Services/Reasonmaster_service';
import Penaltymaster_service from '../../Services/Penaltymaster_service';
import Environment from '../../Environment/Environment.json'; 
const Api_URL = 'http://10.226.33.132:9100';

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

function Addbus(props) {

  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [slafor,setSlafor] = useState('Bus');
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

  const [penalty, setpenalty] = useState('');
  const [penaltyPercentage, setpenaltyPercentage] = useState('');
  const [busdetails, setbusdetails] = useState([]);
  const [actiondetails,setactiondetails] = useState([]);
  const [warningdetails,setwarningdetails] = useState([]);
  const [genericpenaltydetails,setgenericpenaltydetails] = useState([]);
  const [qcdetails,setqcdetails] = useState([]);
  const [reasondetails,setreasondetails] = useState([]);
  
  const [penaltydetail,setpenaltydetail] = useState([]);
  const [remarks,setremarks] = useState('');
  const [agencyname,setagencyname] = useState('');
  const [pto,setPto] = useState('');
  const [ptodetails,setPtodetails] = useState([]);
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
  useEffect(()=>{
    if(cleanform){
      // setbus('');
      setsla('')
      setdetails('')
      setname('');
      setpenalty('');
      setpenaltydetail([]);
      setQualityType('');
      setfiledate('');
      setbycustomer('');
      setresolvedate('')
      setcomplaintid('')

    }
  },[cleanform])

  useEffect(()=>{
    let startpun = Math.ceil(props.startpunper);
    let arrivalpun = Math.ceil(props.arrivalpunper);
    let startdiff = 90-startpun;
    let startpenaltyper = startdiff<0?0:startdiff*2;
    let arrivaldiff = 80-arrivalpun;
    let arrivalpenaltyper = arrivaldiff<0?0:arrivaldiff*2;
    console.log(startpun,arrivalpun,startpenaltyper,arrivalpenaltyper,props.timeformodal); 
  },[props.startpunper,props.arrivalpunper  ])  




  useEffect(()=>{
    if(props.updateid){


    Bus_service.getbyid(props.updateid).then((res)=>{
      
      setSlafor(res.data.slaForMaster.id);
      setsla(res.data.slaMaster.id)
      setdetails(res.data.details);
      setname(res.data.actionMaster.id);
      setpenalty(res.data.penalty);
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

// const handleSlaforChange =(event) =>{
//   setSlafor(event.target.value)
//   Bus_service.getslaBus().then((response) =>{
//     const slaData = response.data
//     console.log(response)
//   })
//   console.log(event.target.value)
// }
const fetchPenaltyRate = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/pmqc/get/${id}`);
    setpenalty(response.data[0].penalty);
    if(props.from==="Schedule"){
      let startpun = Math.ceil(props.startpunper);
      let arrivalpun = Math.ceil(props.arrivalpunper);
      let startdiff = 90-startpun;
      let startpenaltyper = startdiff<0?0:startdiff*response.data[0].penalty;
      let arrivaldiff = 80-arrivalpun;
      let arrivalpenaltyper = arrivaldiff<0?0:arrivaldiff*response.data[0].penalty;
      console.log(response,response.data[0].penalty,id);
      
      setpenaltyPercentage(props.timeformodal==="start"?startpenaltyper:arrivalpenaltyper);
    }
    else if(props.from==="Availability"){
      let avaiper = Math.ceil(props.availableper);
      let diff = 95-avaiper;
      let penalper = diff*response.data[0].penalty;
      setpenaltyPercentage(penalper);
    }
    else if(props.from==="Breakdown"){
      let breakper = props.breakdownper;
      let diff = (breakper-0.5)*10;
      let breakpenalper = (diff*response.data[0].penalty)*10;
      setpenaltyPercentage(Math.trunc(breakpenalper)/10);
      console.log(breakper,diff,breakpenalper,response.data[0].penalty,diff*response.data[0].penalty)
    }
    else if(props.from==="Frequency"){
   let busKmFrequency = Math.ceil(props.buskmfrequencyper);
   let tripFrequency = Math.ceil(props.frequencyper);
   let buskmdifference = 94-busKmFrequency;
   let buskmpenaltypercentage = buskmdifference<0?0:buskmdifference*response.data[0].penalty;
   let tripfreqdifference = 94-tripFrequency;
   let tripfreqpenaltypercentage = tripfreqdifference<0?0:tripfreqdifference*response.data[0].penalty;
   console.log(response,response.data[0].penalty,id,busKmFrequency,tripFrequency,buskmpenaltypercentage,tripfreqpenaltypercentage);
   setpenaltyPercentage(props.timeformodal!=="tripfrequency"?buskmpenaltypercentage:tripfreqpenaltypercentage);
    }
    else if(props.from==="SafetyOperation"){
      console.log(props.minorpercent,props.timeformodal)
      let MinorAccidents = Math.ceil(props.minorpercent);
      let majorAccidents = Math.ceil(props.majorpercent);
      let minordifference = (MinorAccidents-0.01)*100
      let majorpenaltypercent = majorAccidents*2
      let minorpenaltypercent = (minordifference)*2;
      console.log(minorpenaltypercent)
      setpenaltyPercentage(props.timeformodal!=="majoraccident"?minorpenaltypercent:majorpenaltypercent);
      }
      
  } catch (error) {
    console.error('Error fetching penalty rate:', error);
  }
};

useEffect(() => {
  // When the qualitytype changes, make the API call
  if (qualitytype) {
    fetchPenaltyRate(qualitytype);
  }
}, [qualitytype]);

useEffect(()=>{
  axios.get(`${Base_Url1}/busperformance/getpto`).then((res)=>{
      setPtodetails(res.data);
      
  }).catch((err)=>{
   console.log(err);
  })
},[])
// const handleSlaforChange = async (event) => {
//   setSlafor(event.target.value)
//   slafordetails.map((data)=>{
//     if(data.id===event.target.value){
//       setSlafortype(data.slafor)
//       console.log(data.slafor)
//     }
//   })
// // console.log(slafortype)
//   const selectedSlaForId = event.target.value; 
//   console.log(selectedSlaForId)
//   if (selectedSlaForId) {
//     try {
//       const slaBusData = await getSLABus(selectedSlaForId);
//       const qualityBusData = await getQualityBus(selectedSlaForId)
//       const slaOptions = slaBusData.map((sla) => ({
//         id: sla.id,
//         slaName: sla.sla,
//       }));
//       const slaQualityOptions = qualityBusData.map((sla) => ({
//         id: sla.id,
//         qualitytype: sla.qualitytype,
//       }));
//       setSlaOptions(slaOptions);
//       setSlaQualityOptions(slaQualityOptions)
//       console.log(slaOptions)
//       console.log(slaQualityOptions)
//       console.log('SLA Bus Data:', slaBusData);
//     } catch (error) {
//       console.error('Error fetching SLA Bus data:', error);
//     }
//   }
// };

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
// useEffect(() => {
//   Bus_service.getSLANames()
//     .then((res) => {
//       const uniqueSlaNames = Array.from(new Set(res.data.map(option => option.slaMaster.sla)))
//       .map(sla => {
//         return res.data.find(option => option.slaMaster.sla === sla);
//       });
//       setSlaNames(uniqueSlaNames);
//       console.log(uniqueSlaNames);
//       console.log(res)
//     })
//     .catch((err) => console.log(err));
// }, []);
// useEffect(() => {
//   Slamaster_service.getslabyBus()
//     .then((res) => {
//       console.log(res)
//       // const uniqueSlaNames = Array.from(new Set(res.data.map(option => option.slaMaster.sla)))
//       //   .map(sla => {
//       //     const foundOption = res.data.find(option => option.slaMaster.sla === sla);
//       //     const agencyName = foundOption.slaMaster.agencyMaster.agencyname;
//       //     return {
//       //       ...foundOption,
//       //       agencyName
//       //     };
//       //   });
//       // setSlaNames(uniqueSlaNames);

//       // // Logging unique SLA names and their corresponding agency names
//       // uniqueSlaNames.forEach(sla => {
//       //   console.log(`SLA: ${sla.slaMaster.sla}, Agency: ${sla.agencyName}`);
//       // });
//     })
//     .catch((err) => console.log(err));
// }, []);

useEffect(()=>{
  Customercomplaint_service.getAll().then((res)=>{
    setcomplaintdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])
//ActionMaster
useEffect(()=>{
  Actionmaster_service.getAll().then((res)=>{
    setactiondetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

//WarningMaster
useEffect(()=>{
 Warningmaster_service.getAll().then((res)=>{
    setwarningdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])
//Generic Penalty Master 
useEffect(()=>{
  Genericpenaltymaster_service.getAll().then((res)=>{
    setgenericpenaltydetails(res.data);
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

const handleSlaforChange = (e) => {
  const slaforValue = e.target.value;
  setSlafor(slaforValue);
  fetchSlaData(slaforValue);
  setsla(''); 
  setagencyname(''); 
};

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

//get qc name 
useEffect(()=>{
  Qualitycheckmaster_service.getAll().then((res)=>{
    setqcdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[]);
//get penalty
useEffect(()=>{
  Penaltymaster_service.getAll().then((res)=>{
    setpenaltydetail(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[]);

const handleptoChange = (e)=>{
  setPto(e.target.value)
 //  console.log(e.target.value);
  sessionStorage.setItem("pto",e.target.value);
}

// useEffect(()=>{
//   Slamaster_service.getslabyBus().then((res)=>{
//     setsladetails(res.data);
    
//   })
//   .catch((err) => console.log(err));
// }, []);

  const submitbutton = ()=>{
    const fieldempty =   slaForMaster && slaMaster && details && filedate && qualityStandardMaster && pto
    // && actionMaster && genericPenaltyMaster && warningMaster
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
    let entryby = sessionStorage.getItem("entryby"); 
     
    if(props.updateid){
      const busdetails = {
        slaForMaster,
      
        details, 
        actionMaster, 
        penalty:parseFloat(penalty), 
        penaltydetail , 
        qualityStandardMaster, 
        filedate,
        entryby
      };
      console.log(busdetails);
      (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).update(busdetails).then((res)=>{
        console.log(res)
        props.onClose();
        setSnackcolor("#458a32");
        setErrormessage(" Data Updated Successfully ")
        setOpensnack(true);
      }).catch(err=>{console.log(err)
        setSnackcolor("#e34242");
        setErrormessage("Not able to update data. Please try again later !")
        setOpensnack(true);
        props.onClose();
      })
     }
     else 
     {
      
      const busdetails2 = { slaMaster,details, penalty:parseFloat(penalty),"penaltypercentage":penaltyPercentage,qualityStandardMaster, filedate,"ptoid":pto,
       "month":props.month,"year":props.year, 
      // bycustomer: bycustomer === 'Yes',
        // customerComplaint: bycustomer === 'Yes' ? customerComplaint : null,
        entryby};
        let warningdetails = {warningMaster};
        let actiondetails = {actionMaster};
        let genericdetails = {genericPenaltyMaster};
        let busdetails = Boolean(wname)?Object.assign(busdetails2,warningdetails):Boolean(name)?Object.assign(busdetails2,actiondetails):Boolean(gname)?Object.assign(busdetails2,genericdetails):"";
        console.log(wname,name,gname);
      console.log(busdetails);
      (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).add(busdetails).then((res)=>{
        console.log(res)
        // Bus_service.add(busdetails).then((res)=>{  
    
        setLoading(false);
        // setSnackcolor("#458a32");
        // setErrormessage(" Data Saved Successfully ")
        // setOpensnack(true);
        // console.log(slafortype)
        props.onClosesuccess();
      }).catch((err)=>{
        console.log(slafortype)
        console.log(err)
        // setSnackcolor("#e34242");
        //  setErrormessage("Not able to submit data. Please try again later!")
        //  setOpensnack(true);      
         setLoading(false);
         props.onCloseerror();
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
  const handleSnackClose = ()=>{
    setOpensnack(false);
  };
  const uniqueSlaNames = Array.from(new Set(slaNames.map(option => option.id)))
  .map(id => {
    return slaNames.find(option => option.id === id);
  });
  // const handleSlaChange = (e) => {
  //   const selectedSlaId = e.target.value;
  //   const selectedSla = slaNames.find(option => option.id === selectedSlaId);
  //  console.log(selectedSla.id)
  //   if (selectedSla) {
  //     setsla(selectedSla.id);
  //     setagencyname(selectedSla.slaMaster.agencyMaster.agencyname);
  //   } else {
  //     setsla('');
  //     setagencyname('');
  //   }
  // };
  // const handleSlaChange = (e) => {
  //   const selectedSlaName = e.target.value;
  //   setSelectedSla(selectedSlaName);

  //   // Find the selected SLA from the data and set the agency name
  //   const selectedSlaData = sladetails.find((sla) => sla.slaName === selectedSlaName);
  //   if (selectedSlaData) {
  //     setagencyname(selectedSlaData.agencyName);
  //   }
  // };
  return (
        <div>
          <Snackbar  ContentProps={{
    sx: {
      background: snackcolor,
      color:'white',
      padding:"15px",
      letterSpacing:"1.5px",
      fontWeight:"500",
      textAlign:"center"

    }
  }}
  anchorOrigin={{vertical:'top',horizontal:'center'}}
  open={opensnack}
  autoHideDuration={6000}
  onClose={handleSnackClose}
  message={errormessage}
  />
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
  // value={slafor || 'Bus'} // Autofill with 'Bus' if slafor is empty
  value={slafor}
  onChange={handleSlaforChange}
  required
  InputLabelProps={{
    shrink: true,
  }}

/> 
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

        <TextField id="standard-basic" 
      label="Agency Name" variant="standard" 
      name='agencyname' value={agencyname} 
      onChange={(e)=>setagencyname(e.target.value)} 
      required
       />

        
        <TextField id="standard-basic" 
      select
      label="Quality Parameter"  
      variant="standard" 
      name='qualitytype' value={qualitytype} 
      onChange={(e)=>setQualityType(e.target.value)} 
      required
        >

    {qualitydetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.qualitytype}
            </MenuItem>
          ))}

        </TextField>
        <TextField id="standard-basic" 
      label="Penalty Rate"  
      variant="standard" 
      name='penalty' value={penalty} 
      onChange={(e)=>setpenalty(e.target.value)} 
      required
        >
        </TextField>
        <TextField id="standard-basic" 
      label="Penalty %"  
      variant="standard" 
      name='penaltyPercentage' value={penaltyPercentage} 
      onChange={(e)=>setpenaltyPercentage(e.target.value)} 
      required
        >
        </TextField>
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
{/* <TextField  id="standard-basic" 
      label="Select Bus No." variant="standard" 
      name='busno' value={busno} 
      onChange={(e)=>Setbusno(e.target.value)} 
      required
       /> */}

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
            
          


<FormControl component="fieldset" style={{width:"80%",flexDirection:"row",alignItems:'center',left:"-20px"}}>
        <FormLabel>Action Taken</FormLabel>
        <FormGroup style={{flexDirection:"row",marginLeft:"20px"}}>
          <FormControlLabel
            control={
              <Checkbox
              checked={isWarningChecked}
              onChange={(e) => {
                setIsWarningChecked(e.target.checked);
                setIsActionChecked(false);
                setname('')
                setgname('')
                setIsGenericPenaltyChecked(false);
              }}
                name="warning"
                color="primary"
              />
            }
            label="Warning"
          />
          <FormControlLabel
            control={
              <Checkbox
              checked={isActionChecked}
              onChange={(e) => {
                setIsActionChecked(e.target.checked);
                setIsWarningChecked(false);
                setwname('')
                setgname('')
                setIsGenericPenaltyChecked(false);
              }}
                name="action"
                color="primary"
              />
            }
            label="Action"
          />
          <FormControlLabel
            control={
              <Checkbox
              checked={isGenericPenaltyChecked}
              onChange={(e) => {
                setIsGenericPenaltyChecked(e.target.checked);
                setIsWarningChecked(false);
                setIsActionChecked(false);
                setname('')
                setwname('')
              }}
                name="genericPenalty"
                color="primary"
              />
            }
            label="Generic Penalty"
          />
        </FormGroup>
      </FormControl>
    

      {isWarningChecked?  <TextField id="standard-basic" 
      select
      label="Warnings Name"  
      variant="standard" 
      name='wname' value={wname} 
      onChange={(e)=>setwname(e.target.value)} 
      required
      disabled={!isWarningChecked}
        >

      {warningdetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name.toUpperCase()}
            </MenuItem>
          ))}

        </TextField>:""
}


        {isActionChecked?<TextField id="standard-basic" 
      select
      label="Actions"  
      variant="standard" 
      name='name' value={name} 
      onChange={(e)=>setname(e.target.value)} 
      required
      disabled={!isActionChecked}
        >

{actiondetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name.toUpperCase()}
            </MenuItem>
          ))}

        </TextField>:""}

       {isGenericPenaltyChecked? <TextField id="standard-basic" 
      select
      label="Generic Penalties"  
      variant="standard" 
      name='gname' value={gname} 
      onChange={(e)=>setgname(e.target.value)} 
      required
      disabled={!isGenericPenaltyChecked}
        >

{genericpenaltydetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name.toUpperCase()}
            </MenuItem>
          ))}

        </TextField>:''}

        {/* <TextField id="standard-basic" 
      select
      label="Reason"  
      variant="standard" 
      name='reasonName' value={reasonName} 
      onChange={(e)=>setreasonName(e.target.value)} 
      required
     
        >

{reasondetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}

        </TextField> */}
    
     
{/* <div style={{display:"flex",marginLeft:"55px"}}>
 <Typography component="div" style={{display:"flex",marginRight:"20px",alignItems:"center"}}>
    By Customer:
  </Typography>

  <FormControlLabel
    control={
      <Checkbox
        checked={bycustomer === 'Yes'}
        onChange={(e) => setbycustomer(e.target.checked ? 'Yes' : 'No')}
        color="primary"
      />
    }
    label="Yes"
  />

  <FormControlLabel
    control={
      <Checkbox
        checked={bycustomer === 'No'}
        // onChange={(e) => {
        //   setbycustomer(e.target.checked ? 'No' : 'Yes');
        //   if (!e.target.checked) {
        //     // Set complaintid to represent 'No' or an empty string when 'No' is selected
        //     setcomplaintid('No'); // Or setcomplaintid('') for an empty string
        //   }
        // }}
        onChange={(e) => setbycustomer(e.target.checked ? 'No' : 'Yes')}
        color="primary"
        
      />
    }
    label="No"
  />
  </div>

  {bycustomer === 'Yes' && (
    <TextField
      id="standard-basic"
      select
      label="Customer Complaint"
      variant="standard"
      name="complaint"
      value={complaintid}
      onChange={(e) => setcomplaintid(e.target.value)}
      required
    >
     
    
      {complaintdetails.map((option) => (
    <MenuItem key={option.complaintid} value={option.complaintid}>
      {option.complaintid}
    </MenuItem>
  ))}
    </TextField>
    
  )}   */}

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
export default Addbus;
