import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Qualitycheckmaster_service from '../../Services/Qualitycheckmaster_service';
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

function Addqualitycheck(props) {

  const [slafor,setslafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [qcname,setqcname] = useState('');
  const [qcstname,setqcstname] = useState('');
  // const [slafordetails,setslafordetails] = useState([]);
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
      setqcname('');
      setqcstname('');
  
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Qualitycheckmaster_service.getbyid(props.updateid).then((res)=>{
     
      setqcname(res.data.qcname);
      setqcstname(res.data.qcstname);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

 
  
  const submitbutton = ()=>{
    const fieldempty =  qcname && qcstname;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={qualitycheckmasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const qualitycheckmasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby")  

     if(props.updateid){
      const details = {qcname,qcstname,entryby};
      console.log(details);
      Qualitycheckmaster_service.update(props.updateid,details).then((res)=>{
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
      
      const details = {qcname,qcstname,entryby};
      console.log(details);
      Qualitycheckmaster_service.add(details).then((res)=>{
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
           Add Quality Check 
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
      label="Quality Check Name" variant="standard" 
      name='qcname' value={qcname} 
      onChange={(e)=>setqcname(e.target.value)} 
      required
        >

        </TextField>
        <TextField id="standard-basic" 
      label="Quality Check Short Name" variant="standard" 
      name='qcstname' value={qcstname} 
      onChange={(e)=>setqcstname(e.target.value)} 
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

export default Addqualitycheck;