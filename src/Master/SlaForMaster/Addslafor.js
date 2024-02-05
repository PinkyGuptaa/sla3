import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slatypemaster_service from '../../Services/Slatypemaster_service'
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

function Addslafor(props) {

  const [slafor,setslafor] = useState('');
  const [details,setdetails] = useState('');
 
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
      setdetails('')
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Slaformaster_service.getbyid(props.updateid).then((res)=>{
      setslafor(res.data.slafor);
      setdetails(res.data.details);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

 

  const submitbutton = ()=>{
    const fieldempty =  slafor && details;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={slaformasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const slaformasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby")  

     if(props.updateid){
      const sladetails = {slafor,details,entryby};
      console.log(sladetails);
      Slaformaster_service.update(props.updateid,sladetails).then((res)=>{
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
      
      const slafordetails = {slafor,details,entryby};
      console.log(slafordetails);
      Slaformaster_service.addsla(slafordetails).then((res)=>{
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
           Add SLA For Entities
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
      label="SLA Type" 
      variant="standard" 
      name='slatype' 
      value={slatype}
      onChange={(e) => {
        const value = e.target.value;
        setslatype
        (value);
        if (!/^[a-zA-Z]+$/.test(value)) {
          setSlatypeError(true);
        } else {
          setSlatypeError(false);
        }
      }} 
      // onChange={(e)=>setFuelunit(e.target.value)} 
      required 
      error={slatypeerror}
      helperText={
        slatypeerror
          ? 'Enter Valid SLA Type'
          : ''
      }
      /> */}
   
      <TextField id="standard-basic" 
         
      label="Sla For" variant="standard" 
      name='slafor' value={slafor} 
      onChange={(e)=>setslafor(e.target.value)} 
      required
        >
        {/* <MenuItem value="Conductor">Conductor</MenuItem>
        <MenuItem value="Driver">Driver</MenuItem>
        <MenuItem value="Bus">Bus</MenuItem> */}
        </TextField>

<TextField id="standard-basic" label="Detail" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 
      />   
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

export default Addslafor;