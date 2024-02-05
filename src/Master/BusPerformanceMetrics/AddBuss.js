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
  const [slafor,setSlafor] = useState('');
  const [slafortype,setSlafortype] = useState("");
  const slaForMaster = {"id" : slafor}
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
  const [busno, Setbusno] = useState('');
  const [qc, Setqc] = useState('');
  const [busdetails, setbusdetails] = useState([]);
  const [actiondetails,setactiondetails] = useState([]);
  const [warningdetails,setwarningdetails] = useState([]);
  const [genericpenaltydetails,setgenericpenaltydetails] = useState([]);
  const [qcdetails,setqcdetails] = useState([]);
  const [reasondetails,setreasondetails] = useState([]);
  const [penalty,setpenalty] = useState('');
  const [penaltydetail,setpenaltydetail] = useState('');
  const [remarks,setremarks] = useState('');
  const [sladetails,setsladetails] = useState([]);
  const [slaBus, setSlaBus] = useState([]);
  const [selectedSla, setSelectedSla] = useState('')
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
  const [slaOptions, setSlaOptions] = useState([]);
  const [slaQualityOptions, setSlaQualityOptions] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [isWarningChecked, setIsWarningChecked] = useState(false);
const [isActionChecked, setIsActionChecked] = useState(false);
const [isGenericPenaltyChecked, setIsGenericPenaltyChecked] = useState(false);

  useEffect(()=>{
    if(cleanform){
      // setbus('');
      setsla('')
      setdetails('')
      setname('');
      setpenalty('');
      setpenaltydetail('');
      setQualityType('');
      setfiledate('');
      setbycustomer('');
      setresolvedate('')
      setcomplaintid('')

    }
  },[cleanform])
  useEffect(()=>{
    if(props.updateid){


    Bus_service.getbyid(props.updateid).then((res)=>{
      
      setSlafor(res.data.slaForMaster.id);
      setsla(res.data.slaMaster.id)
      setdetails(res.data.details);
      setname(res.data.actionMaster.id);
      setpenalty(res.data.penalty);
      setpenaltydetail(res.data.penaltydetail);
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
    const response = await axios.get(`http://10.226.33.132:9100/busperformance/slaBus/${id}`);
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

useEffect(()=>{
  Qualitystandardmaster_service.getAll().then((res)=>{
    setqualitydetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

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
//get qc name 
useEffect(()=>{
  Qualitycheckmaster_service.getAll().then((res)=>{
    setqcdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[]);

useEffect(()=>{
  Reasonmaster_service.getAll().then((res)=>{
    setreasondetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

  const submitbutton = ()=>{
    const fieldempty =   slaForMaster && slaMaster && details 
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
        penalty, 
        penaltydetail , 
        qualityStandardMaster, 
        filedate,
        entryby
      };
      console.log(busdetails);
      (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).update(busdetails).then((res)=>{
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
      
      const busdetails2 = { busno,slaMaster,details, qc, reasonMaster,qualityStandardMaster, filedate, 
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
        props.onClose();
        setLoading(false);
        setSnackcolor("#458a32");
        setErrormessage(" Data Saved Successfully ")
        setOpensnack(true);
        console.log(slafortype)
      }).catch((err)=>{
        console.log(slafortype)
        setSnackcolor("#e34242");
         setErrormessage("Not able to submit data. Please try again later!")
         setOpensnack(true);      
         setLoading(false);
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
      
    <TextField id="standard-basic" 
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
        </TextField>

      <TextField id="standard-basic" 
      select
      label="SLA"  
      variant="standard" 
      name='sla' value={sla} 
      // onChange={handleSlaChange}
      onChange={(e)=>setsla(e.target.value)} 
      required
        >
  {slaOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.slaName}
        </MenuItem>
      ))}

        </TextField>
        <TextField id="standard-basic" 
      select
      label="Quality Parameter"  
      variant="standard" 
      name='qualitytype' value={qualitytype} 
      onChange={(e)=>setQualityType(e.target.value)} 
      required
        >

{slaQualityOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.qualitytype}
            </MenuItem>
          ))}

        </TextField>
        
<TextField id="standard-basic" label="Detail" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 

      />   
      <TextField id="standard-basic" 
      select
      label="Quality Check"  
      variant="standard" 
      name='qcname' value={qc} 
      onChange={(e)=>Setqc(e.target.value)} 
      required
        >

{qcdetails.map((option) => (
            <MenuItem key={option.id} value={option.qcname}>
              {option.qcname}
            </MenuItem>
          ))}

        </TextField>
<TextField  id="standard-basic" 
      label="Select Bus No." variant="standard" 
        select
      name='busno' value={busno} 
      onChange={(e)=>Setbusno(e.target.value)} 
      required
        >
            
          {busdetails.map((option) => (
            <MenuItem key={option.regno} value={option.regno}>
              {option.regno}
            </MenuItem>
          ))}
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
              {option.name}
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
              {option.name}
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
              {option.name}
            </MenuItem>
          ))}

        </TextField>:''}

        <TextField id="standard-basic" 
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

        </TextField>
    

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
