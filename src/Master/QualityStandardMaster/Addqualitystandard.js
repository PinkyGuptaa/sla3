import { Box, Button, CircularProgress, Fade, Grid, InputLabel, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QualityStandardMaster_service from '../../Services/Qualitystandardmaster_service';
import Fuelunitmaster_service from '../../Services/Slatypemaster_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import Slamaster_service from '../../Services/Slamaster_service';

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

function Addqualitystandard(props) {
   
  const [qualitytype,setQualityType] = useState('');
  const [details,setDetails] = useState('');
  const [sla,setSla] = useState('');
  const slaMaster = {"id" : sla}
  // const [slaForMaster,setSlaForMaster] = useState('');
  const [sladetails,setsladetails] = useState([]);

  // const [effectFromDt,setEffectfromdt] = useState('');
  // const fuelUnitMaster = {"uuid":fuelunitid};
  // const [checkeffectto,setCheckeffectto] = useState(false);
  // const [dateerrormsg,setDateerrormsg] = useState('')
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const [qualitydetails,setQualitydetails] = useState([]);
  const cleanform = !props.updateid && props.open ;


  useEffect(()=>{
    if(cleanform){
      setQualityType('')
      setDetails('')
      setSla('')
      // setSlaForMaster('')
    }
  },[cleanform])

  useEffect(()=>{
    if(props.updateid){
    QualityStandardMaster_service.getQualitybyid(props.updateid).then((res)=>{
      setQualityType(res.data.qualitytype);
      setDetails(res.data.details);
      setSla(res.data.slaMaster.id)
    }).catch(err=>console.log(err))
  }
  },[props.updateid])

  useEffect(()=>{
    QualityStandardMaster_service.getAll().then((res)=>{
      setQualitydetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    Slamaster_service.getAll().then((res)=>{
      setsladetails(res.data);
    }).catch(err=>console.log(err))
  },[])
  // useEffect(()=>{
  //   if(effectToDt<effectFromDt && effectToDt!==''){
  //     setCheckeffectto(false);
  //     setDateerrormsg("EffectiveTo is Smaller than Effective From")
  //     //alert("EffectiveTo is Smaller than Effective From");
  //   }
  //   else if(effectToDt!==''){
  //     setCheckeffectto(true);
  //     setDateerrormsg('')
  //   }
  // },[effectToDt,effectFromDt])

  const submitbutton = ()=>{
    
          
    const fieldempty = qualitytype && details && slaMaster ;
    if(fieldempty){
      return <Button size="large" variant="contained" onClick={qualitystandardmasterdetails}  >
            Submit
            </Button>           
    }
else return "";

  }
 
  const qualitystandardmasterdetails = (e) =>{
    e.preventDefault();
    setLoading(true);
    let entryby = sessionStorage.getItem("entryby") , depotId = sessionStorage.getItem("depotId"); 

     if(props.updateid){
      const qualitytypedetails = {qualitytype,details,entryby};
      console.log(qualitytypedetails)
      QualityStandardMaster_service.updateQualityType(props.updateid,qualitytypedetails).then((res)=>{
        props.onClose();
        setSnackcolor("#458a32");
        setErrormessage(" Data Updated Successfully ");
        setOpensnack(true);
        setLoading(false);

      }).catch(err=>{console.log(err)
        setSnackcolor("#e34242");
        setErrormessage("Not able to update data. Please try again later !");
        setOpensnack(true);
        //props.onClose();
        setLoading(false);
      })
    }
     else 
     {
     
      const qualitytypedetails = {qualitytype,details,slaMaster,entryby};
      console.log(qualitytypedetails)

      QualityStandardMaster_service.addQualityType(qualitytypedetails).then((res)=>{
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
           Add Quality Parameter
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
      <TextField id="standard-basic" label="Quality Type"
      variant="standard" 
      name='qualitytype' 
      value={qualitytype} 
      
      onChange={(e)=>setQualityType(e.target.value)} 
      required 
     
      />
         <TextField id="standard-basic" label="Details" 
      variant="standard" name='details' value={details} 
      onChange={(e)=>setDetails(e.target.value)} required 
      />
  
{/*    
     <TextField
          
          select
          variant="standard" 
          label="Unit"
          value={fuelunitid}
          onChange={(e)=>setFuelunitid(e.target.value)}
          required={true}
        >
          {unitdetails.map((option) => (
            <MenuItem key={option.uuid} value={option.uuid}>
              {option.fuelunit}
            </MenuItem>
          ))}
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

export default Addqualitystandard;