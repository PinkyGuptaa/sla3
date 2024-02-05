import { Box, Button, Checkbox, CircularProgress, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Conductor_service from '../../Services/Conductor_service';
import Slamaster from '../SlaMaster/Slamaster';
import Slamaster_service from '../../Services/Slamaster_service';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';
import Customercomplaint_service from '../../Services/Customercomplaint_service';
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

function AddConductor(props) {

  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  // const [complaint,setcomplaint] = useState('');
  const [qualitytype, setQualityType]=useState('')
  const qualityStandardMaster = {"id": qualitytype}
  const [details,setdetails] = useState('');
  const [instance,setinstance] = useState('');
  const [penalty,setpenalty] = useState('');
  const [penaltydetail,setpenaltydetail] = useState('');
  const [sladetails,setsladetails] = useState([]);
  const [slaBus, setSlaBus] = useState([]);
 const [selectedSla, setSelectedSla] = useState('')
  const [qualitydetails,setqualitydetails] = useState([]);
  const [filedate,setfiledate] = useState('');
  const [resolvedate,setresolvedate] = useState('');
  const [bycustomer,setbycustomer] = useState('');
  const [complaint, setcomplaint] = useState('')
  const customerComplaint = {"complaintid" : complaint}
  const [complaintdetails,setcomplaintdetails] = useState([]);
  const [byCustomerChecked, setByCustomerChecked] = useState(false);
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;
  const [slaOptions, setSlaOptions] = useState([]);


  useEffect(()=>{
    if(cleanform){
      // setbus('');
      setsla('')
      setdetails('')
      setinstance('');
      setpenalty('');
      setpenaltydetail('');
      setQualityType('');
      setfiledate('');
      setbycustomer('');
      setresolvedate('')
      setcomplaint('')

    }
  },[cleanform])
  useEffect(()=>{
    if(props.updateid){
    Conductor_service.getbyid(props.updateid).then((res)=>{
      // setbus(res.data.bus);
      setsla(res.data.slaMaster.id);
      setdetails(res.data.details);
      setinstance(res.data.instance);
      setpenalty(res.data.penalty);
      setpenaltydetail(res.data.penaltydetail);
      setQualityType(res.data.qualityStandardMaster.id);
      setfiledate(res.data.filedate);
      setbycustomer(res.data.bycustomer);
// setcomplaint(res.data.complaint)
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

 //get sla where slafor is bus 

 useEffect(()=>{
  Conductor_service.get().then((res)=>{
        setSlaBus(res.data);
      console.log(res.data)
    }).catch(err=>console.log(err))
  },[])

useEffect(()=>{
  Slamaster_service.getAll().then((res)=>{
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
  Customercomplaint_service.getAll().then((res)=>{
    setcomplaintdetails(res.data);
    console.log(res.data)
  }).catch(err=>console.log(err))
},[])

const handleByCustomerChange = (event) => {
  setByCustomerChecked(event.target.checked);
};
const handleSlaChange = (event) => {
    setSelectedSla(event.target.value);
  };
  const submitbutton = ()=>{
    const fieldempty =   slaMaster && details && instance &&  penalty && penaltydetail && qualityStandardMaster && filedate && bycustomer ;
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
    let entryby = sessionStorage.getItem("entryby") , depotId = sessionStorage.getItem("depotId"); 
     if(props.updateid){
      const sladetails = {slaMaster , details, instance: parseInt(instance), penalty:parseInt(instance), penaltydetail , qualityStandardMaster, filedate,entryby};
      console.log(sladetails);
      Conductor_service.update(props.updateid,sladetails).then((res)=>{
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
      
      const busdetails = {slaMaster , details,  instance: parseInt(instance), penalty:parseInt(instance), penaltydetail , qualitytype, filedate, bycustomer: bycustomer === 'Yes', entryby};
      console.log(busdetails);
      Conductor_service.add(busdetails).then((res)=>{
        props.onClose();
        setLoading(false);
        setSnackcolor("#458a32");
        setErrormessage(" Data Saved Successfully ")
        setOpensnack(true);

    }).catch(err=>{console.log(err)
      setSnackcolor("#e34242");
      setErrormessage("Not able to submit data. Please try again later!")
      setOpensnack(true);      
      setLoading(false);   
    })
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
            >
  <Box sx={style}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
      <Grid item xs={12}>
        <Typography className='heading' id="modal-modal-title" variant="h6" component="h2" color="primary">
           Add Details
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
      label="Sla"  
      variant="standard" 
      name='sla' value={selectedSla} 
      onChange={handleSlaChange}
    //   onChange={(e)=>setsla(e.target.value)} 
      required
        >
{slaBus.map((option) => (
        <MenuItem key={option.slaMaster.id} value={option.slaMaster.id}>
          {option.slaMaster.sla}
        </MenuItem>
      ))}

        </TextField>
   
<TextField id="standard-basic" label="Detail" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 

      />   
   <TextField id="standard-basic" label="Instance" 
      variant="standard" name='instance' value={instance} 
      onChange={(e)=>setinstance(e.target.value)} required 
      />    
        <TextField id="standard-basic" label="Penalty" 
      variant="standard" name='penalty' value={penalty} 
      onChange={(e)=>setpenalty(e.target.value)} required 
      />  
      <TextField id="standard-basic" label="Penalty Detail" 
      variant="standard" name='penaltydetail' value={penaltydetail} 
      onChange={(e)=>setpenaltydetail(e.target.value)} required 
      /> 
      <TextField id="standard-basic" 
      select
      label="Quality Standard"  
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
      label="File Date"
      type="date" 
      variant="standard" 
      name='filedate' value={filedate} 
      onChange={(e)=>setfiledate(e.target.value)} 
      required={true} 
      InputLabelProps={{
            shrink: true,
          }}/>

 <Typography component="div" >
    By Customer:
  </Typography>

  <FormControlLabel
    control={
      <Checkbox
        checked={bycustomer === 'Yes'}
        onChange={(e) => setbycustomer(e.target.checked ? 'Yes' : '')}
        color="primary"
      />
    }
    label="Yes"
  />

  <FormControlLabel
    control={
      <Checkbox
        checked={bycustomer === 'No'}
        onChange={(e) => setbycustomer(e.target.checked ? 'No' : '')}
        color="primary"
      />
    }
    label="No"
  />

  {bycustomer === 'Yes' && (
    <TextField
      id="standard-basic"
      select
      label="Customer Complaint"
      variant="standard"
      name="complaint"
      value={complaint}
      onChange={(e) => setcomplaint(e.target.value)}
      required
    >
       {complaintdetails.map((option) => (
    <MenuItem key={option.complaintid} value={option.complaintid}>
      {option.complaint}
    </MenuItem>
  ))}
    </TextField>
  )} 

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
export default AddConductor;
