import { Box, Button, Checkbox, CircularProgress, Fade, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Bus_service from '../../Services/Bus_service';
import Conductor_service from '../../Services/Conductor_service';
import Driver_service from '../../Services/Driver_service';
import image from './cdac_logo.png'
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
  // const slaMaster = {"id": sla}
  const [slafor,setSlafor] = useState('');
  const slaForMaster = {"id" : slafor}
  const [complaint,setcomplaint] = useState('');
  const [qualitytype, setQualityType]=useState('')
  const [details,setdetails] = useState('');
  const [instance,setinstance] = useState('');
  const [penalty,setpenalty] = useState('');
  const [remarks,setremarks] = useState('');
  const [premium,setPremium] = useState('');
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
  const [amount,setAmount] = useState("");
  const cleanform = !props.updateid && props.open ;
  const ivn = useRef();
  const ivnd = useRef();
  const [approvesuc,setApprovesuc] = useState(false);

  const { updateid } = props.updateid;
const [invoiceNo, setInvoiceNo] = useState('');
const [invoiceDate, setInvoiceDate] = useState('');
  useEffect(()=>{
    const penaltyPercentage = props.updatedetails.penaltypercentage;
    const fixedAmount = 200000; // 2 lakh
    const penaltyAmount = (fixedAmount * penaltyPercentage)/100;
    const amountToPay = fixedAmount+penaltyAmount
    setPremium(amountToPay);
console.log(premium)
console.log(props.updatedetails)
props.updatedetails.penalty?calculatePenalty():calculateIncentive();

  },[])  // console.log(props.updatedetails)

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
  let amountToPay;
  const calculatePenalty = () => {
    console.log("first")
    // Assuming penaltypercentage is in decimal (e.g., 0.05 for 5%)
    const penaltyPercentage = props.updatedetails.penaltypercentage;
    const fixedAmount = 200000; // 2 lakh
    const penaltyAmount = (fixedAmount * penaltyPercentage)/100;
    const amountToPay = fixedAmount-penaltyAmount
  console.log(amountToPay);
   setAmount(amountToPay)
  
};

const calculateIncentive = () => {

  const incentivePercentage = props.updatedetails.incentivepercentage;
  const fixedAmount = 200000; // 2 lakh
  const incentiveAmount = (fixedAmount * incentivePercentage)/100;
  const amountToPay = fixedAmount+incentiveAmount
  console.log(amountToPay)
  setAmount(amountToPay)
 
};
  const busmasterdetails = (id) =>{
    // console.log('clicked');
    // console.log("g",approvalid);
    // const penaltyAmount = calculatePenalty();
    // console.log("Penalty to Pay:", penaltyAmount);
    // const penaltyPercentage = props.updatedetails.penaltypercentage;
    // const fixedAmount = 200000; // 2 lakh
    // const penaltyAmount = (fixedAmount * penaltyPercentage) / 100;
    // const amountToPay = fixedAmount + penaltyAmount;
    const details = {
      id: approvalid,             
      remarks: remarks,
      premium: amount
      ,       
      invoicedate: currentDate

    };
    // axios.put(`http://10.226.33.132:9100/busperformance/setisapproved/${approvalid}/${remarks}/${amountToPay}`).then((res)=>{
      axios.put(`http://10.226.33.132:9100/busperformance/setisapproved/${approvalid}`, details).then((res)=>{
        // props.onClose();
        setSnackcolor("#458a32");
        setErrormessage(" Approved ")
        setOpensnack(true);
        console.log(res.data)
        const { invoiceno, invoicedate } = res.data;
        setInvoiceNo(res.data.invoiceno);
        setInvoiceDate(res.data.invoicedate);
        setApprovesuc(true);
console.log(invoiceno,invoicedate)
        console.log(res.data.invoiceno)
        ivn.current = res.data.invoiceno;
        ivnd.current = res.data.invoicedate;
        sessionStorage.setItem("inv",res.data.invoiceno)
        sessionStorage.setItem("invdate",res.data.invoicedate)

        
        // const printContent = document.getElementById('printContentapproval').innerHTML;
        // const originalContent = document.body.innerHTML;
    
        // document.body.innerHTML = printContent;
    
        // // Trigger printing
        // window.print();
    
        // // Restore the original content
        // document.body.innerHTML = originalContent;
        // window.location.reload();
  
      }).catch(err=>{
        console.log(err);
        setSnackcolor("#e34242");
        setErrormessage("Not able to update data. Please try again later !")
        setOpensnack(true);
        
        // props.onClose();
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

  const handleprint = ()=>{
    console.log(invoiceNo)
    const printContent = document.getElementById('printContentapproval').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    // Trigger printing
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;
    window.location.reload();
  }

  
  const rejectDetails = (id) =>{
    console.log('clicked');
    console.log("g",approvalid);

    axios.put(`http://10.226.33.132:9100/busperformance/setisreject/${approvalid}/${remarks}/${amount}`).then((res)=>{
        props.onClose();
        setSnackcolor("#FF0000");
        setErrormessage(" Rejected ")
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
  const handleAccept = () => {
    // Perform any necessary actions before printing
    console.log("Accept button clicked");
    // Call busmasterdetails function if needed
    busmasterdetails();
    // const printWindow = window.open('', '_blank');
    // printWindow.document.write('<html><head><title>Custom Print Page</title></head><body>');
    // printWindow.document.write(document.getElementById('printContent').innerHTML);
    // printWindow.document.write('</body></html>');
    // printWindow.document.close();
    
    // // Trigger printing
    // printWindow.print();
    

    // const printContent = document.getElementById('printContent').innerHTML;
    // const originalContent = document.body.innerHTML;

    // document.body.innerHTML = printContent;

    
    // window.print();

    
    // document.body.innerHTML = originalContent;
    // window.location.reload();
  };

  const handleApproval = async (id) => {
    try {
      console.log('ID being passed:', id);
      let serviceToUpdate;
      let row_id = props.rowId;;
      let updatedSlaOptions;

      if (slafortype === "Bus") {
        serviceToUpdate = Bus_service.setisApproved(row_id);
        setSnackbarMessage('Approved');
        setSnackbarOpen(true);
        props.onClose();
        // serviceToUpdate= axios.post(`http://10.226.33.132:9100//busperformance/setisapproved/${row_id}`);
      } else if (slafortype === "Conductor") {
        serviceToUpdate = Conductor_service.setisApproved(row_id);
        setSnackbarMessage('Approved');
        setSnackbarOpen(true);
        props.onClose();
      } else if (slafortype === "Driver") {
        serviceToUpdate = Driver_service.setisApproved(row_id);
        setSnackbarMessage('Approved');
        setSnackbarOpen(true);
        props.onClose();
      }

      if (serviceToUpdate && serviceToUpdate.setisApproved) {
        serviceToUpdate.setisApproved(row_id);

        console.log(sla.id);
        props.onClose();
        // setSnackcolor("#458a32");
        alert("Approved");
      } else {
        // Handle the scenario where serviceToUpdate is not defined
        console.error('Service not found for the selected type.');
      }
    } catch (error) {
      console.error('Error while approving:', error);
      // Handle error scenarios accordingly
    }
  };

 useEffect(()=>{
    let id= props.updateid;
    console.log("hduhf",props.updateid)
    console.log('new',approvalid);
}, [props.updateid])


// get current date 
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // const formatdate = `${year}.${month}.${day}`
  // console.log(formatdate);

  return `${year}-${month}-${day}`;
 
};

const currentDate = formatDate(new Date());


const submitbutton = () => {
  const fieldempty = remarks;
  if (fieldempty) {
    console.log("Row ID:", approvalid);
    return (
    
      approvesuc?
      <Button
      size="large"
      variant="contained"
      // onClick={busmasterdetails}
      // onClick={() => {
      //   busmasterdetails();
      // }}
      onClick={handleprint}
    //   onClick={handleApproval.bind(this, props.rowId)}
      style={{ marginBottom: "20px", marginRight: "10px" }}
    >
      Print
    </Button>:
     <div>
        <Button
          size="large"
          variant="contained"
          // onClick={busmasterdetails}
          // onClick={() => {
          //   busmasterdetails();
          // }}
          onClick={handleAccept}
        //   onClick={handleApproval.bind(this, props.rowId)}
          style={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Accept
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={rejectDetails}
          style={{ marginBottom: "20px",backgroundColor:"maroon" }}
        >
          Reject
        </Button>

       
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
           Approval / Reject 
        </Typography>
     </Grid>
     
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      style={{width:"100%"}}
      noValidate
      autoComplete="off"
    >

<div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center"}}>
  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>SLA:</strong> {props.updatedetails.slaMaster ? props.updatedetails.slaMaster.sla : 'N/A'}
  </Typography>
  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>Agency Name:</strong> {props.updatedetails.slaMaster && props.updatedetails.slaMaster.agencyMaster ? props.updatedetails.slaMaster.agencyMaster.agencyname : 'N/A'}
  </Typography>

  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>File Date:</strong> {props.updatedetails.filedate ? props.updatedetails.filedate : 'N/A'}
  </Typography>
 
  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>Complaint Number:</strong> {props.updatedetails.customerComplaint ? props.updatedetails.customerComplaint.complaintid : 'N/A'}
  </Typography>
  </div>

  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",paddingLeft:"20px"}}>
  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>SLA Type:</strong> {props.updatedetails.slaMaster && props.updatedetails.slaMaster.slaTypeMaster ? props.updatedetails.slaMaster.slaTypeMaster.slatype : 'N/A'}
  </Typography>
  
  <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>Quality Type:</strong> {props.updatedetails.qualityStandardMaster ? props.updatedetails.qualityStandardMaster.qualitytype : 'N/A'}
  </Typography>

  {props.updatedetails.penalty? 
    <>
    {/* <Typography variant="body1" style={{ marginBottom: "8px" }}>
      <strong>Penalty:</strong> {props.updatedetails.penalty} 
    </Typography> */}
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
       <strong>Penalty Percentage:</strong> {props.updatedetails.penaltypercentage}
     </Typography>
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
       <strong>Monthly Amount:</strong> 2,00,000
     </Typography>
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
       <strong>Premium:</strong> {amount}
     </Typography>
     </>:""
  }


  {props.updatedetails.incentive && (
    <>
    {/* <Typography variant="body1" style={{ marginBottom: "8px" }}>
    <strong>Incentive:</strong> {props.updatedetails.incentive}
    </Typography> */}
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
     <strong> Incentive Percentage:</strong> {props.updatedetails.incentivepercentage}
     </Typography>
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
       <strong>Monthly Cost:</strong> 2,00,000
     </Typography>
     <Typography variant="body1" style={{ marginBottom: "8px" }}>
       <strong>Premium:</strong> {amount}
     </Typography>
     </>
  
    
    )}
  </div>
  
</div>


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

    <div id="printContentapproval" style={{ display: "none" }}>
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
        <img
          src={image}
          alt="CDAC Logo"
          style={{ float: 'right', marginLeft: '10px',marginRight: '10px', width: '100px', height: 'auto' }}
        />
        <div style={{ textAlign: 'center' , marginTop: '20px' , marginBottom: '10px' }}>
          <div>प्रगत संगणक विकास केंद्र</div>
          <div>CENTRE FOR DEVELOPMENT OF ADVANCED COMPUTING</div>
          
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
      <div style={{textAlign: 'center'}}> इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय, भारत सरकार की एक वैज्ञानिक संस्था</div>
      <div style={{textAlign: 'center'}}>
            A Scientific Society of the Ministry of Electronics and Information
            Technology, Govt. of India
          </div>
          
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>No.: {invoiceNo}</div>
        <div>Date: {currentDate}</div>
      </div>
      
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Sub: Invoice No. {invoiceNo} Dated {currentDate}
      </div>
      <div style={{ marginTop: '20px' }}>
        Dear Sir,
        <br />
        Please find enclosed the following Invoices:-
      </div>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>S. No.</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Invoice No.</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Invoice Date</th>

            {/* <th style={{ border: '1px solid black', padding: '5px' }}>Penalty Percentage</th> */}
            <th style={{ border: '1px solid black', padding: '5px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>1</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{invoiceNo}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{invoiceDate}</td>

            {/* <th style={{ border: '1px solid black', padding: '5px' }}>{penaltypercentage}</th> */}
            <td style={{ border: '1px solid black', padding: '5px' }}>{amount}</td>
            {/* <td style={{ border: '1px solid black', padding: '5px' }}>
              FMS (2<sup>nd</sup> to 5<sup>th</sup> Yrs) Phase-II at Sardar Patel Med. Bikaner for the period of 01.03.18 to 30.04.18
            </td> */}
            {/* <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>55146</td> */}
          </tr>
         
         
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>TOTAL:</td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>{amount}</td>
          </tr>
        </tfoot>
      </table>
      <div style={{ marginTop: '20px' }}>
        We request you to please pay by Cheque / Demand Draft or RTG's transfer of Rs. {amount}/- in favour of CDAC, Noida.
      </div>
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>Particulars of Bank are as under:</div>
        <div>Account Name: C-DAC, Noida</div>
        <div>Name of the Bank: ORIENTAL BANK OF COMMERCE</div>
        <div>Branch/Address of the Bank: B-31, INSTITUTIONAL AREA, SECTOR-62, NOIDA.</div>
        <div>Account No.: XXXXXXXXXX</div>
        <div>Account Type: SAVING</div>
        <div>IFSC of Bank: XXXX XXXXXX</div>
        <div>MICR Code of Bank: XXXXXXXXX</div>
      </div>
      {/* <div style={{ marginTop: '40px', textAlign: 'right' }}>
        Yours faithfully,
        <br />
        <br />
        <br />
        (Shikha Gupta)
        <br />
        Senior Finance Officer
      </div> */}
      <div style={{ marginTop: '20px', borderTop: '2px solid black', paddingTop: '10px' }}>
        <div>Note: This is a system generated document and does not require a signature.</div>
      </div>
      
    </div>
            </div>
  </Box>

</Modal>
        </div>
    );
}
export default Approval




