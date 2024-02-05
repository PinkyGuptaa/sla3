import { Box, Button, Checkbox, CircularProgress, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Bus_service from '../../Services/Bus_service';
import Conductor_service from '../../Services/Conductor_service';
import Driver_service from '../../Services/Driver_service';
import Slamaster from '../SlaMaster/Slamaster';
import Slamaster_service from '../../Services/Slamaster_service';
import Qualitystandardmaster_service from '../../Services/Qualitystandardmaster_service';
import Customercomplaint_service from '../../Services/Customercomplaint_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import axios from 'axios';
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

function Approval(props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [slafor,setSlafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [complaint,setcomplaint] = useState('');
  const [qualitytype, setQualityType]=useState('')
  const [details,setdetails] = useState('');
  const [instance,setinstance] = useState('');
  const [penalty,setpenalty] = useState('');
  const [remarks,setremarks] = useState('');
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
//   const [approvalid, setapprovalid] = useState(props.updateid);
  const approvalid =  props.updateid;
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


  const busmasterdetails = (id) =>{
    console.log('clicked');
    console.log("g",approvalid);

    axios.put(`http://10.226.33.132:9100/busperformance/setacceptflag/${approvalid}/${remarks}`).then((res)=>{
        props.onClose();
        setSnackcolor("#458a32");
        setErrormessage(" Approved ")
        setOpensnack(true);
      }).catch(err=>{
        console.log(err);
        setSnackcolor("#e34242");
        setErrormessage("Not able to update data. Please try again later !")
        setOpensnack(true);
        props.onClose();
      })
    // var details = remarks;
    return (e) => {
      e.preventDefault();
    //   setLoading(true);
    //     axios.put(`http://10.226.33.132:9100/busperformance/setacceptflag/${approvalid}/${remarks}`).then((res)=>{
    //     props.onClose();
    //     setSnackcolor("#458a32");
    //     setErrormessage(" Approved ")
    //     setOpensnack(true);
    //   }).catch(err=>{
    //     console.log(err);
    //     setSnackcolor("#e34242");
    //     setErrormessage("Not able to update data. Please try again later !")
    //     setOpensnack(true);
    //     props.onClose();
    //   })
    };
  };


 useEffect(()=>{
    let id= props.updateid;
    console.log("hduhf",props.updateid)
    console.log('new',approvalid);
}, [props.updateid])

const submitbutton = () => {
  const fieldempty = remarks;
  if (fieldempty) {
    console.log("Row ID:", approvalid);
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          onClick={busmasterdetails}
        //   onClick={handleApproval.bind(this, props.rowId)}
          style={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Accept
        </Button>
        {/* <Button
          size="large"
          variant="contained"
          onClick={rejectDetails}
          style={{ marginBottom: "20px" }}
        >
          Reject
        </Button> */}
      </div>
    );
  } else return null;
};






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
           Approval
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


    <TextField 
      id="standard-basic" 
      label="Remarks"  
      variant="standard" 
      name='remarks' value={remarks} 
      onChange={(e)=>setremarks(e.target.value)} 
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
export default Approval