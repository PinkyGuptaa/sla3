import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slatypemaster_service from '../../Services/Slatypemaster_service'

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

function Addslatype(props) {

  const [slatype,setslatype] = useState('');
  const [detail,setdetail] = useState('');
  const [slatypeerror, setSlatypeError] = useState('')
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      setslatype('');
      setdetail('')
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Slatypemaster_service.getbyid(props.updateid).then((res)=>{
      setslatype(res.data.slatype);
      setdetail(res.data.detail);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

 

  const submitbutton = ()=>{
    const fieldempty =  slatype && detail;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={slatypemasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }

 

  
 
  const slatypemasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby") , depotId = sessionStorage.getItem("depotId"); 

     if(props.updateid){
      const sladetails = {slatype,detail};
      console.log(sladetails);
      Slatypemaster_service.updatesla(props.updateid,sladetails).then((res)=>{
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
      
      const slatypedetails = {slatype,detail,entryby};
      console.log(slatypedetails);
      Slatypemaster_service.addsla(slatypedetails).then((res)=>{
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
           Add SLA Type
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
 {/* <Select
        id="standard-basic"
        label="SLA Type"
        variant="standard"
        name="slatype"
        value={slatype}
        onChange={(e)=>setslatype(e.target.value)} 
        required
      >
        <MenuItem value="customer">Customer SLA</MenuItem>
        <MenuItem value="interval">Interval SLA</MenuItem>
        <MenuItem value="multilevel">Multilevel SLA</MenuItem>
      </Select> */}
      <TextField id="standard-basic" 
         select
      label="Sla Type" variant="standard" 
      name='slatype' value={slatype} 
      onChange={(e)=>setslatype(e.target.value)} 
      required
        >
{/* {slatypedetails.map((option) => ( */}
        <MenuItem value="Customer SLA">Customer SLA</MenuItem>
        <MenuItem value="Internal SLA">Internal SLA</MenuItem>
        <MenuItem value="Multilevel SLA">Multilevel SLA</MenuItem>
        </TextField>
<TextField id="standard-basic" label="Detail" 
      variant="standard" name='details' value={detail} 
      onChange={(e)=>setdetail(e.target.value)} required 

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

export default Addslatype;