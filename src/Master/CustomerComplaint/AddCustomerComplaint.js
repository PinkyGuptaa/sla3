import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Customercomplaint_service from '../../Services/Customercomplaint_service';
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

function AddCustomerComplaint(props) {

  const [complaint,setcomplaint] = useState('');
  const [details,setdetails] = useState('');
  const [slafor,setslafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [date,setdate] = useState('');
  const [location,setlocation] = useState('');
  const [slatypeerror, setSlatypeError] = useState('')
  const [slafordetails,setslafordetails] = useState([]);
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      setcomplaint('');
      setdetails('');
      setslafor('');
      setdate('');
      setlocation('');
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Customercomplaint_service.getbyid(props.updateid).then((res)=>{
      console.log(res.data)
      setcomplaint(res.data.complaint);
      setdetails(res.data.details);
      setslafor(res.data.slaForMaster.id);
      setdate(res.data.date);
      setlocation(res.data.location);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

  useEffect(()=>{
    Slaformaster_service.getAll().then((res)=>{
      setslafordetails(res.data);
    }).catch(err=>console.log(err))
  },[])

  const submitbutton = ()=>{
    const fieldempty =  complaint && details && slaForMaster && date && location;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={customercomplaintdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }

 

  
 
  const customercomplaintdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby") , depotId = sessionStorage.getItem("depotId"); 
  
     if(props.updateid){
      const complaintdetails = {complaint,details, slaForMaster, location, date,entryby};
      console.log(complaintdetails);
      Customercomplaint_service.update(props.updateid,complaintdetails).then((res)=>{
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
      
      const customerdetails = {complaint,details,slaForMaster, location, date,entryby};
      console.log(customerdetails);
      Customercomplaint_service.add(customerdetails).then((res)=>{
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
           Add Customer Complaint
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
      label="Complaint For" variant="standard" 
select
      name='complaintfor' value={slafor} 
      onChange={(e)=>setslafor(e.target.value)} 
      required
        >
          {slafordetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.slafor}
            </MenuItem>
          ))}

        </TextField>
   <TextField id="standard-basic" label="Complaint" 
      variant="standard" name='complaint' value={complaint} 
      onChange={(e)=>setcomplaint(e.target.value)} required 
      /> 
      <TextField id="standard-basic" label="Details" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 
      />   
      

        <TextField id="standard-basic" 
      label="Date"
      type="date" 
      variant="standard" 
      name='date' value={date} 
      onChange={(e)=>setdate(e.target.value)} 
      required={true} 
      InputLabelProps={{
            shrink: true,
          }}/>
  <TextField id="standard-basic" label="Location" 
      variant="standard" name='loaction' value={location} 
      onChange={(e)=>setlocation(e.target.value)} required 
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

export default AddCustomerComplaint;