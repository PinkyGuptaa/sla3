import { Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Actionmaster_service from '../../Services/Actionmaster_service';
import Penaltymaster_service from '../../Services/Penaltymaster_service';
import Slamaster_service from '../../Services/Slamaster_service';
import Qualitycheckmaster_service from '../../Services/Qualitycheckmaster_service';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';

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

function AddPenalty(props) {

  const [sla,setSla] = useState('');
  const slaMaster = {"id" : sla}
  const [sladetails,setsladetails] = useState([]);
  const [qcname,setqcname] = useState('');
  const qcPerformance = {"id" : qcname}
  const [qualitycheckdetails,setqualitycheckdetails] = useState([]);
  const [qualitytype, setQualityType]=useState('')
  const qualityStandardMaster = {"id": qualitytype}
  // const [stname,setstname] = useState('');
  const [penalty,setpenalty] = useState('');
  // const [slafordetails,setslafordetails] = useState([]);
  // const [validTill,setValidtill] = useState('');
  // const [validFrom,setValidfrom] = useState('');
  // const [depotCode,setDepotcode] = useState('');
  // const [slatypeerror, setSlatypeError] = useState('')
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      setSla('')
      setQualityType('')
      setpenalty('');
      // setpenalty('');
    }
  },[cleanform])



  useEffect(()=>{
    if(props.updateid){
    Penaltymaster_service.getbyid(props.updateid).then((res)=>{
      setSla(res.data.slaMaster.id)
      setQualityType(res.data.qualityStandardMaster.id);
      setpenalty(res.data.penalty);
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

  useEffect(()=>{
    Slamaster_service.getAll().then((res)=>{
      setsladetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    Qualitystandardmaster_service.getAll().then((res)=>{
      setqualitycheckdetails(res.data);
      console.log(res.data)
    }).catch(err=>console.log(err))
  },[])
  
  const submitbutton = ()=>{
    const fieldempty = slaMaster && qualityStandardMaster && penalty ;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={penaltymasterdetails} style={{marginBottom:"20px"}} >
            Submit
            </Button>           
    }
else return "";
  }
  const penaltymasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby")  

     if(props.updateid){
      const details = {  slaMaster,qualityStandardMaster,penalty,entryby};
      console.log(details);
      Penaltymaster_service.update(props.updateid,details).then((res)=>{
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
      
      const details = {  slaMaster,qualityStandardMaster,penalty,entryby};
      console.log(details);
      Penaltymaster_service.add(details).then((res)=>{
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
           Add Penalty 
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
      label="SLA" variant="standard" 
select
      name='sla' value={sla} 
      onChange={(e)=>setSla(e.target.value)} 
      required
        >
          {sladetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.sla}
            </MenuItem>
          ))}

        </TextField>

        <TextField id="standard-basic" 
      label="Quality Check" variant="standard" 
select
      name='qualitytype' value={qualitytype} 
      onChange={(e)=>setQualityType(e.target.value)} 
      required
        >
          {qualitycheckdetails.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.qualitytype}
            </MenuItem>
          ))}

        </TextField>
        <TextField id="standard-basic" 
      label="Penalty" variant="standard" 
      name='penalty' value={penalty} 
      onChange={(e)=>setpenalty(e.target.value)} 
      required
        >
        </TextField>
        {/* <TextField id="standard-basic" 
      label="Penalty (%)" variant="standard" 
      name='penalty' value={penalty} 
      onChange={(e)=>setpenalty(e.target.value)} 
      required
        >
        </TextField> */}
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

export default AddPenalty;