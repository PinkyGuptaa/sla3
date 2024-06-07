import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slamaster_service from '../../Services/Slamaster_service'
import Slatypemaster_service from '../../Services/Slatypemaster_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import Agencymaster_service from '../../Services/Agencymaster_service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Addsla(props) {

  const [sla,setsla] = useState('');
  // const [slaError, setslaError] = useState(false);
  const [details,setdetails] = useState('');
  const [penaltyone,setPenaltyone] = useState('');
  const [penaltytwo,setPenaltytwo] = useState('');
  const [penaltythree,setPenaltythree] = useState('');
  const [duration,setDuration] = useState('');
  const [remarks,setRemarks] = useState('');
  // const [slaTypeMaster,setslaTypeMaster] = useState([]);
  const [slatypeid,setslatypeid] = useState('');
  const [slatype,setSlatype] = useState('');
  const slaTypeMaster = {"id": slatype}
  const [slafor,setSlafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [agencyname,setagencyname] = useState('');
  const agencyMaster = {"id" : agencyname}
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [slatypedetails,setslatypedetails] = useState([]);
  const [slafordetails,setslafordetails] = useState([]);
  const [agencydetails,setagencydetails] = useState([]);
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;

  useEffect(()=>{
    if(cleanform){
      setsla('')
      setdetails('')
      setDuration('')
      setSlatype('');
      setSlafor('')
      // setslaForMaster('');
      // setRemarks('')
    }
  },[cleanform])

  useEffect(()=>{
    if(props.updateid){
    Slamaster_service.getslabyid(props.updateid).then((res)=>{
      
      setsla(res.data.sla);   
      setagencyname(res.data.agencyMaster.id)
      setdetails(res.data.details);
      setRemarks(res.data.remarks)
      setDuration(res.data.duration)
      setSlatype(res.data.slaTypeMaster.id)
      setSlafor(res.data.slaForMaster.id)
   
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

  useEffect(()=>{
    Slatypemaster_service.getAll().then((res)=>{
      setslatypedetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    Slaformaster_service.getAll().then((res)=>{
      setslafordetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    Agencymaster_service.getAll().then((res)=>{
      setagencydetails(res.data);
      // console.log(res.data);
    }).catch(err=>console.log(err))
  },[])

const handleagencyname  = async(event) =>{
  setagencyname(event.target.value)


}

  const submitbutton = ()=>{
      
    const fieldempty =  sla &&  details &&  remarks && slaTypeMaster && slaForMaster &&  duration 
    // && !slaNameError && !validTillError;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={slamasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const slamasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby") 
     if(props.updateid){
      const sladetails = {sla,details,duration,remarks, slaTypeMaster, slaForMaster,entryby,agencyMaster};
      console.log(sladetails);
      Slamaster_service.update(props.updateid,sladetails).then((res)=>{
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
      
      const sladetails = {sla,details,duration, remarks, entryby,slaTypeMaster, slaForMaster,agencyMaster};
      console.log(sladetails);
      Slamaster_service.addsla(sladetails).then((res)=>{
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
 

  // const handleValidTillChange = (e) => {
  //   const value = e.target.value;
  //   setValidtill(value);
    
  //   if (new Date(value) < new Date(validFrom)) {
  //     setValidTillError(true);
  //   } else {
  //     setValidTillError(false);
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
            >
  <Box sx={style}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
      <Grid item xs={12}>
        <Typography className='heading' id="modal-modal-title" variant="h6" component="h2" color="primary">
           Add SLA
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
      onChange={(e)=>setSlafor(e.target.value)} 
      required
        >
          {slafordetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.slafor}
            </MenuItem>
          ))}
 </TextField>
 
 <TextField id="standard-basic" 
      label="Agency" variant="standard" 
      select
      name='agencyMaster' value={agencyname} 
      // onchange={handleagencyname}
      onChange={(e)=>setagencyname(e.target.value)} 
      required
        >
    {agencydetails
    .filter((agency) => agency.slaForMaster.id === slafor)
    .map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.agencyname}
      </MenuItem>
    ))}
 </TextField>
      <TextField id="standard-basic" 
      select
      label="SLA Type" variant="standard" 
      name='slaTypeMaster' value={slatype} 
      onChange={(e)=>setSlatype(e.target.value)} 
      required
        >
        {slatypedetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.slatype}
            </MenuItem>
          ))}

        </TextField>
      <TextField id="standard-basic" 
      label="SLA" 
      variant="standard" 
      name='sla' 
      value={sla} 
      onChange={(e)=>setsla(e.target.value)} 
      // onChange={(e) => {
      //   const value = e.target.value;
        
      //   if (/^[a-zA-Z]*$/.test(value)) {
      //     setsla(value);
      //     setslaError(false);
      //   } else {
      //     setslaError(true);
      //   }
      // }}
      
      required 
  //     error={slaError}
  //     helperText={
  //     slaError
  //     ? 'Enter Valid Name'
  //     : ''
  // } inputProps={{ maxLength: 20 }}
      />

      <TextField id="standard-basic" label="Details" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setdetails(e.target.value)} required 
      />

     

      <TextField id="standard-basic" 
      label="Remarks" variant="standard" 

      name='remarks' value={remarks} 
      onChange={(e)=>setRemarks(e.target.value)}  required
        />
         
      <TextField id="standard-basic" 
      label="Duration" variant="standard" 
      name='duration' value={duration} 
      onChange={(e)=>setDuration(e.target.value)} required
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

export default Addsla;