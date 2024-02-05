import { Box, Button, Checkbox, CircularProgress, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddDm(props) {

  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [slafor,setSlafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [complaint,setcomplaint] = useState('');
  const [qualitytype, setQualityType]=useState('')
  const [details,setdetails] = useState('');
  const [instance,setinstance] = useState('');
  const [penalty,setpenalty] = useState('');
  const [penaltydetail,setpenaltydetail] = useState('');
  const [sladetails,setsladetails] = useState([]);
  const [slafordetails,setslafordetails] = useState([]);
  const [qualitydetails,setqualitydetails] = useState([]);
  const [filedate,setfiledate] = useState('');
  const [resolvedate,setresolvedate] = useState('');
  const [bycustomer,setbycustomer] = useState('');
  const [complaintid, setcomplaintid] = useState('')
  const [complaintdetails,setcomplaintdetails] = useState([]);
  const [byCustomerChecked, setByCustomerChecked] = useState(false);
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const [slaOptions, setSlaOptions] = useState([]);
  const [slafortype,setSlafortype] = useState("");
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      // setbus('');
      setsla('')
      setcomplaint('')
      setdetails('')
      setfiledate('');
      setinstance('');
      setpenalty('');
      setpenaltydetail('');
      setQualityType('');
      setbycustomer('');
      setcomplaintid('')
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Bus_service.getbyid(props.updateid).then((res)=>{
      // setbus(res.data.bus);
      setdetails(res.data.detail);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])


//
useEffect(()=>{
  Bus_service.getbyisResolved().then((res)=>{
    setsladetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])


useEffect(()=>{
  Qualitystandardmaster_service.getAll().then((res)=>{
    setqualitydetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])
useEffect(()=>{
  Slaformaster_service.getAll().then((res)=>{
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
useEffect(()=>{
  Slaformaster_service.getAll().then((res)=>{
    setslafordetails(res.data); 
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])





const handleByCustomerChange = (event) => {
  setByCustomerChecked(event.target.checked);
};
const getSLABus = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/busperformance/getbyisresolve`);
    return response.data;
   
  } catch (error) {
    console.error('Error fetching Bus SLA data:', error);
    throw error;
  }
};

const getSLAConductor = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/conductorperformance/getbyisresolve`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Conductor SLA data:', error);
    throw error;
  }
};
const getSLADriver = async (id) => {
  try {
    const response = await axios.get(`http://10.226.33.132:9100/driverperformance/getbyisresolve`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Driver SLA data:', error);
    throw error;
  }
};
const handleSlaforChange = async (event) => {
  setSlafor(event.target.value)
  let slafort;
  slafordetails.forEach((data)=>{
    if(data.id===event.target.value){
      setSlafortype(data.slafor)
      slafort=data.slafor;
     
    }
  })
  console.log(slafortype,slafort)
  const selectedSlaForId = event.target.value; 
  // console.log(selectedSlaForId)
  try{
  if (slafort === 'Bus') {
    // try {
      const slaBusData = await getSLABus();
      setSlaOptions(slaBusData.map((sla)=>({
        id: sla.id,
        slaName: sla.slaMaster?.sla,
        details: sla.details,
        penalty: sla.penalty,
        penaltydetail: sla.penaltydetail
      }))) 
     console.log(slaBusData)
     console.log(slaOptions)
    // } 
    // catch (error) {
    //   console.error('Error fetching SLA Bus data:', error);
    // }
  } else if (slafort === 'Conductor') {
    // try {
      const slaConductorData = await getSLAConductor(); 
      console.log(slaConductorData)
      setSlaOptions(slaConductorData.map((sla)=>({
        
        id: sla.id,
        slaName: sla.slaMaster?.sla,
        details: sla.details,
        penalty: sla.penalty,
        penaltydetail: sla.penaltydetail
      })))
      console.log(slaConductorData)
      console.log(slaOptions)
    // } catch (error) {
    //   console.error('Error fetching SLA Conductor data:', error);
    // }
  } else if (slafort === 'Driver') {
    // try {   
      const slaDriverData = await getSLADriver(); 
      setSlaOptions(slaDriverData.map((sla)=>({
        id: sla.id,
        slaName: sla.slaMaster?.sla,
        details: sla.details,
        penalty: sla.penalty,
        penaltydetail: sla.penaltydetail
      })))
      console.log(slaDriverData)
    // }
    //  catch (error) {
    //   console.error('Error fetching SLA Driver data:', error);
    // }
  }
  
}catch (error) {
  console.error('Error fetching SLA data:', error);
}

}


const submitbutton = () => {
  const fieldempty = sla;
  if (fieldempty) {
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          onClick={busmasterdetails}
          style={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Accept
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={rejectDetails}
          style={{ marginBottom: "20px" }}
        >
          Reject
        </Button>
      </div>
    );
  } else return null;
};


  const busmasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).setisApproved(sla).then((res)=>{

            props.onClose();
            setSnackcolor("#458a32");
            setErrormessage(" Approved ")
            setOpensnack(true);
    
          }).catch(err=>{console.log(err)
            setSnackcolor("#e34242");
            setErrormessage("Not able to update data. Please try again later !")
            setOpensnack(true);
            props.onClose();
          })
  //    if(props.updateid){
  //     const sladetails = {sla , details, instance: parseInt(instance), penalty:parseInt(instance), penaltydetail , qualitytype, filedate, bycustomer: bycustomer === 'Yes'};
  //     console.log(sladetails);
  //     Bus_service.update(props.updateid,sladetails).then((res)=>{
  //       props.onClose();
  //       setSnackcolor("#458a32");
  //       setErrormessage(" Data Updated Successfully ")
  //       setOpensnack(true);

  //     }).catch(err=>{console.log(err)
  //       setSnackcolor("#e34242");
  //       setErrormessage("Not able to update data. Please try again later !")
  //       setOpensnack(true);
  //       props.onClose();
  //     })

  //    }
  //    else 
  //    {
      
  //     const busdetails = {sla , details,  instance: parseInt(instance), penalty:parseInt(instance), penaltydetail , qualitytype, filedate, bycustomer: bycustomer === 'Yes', entryby};
  //     console.log(busdetails);
  //     Bus_service.addsla(busdetails).then((res)=>{
  //       props.onClose();
  //       setLoading(false);
  //       setSnackcolor("#458a32");
  //       setErrormessage(" Data Saved Successfully ")
  //       setOpensnack(true);

  //   }).catch(err=>{console.log(err)
  //     setSnackcolor("#e34242");
  //     setErrormessage("Not able to submit data. Please try again later!")
  //     setOpensnack(true);      
  //     setLoading(false);   
  //   })
  // }

  }

  const rejectDetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    (slafortype==="Bus"?Bus_service:slafortype==="Conductor"?Conductor_service:Driver_service).setisReject(sla).then((res)=>{

    // axios.post(`http://10.226.33.132:9100/busperformance/setisreject/${sla}`).then((res)=>{
            props.onClose();
            setSnackcolor("#e34242");
            setErrormessage(" Rejected ")
            setOpensnack(true);
    
          }).catch(err=>{console.log(err)
            setSnackcolor("#e34242");
            setErrormessage("Not able to update data. Please try again later !")
            setOpensnack(true);
            props.onClose();
          })
  }

  console.log(slaOptions)

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
            >
  <Box sx={style}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
      <Grid item xs={12}>
        <Typography className='heading' id="modal-modal-title" variant="h6" component="h2" color="primary">
           Approval / Reject 
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
              <MenuItem >
         
        </MenuItem>
{slafordetails.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.slafor}
        </MenuItem>
      ))}

        </TextField>
    <TextField 
      id="standard-basic" 
      select
      label="SLA"  
      variant="standard" 
      name='sla' value={sla} 
      onChange={(e)=>setsla(e.target.value)} 
      required
        >
   {slaOptions.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.slaName}
    </MenuItem>
  ))}
        </TextField>
      {/* <TextField id="standard-basic"
      label="Details" 
      variant="standard"  
    value={details} 
    onChange={(e)=>setdetails(e.target.value)} 
      />
 <TextField id="standard-basic"
      label="Instance" 
      variant="standard"  
    value={instance} 
    onChange={(e)=>setinstance(e.target.value)} 
      />
<TextField id="standard-basic"
      label="Penalty" 
      variant="standard"  
    value={penalty} 
    onChange={(e)=>setpenalty(e.target.value)} 
      />
<TextField id="standard-basic"
      label="Penalty Detail" 
      variant="standard"  
    value={penaltydetail} 
    onChange={(e)=>setpenaltydetail(e.target.value)} 
      /> 
<TextField id="standard-basic"
      label="Quality Type" 
      variant="standard"  
    value={qualitytype} 
    onChange={(e)=>setQualityType(e.target.value)} 
      />
<TextField id="standard-basic"
      label="File Date" 
      variant="standard"  
    value={filedate} 
    onChange={(e)=>setfiledate(e.target.value)} 
      /> */}

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

export default AddDm;