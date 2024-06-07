import { Box, Button, Checkbox, CircularProgress, Fade, FormControlLabel, Grid, MenuItem, Modal, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';


import Invoice_services from '../../Services/Invoice_services';
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

function Updateinvoice(props) {

  const [slafor,setslafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const updatedata = props.updateid;
  const [agencyname,setagencyname] = useState('');
  const [agencystname,setagencystname] = useState('');
  const [slafordetails,setslafordetails] = useState([]);
  const [invoiceNo,setInvoiceno] = useState("")
  const [invoiceDate,setInvoicedate] = useState("")
  const [totalamount,setTotalamount] = useState("")
  const [delayed,setDelayed] = useState(false)
  const [remarks,setRemarks] = useState("")
  const [amtreceived,setAmount] = useState("");
  const [disableamount,setDisableamount] = useState(false);
  const [disabledelay,setDisabledelay] = useState(false);
  // const [validTill,setValidtill] = useState('');
  // const [validFrom,setValidfrom] = useState('');
  // const [depotCode,setDepotcode] = useState('');
  const [slatypeerror, setSlatypeError] = useState('')
  const [opensnack,setOpensnack] = useState(false)
  const [errormessage,setErrormessage] = useState('');
  const [snackcolor,setSnackcolor] = useState('');
  const [loading,setLoading] = useState(false)
  const cleanform = !props.updateid && props.open ;


  // useEffect(()=>{
  //   if(cleanform){
  //     setslafor('');
  //     setagencyname('');
  //     setagencystname('');
  //   }
  // },[cleanform])



  useEffect(()=>{
    if(props.updateid){
      setInvoiceno(updatedata.invoiceNo?.invoiceno)
      setInvoicedate(updatedata.invoiceNo?.invoicedate)
      setTotalamount(updatedata.amttoreceived)
      setDelayed(updatedata.delayed);
      setRemarks(updatedata.remarks??"");
      setAmount(updatedata.amttoreceived)
      updatedata.delayed==true?setDisabledelay(true):setDisabledelay(false);
  }
  },[props.updateid])

  const oncheckboxchange = ()=>{
    console.log(delayed)
    setDelayed(!delayed);
    delayed==true?setAmount(updatedata.amttoreceived):setAmount(0);

    delayed?setDisableamount(false):setDisableamount(true);
  }

 

  const submitbutton = ()=>{
    const fieldempty =  delayed && remarks || amtreceived;
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
    // let entryby = sessionStorage.getItem("entryby")  

     if(props.updateid){
      const details = disableamount==true?{"id":updatedata.id,delayed,remarks,"amtreceived":0}:{"id":updatedata.id,amtreceived};
      console.log(details);
   

      Invoice_services.update(details).then((res)=>{
        console.log("first")
        // props.onClose();
        setSnackcolor("#458a32");
        setErrormessage(" Data Updated Successfully ")
        setOpensnack(true);
      setLoading(false);

        props.onClose();

      }).catch(err=>{console.log(err)
        setSnackcolor("#e34242");
        setErrormessage("Not able to update data. Please try again later !")
        setOpensnack(true);
           setLoading(false);

        // props.onClose();
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
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} >
      <Grid item xs={12} style={{display:"flex",justifyContent:"center"}} >
        <Typography className='heading' id="modal-modal-title" variant="h6" component="h2" color="primary" style={{margin:"5px 0 15px 0"}}>
           Update Invoice
        </Typography>
     </Grid>
     
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
      style={{display: "flex",flexDirection: "column",width: "-webkit-fill-available",marginLeft:"20px"}}
    >
<div style={{display: "flex",width: "-webkit-fill-available",justifyContent:"space-around"}}>
<TextField id="standard-basic" 
      label="Invoice No." variant="standard" 
      name='invoiceNo' 
      value={invoiceNo} 
     
      sx={{
        '& > :not(style)': {  width: '20ch' },
      }}
      style={{marginRight:"20px"}}
        />

<TextField id="standard-basic" 
      label="Invoice Date" variant="standard" 
      name='invoiceDate' 
      value={invoiceDate} 
 
      sx={{
        '& > :not(style)': {  width: '20ch' },
      }}
      style={{marginRight:"20px"}}
        />

<TextField id="standard-basic" 
      label="Total Invoice Amount" variant="standard" 
      name='totalamount' 
      value={totalamount} 
   

      sx={{
        '& > :not(style)': {  width: '20ch'},
      }}
      style={{marginRight:"20px"}}
        />
</div>

 <br />
{/*      

        <TextField id="standard-basic" 
      label="Invoice Date"
      type="date" 
      variant="standard" 
      name='invoiceDate' value={invoiceDate} 
      onChange={(e)=>setfiledate(e.target.value)} 
      required={true} 
      InputLabelProps={{
            shrink: true,
          }}/> */}
<div style={{display: "flex",width: "-webkit-fill-available",justifyContent:"space-around"}}>
<FormControlLabel
                    control={
                      <Checkbox
                        checked={delayed}
                        onChange={oncheckboxchange}
                        disabled={disabledelay}
                      />
                    }
                    labelPlacement="top"
                    label="Check for Delay"
                    style={{marginRight:"10px",width:"150px"}}
                  />

<TextField id="standard-basic" 
      label="Remarks" variant="standard" 
      name='remarks' 
      value={remarks} 
      multiline
      maxRows={3}
      onChange={(e)=>setRemarks(e.target.value)} 
      required
      disabled={disabledelay}
      style={{marginRight:"10px"}}
        />

<TextField id="standard-basic" 
      label="Amount" variant="standard" 
      name='amtreceived' 
      value={amtreceived} 
      // onChange={(e)=>setAmount(e.target.value)} 
      required
      disabled={disableamount}
        />


</div>


{/* <TextField id="standard-basic" 
      label="Amount Left" variant="standard" 
      name='' 
      value={bal_amount} 
      onChange={(e)=>setagencyname(e.target.value)} 
      required
        /> */}



        
  {/* <TextField id="standard-basic" 
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
        </TextField> */}
      
    </Box>
    
    <Grid item xs={12} sx={{mt:2}} style={{textAlign:"center"}}>
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

export default Updateinvoice;