import { Button, Grid, Modal, Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Deleteservice from '../Services/Deleteservice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Deletecomponent(props) {

  const [opensnack,setOpensnack] = useState(false)
  const [snackcolor,setSnackcolor] = useState('');
  const [errormessage,setErrormessage] = useState('');
  const servicename = props.servicename;
    const deleterecord = (id)=>{
        Deleteservice[servicename](id).then((res)=>{
            props.onClose();
            setSnackcolor("#458a32");
        setErrormessage(" Data Deleted Successfully ")
        setOpensnack(true);
        }).catch(err=>{
          setOpensnack(true);  
          props.onClose();
          setSnackcolor("#e34242");
          setErrormessage("Not able to delete data. Please try again later !")
          setOpensnack(true);
          console.log(err)})
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
        <Typography className='heading' id="modal-modal-description" variant="h6" component="h2" color="primary">
           Do You Want To Delete This Record ?
        </Typography>
     </Grid>
     
    
    
    <Grid item xs={12} sx={{mt:2}}>
      <Button sx={{mr:2}} size='large' variant="contained" onClick={deleterecord.bind(this,props.deleteid)}  >
                Yes
      </Button>
      <Button size='large' variant="contained" onClick={props.onClose}  >
                No
      </Button>
    </Grid>
    
   </Grid>
  </Box>

</Modal>
        </div>
    );
}

export default Deletecomponent;