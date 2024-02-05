import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Agencymaster_service from '../../Services/Agencymaster_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
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

function AddAgency(props) {

  const [slafor,setslafor] = useState('');
  const slaForMaster = {"id" : slafor}

  const [agencyname,setagencyname] = useState('');
  const [agencystname,setagencystname] = useState('');
  const [slafordetails,setslafordetails] = useState([]);
  // const [validTill,setValidtill] = useState('');
  // const [validFrom,setValidfrom] = useState('');
  // const [depotCode,setDepotcode] = useState('');
  const [slatypeerror, setSlatypeError] = useState('')
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      setslafor('');
      setagencyname('');
      setagencystname('');
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Agencymaster_service.getbyid(props.updateid).then((res)=>{
      setslafor(res.data.slaForMaster.id);
      setagencyname(res.data.agencyname);
      setagencystname(res.data.agencystname);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

 
  useEffect(()=>{
    Slaformaster_service.getAll().then((res)=>{
      setslafordetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  const submitbutton = ()=>{
    const fieldempty =  slaForMaster && agencyname && agencystname;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={agencymasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const agencymasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby")  

     if(props.updateid){
      const details = {slaForMaster,agencyname,agencystname,entryby};
      console.log(details);
      Agencymaster_service.update(props.updateid,details).then((res)=>{
        console.log("first")
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
      
      const details = {slaForMaster,agencyname,agencystname,entryby};
      console.log(details);
      Agencymaster_service.add(details).then((res)=>{
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
           Add Agency 
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
      label="SLA For" variant="standard" 
select
      name='slaForMaster' value={slafor} 
      onChange={(e)=>setslafor(e.target.value)} 
      required
        >
          {slafordetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.slafor}
            </MenuItem>
          ))}
 </TextField>
      <TextField id="standard-basic" 
      label="Agency Name" variant="standard" 
      name='agencyname' value={agencyname} 
      onChange={(e)=>setagencyname(e.target.value)} 
      required
        >

        </TextField>
        <TextField id="standard-basic" 
      label="Agency Short Name" variant="standard" 
      name='agencystname' value={agencystname} 
      onChange={(e)=>setagencystname(e.target.value)} 
      required
        >
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

export default AddAgency;