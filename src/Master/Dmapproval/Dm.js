import { Check, Close, Delete, Edit, Label,LocalPrintshop,Print } from '@mui/icons-material';
import { FormControl, FormControlLabel, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Checkbox, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';
import AddDm from './AddDm'
import Bus_service from '../../Services/Bus_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import axios from 'axios';
import Conductor_service from '../../Services/Conductor_service';
import Driver_service from '../../Services/Driver_service';
import Approval from './Approval';
import Incentivemaster_service from '../../Services/Incentivemaster_service';
import { teal } from '@mui/material/colors';
import IncentiveMaster from '../IncentiveMaster/IncentiveMaster';
import {customStyles} from '../../datatable.js'; 
import {  Modal } from '@mui/material';

import image from './cdac_logo.png'

import PrintInvoice from './printInvoice.js';
// const customStyles = {
//   header: {
// 		style: {
// 			fontSize: '20px',
// 			color: "black",
//       textAlign:"justify",
//       fontWeight:"700 !important",
// 			padding:"0px 0px 0px 10px !important",
//       paddingLeft:"10px"
			
// 		},
// 	},
//   rows: {
//       style: {
//         backgroundColor:"#b6e7e1",
//         textAlign:"center !important",
         
//       },
//   },
//   headCells: {
//       style: {
//         fontSize:'14px',
//         height:"auto",
//         backgroundColor:'#267871',
//         borderRadius: "10",
//         border: "#34ebcc 5px",
//         textAlign:"center",
//         //padding:"0px !important",
//         fontWeight:"700 !important",
      
//         paddingLeft:"10px"
        
//       },
//   },
//   cells: {
//       style: {
//           paddingLeft: '8px', 
//           paddingRight: '8px',
//           textAlign:"center !important", 
//       },
      
//   },
//   columns:{
//     style:{
//          borderRight:"white 5px"  
//     },
//   },
// };

function Dm(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [busdetails,setbusdetails] = useState([]);
  const [busdetailsfiltered,setbusdetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");
  const [slafor,setSlafor] = useState('');
  const [slafordetails,setslafordetails] = useState([]);
  const [slaOptions, setSlaOptions] = useState([]);
  const [updatedetails,setUpdatedetails] = useState([])
  const [slafortype,setSlafortype] = useState("Bus");
  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [rowDataForEdit, setRowDataForEdit] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null); 
  const [approvalType, setApprovalType] = useState("penalty");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState('');
const [invoiceDate, setInvoiceDate] = useState('');
const [amount,setAmount] = useState("");
const [printcancel,setPrintcancel] = useState(false)


  const openModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const keys = ["details", "penalty"];
  const handleApprovalTypeChange = (event) => {
    setApprovalType(event.target.value);

    console.log(approvalType)
  };
  
  useEffect(() => {
    const result = slaOptions.filter(item => {
      return keys.some((key) => (item[key]===null?"":item[key]).toLowerCase().includes(search.toLowerCase()))
    })
    setbusdetailsfiltered(result)
  }, [search])

  useEffect(()=>{
    Bus_service.getAll().then((response)=>{
       console.log(response.data);
       setbusdetails(response.data);
       setbusdetailsfiltered(response.data)
      
    }).catch(err=>console.log(err))
   
  },[modalopen,deletemodalopen])
  //for incentive master data
  useEffect(()=>{
    Incentivemaster_service.getAll().then((response)=>{
       console.log(response.data);

       setbusdetails(response.data);
       setbusdetailsfiltered(response.data)
      
    }).catch(err=>console.log(err))
   
  },[modalopen,deletemodalopen])
//remove filter and display data for bus only 
  // useEffect(()=>{
  //   async function fetchData() {
  //    if(slafortype==="Bus"){
  //     let slaBusDataa = await getSLABus();
  //     setSlaOptions(slaBusDataa);
  //  console.log(slaBusDataa)
  //    }
  //   }
  //   fetchData();
  // },[slafortype])
  // console.log(slafortype)
  
  const fetchData = async () => {
    try {
      // setLoading(true);

      if (approvalType === 'penalty') {
        // Fetch data for penalty
        const penaltyData = await Bus_service.getAll();
        setSlaOptions(penaltyData.data);
        console.log(penaltyData.data)
      } else if (approvalType === 'incentive') {
        // Fetch data for incentive
        const incentiveData = await Bus_service.getIncentive();
        setSlaOptions(incentiveData.data);
        console.log(incentiveData.data)
      }
     
     

      // setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };
  useEffect(() => {
   if(approvalType || printcancel==true){
    fetchData();
   }
     // Fetch data when component mounts or approval type changes
  }, [approvalType,printcancel]);



  useEffect(()=>{
    Slaformaster_service.getAll().then((res)=>{
      setslafordetails(res.data); 
      console.log(res.data)
    }).catch(err=>console.log(err))
  },[])
 
  const handleRowSelect = (id) => {
    setSelectedRowId(id); // Set the selected row id in state
  
    // Find the selected row data using the id
    const selectedRowData = slaOptions.find((row) => row.id === id);
  
    // Log the selected row data to the console
    console.log('Selected Row Data:', selectedRowData);
  };
  
  // const handleApproval = async (id) => {
  //   try {
  //     console.log('ID being passed:', id);
  //     let serviceToUpdate;
  //     let row_id = id;
  //     let updatedSlaOptions;

  //     if (slafortype === "Bus") {
  //       serviceToUpdate = Bus_service.setisApproved(row_id);
  //       setSnackbarMessage('Approved');
  //       setSnackbarOpen(true);
  //       props.onClose();
  //       // serviceToUpdate= axios.post(`http://10.226.33.132:9100//busperformance/setisapproved/${row_id}`);
  //     } else if (slafortype === "Conductor") {
  //       serviceToUpdate = Conductor_service.setisApproved(row_id);
  //       setSnackbarMessage('Approved');
  //       setSnackbarOpen(true);
  //       props.onClose();
  //     } else if (slafortype === "Driver") {
  //       serviceToUpdate = Driver_service.setisApproved(row_id);
  //       setSnackbarMessage('Approved');
  //       setSnackbarOpen(true);
  //       props.onClose();
  //     }
  
  //     if (serviceToUpdate && serviceToUpdate.setisApproved) {
  //       serviceToUpdate.setisApproved(row_id);
        
  //       console.log(sla.id)
  //       props.onClose();
  //       // setSnackcolor("#458a32");
  //       alert("Approved");
  //     } else {
  //       // Handle the scenario where serviceToUpdate is not defined
  //       console.error('Service not found for the selected type.');
  //     }
  //   } catch (error) {
  //     console.error('Error while approving:', error);
  //     // Handle error scenarios accordingly
  //   }
  // };
  const updatedata = (id) =>{
    setUpdateid(id);
    setModalopen(true);
   console.log('Id',updateid)
}
  const handleRejection = async (id) => {
    try {
      console.log('ID being passed:', id);
      let serviceToUpdate;
      let row_id = id;
      if (slafortype === "Bus") {
        serviceToUpdate = Bus_service.setisReject(row_id);
        setSnackbarMessage('Rejected');
        setSnackbarOpen(true);
        props.onClose();
        
      } else if (slafortype === "Conductor") {
        serviceToUpdate = Conductor_service.setisReject(row_id);
        setSnackbarMessage('Rejected');
        setSnackbarOpen(true);
        props.onClose();
      } else if (slafortype === "Driver") {
        serviceToUpdate = Driver_service.setisReject(row_id);
        setSnackbarMessage('Rejected');
        setSnackbarOpen(true);
        props.onClose();
      }
  
      if (serviceToUpdate && serviceToUpdate.setisApproved) {
        serviceToUpdate.setisApproved(row_id);
        console.log(sla.id)
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
  
  const getSLABus = async (id) => {
    try {
      const response = await axios.get(`http://10.226.33.132:9100/busperformance/list`);d
      return response.data;
     
    } catch (error) {
      console.error('Error fetching Bus SLA data:', error);
      throw error;
    }
  };
  
  const getSLAConductor = async (id) => {
    try {
      const response = await axios.get(`http://10.226.33.132:9100/conductorperformance/getbyisresolve`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Conductor SLA data:', error);
      throw error;
    }
  };
  const getSLADriver = async (id) => {
    try {
      const response = await axios.get(`http://10.226.33.132:9100/driverperformance/getbyisresolve`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Driver SLA data:', error);
      throw error;
    }
  };
  const handleSlaforChange = async (event) => {
    setSlafor(event.target.value)
    let slafort;
    slafordetails.forEach((data)=>{
      if(data.id===event.target.value){
        setSlafortype(data.slafor)
        slafort=data.slafor;
       
      }
    })
    console.log(slafortype,slafort)
    const selectedSlaForId = event.target.value; 
    try{
    if (slafort === 'Bus') {
        const slaBusData = await getSLABus();
        setSlaOptions(slaBusData);
        console.log(slaBusData)

    } else if (slafort === 'Conductor') {
        const slaConductorData = await getSLAConductor();
        setSlaOptions(slaConductorData); 
        
    } else if (slafort === 'Driver') {
        const slaDriverData = await getSLADriver();
        setSlaOptions(slaDriverData); 
    }
    
  }catch (error) {
    console.error('Error fetching SLA data:', error);
  }
  
  }

  const openprint = ()=>{
    const printContent = document.getElementById('printContent').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    // Trigger printing
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;
    setPrintcancel(true);
    window.location.reload();
  }
  
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

  const deletedata = (id) =>{
    setDeleteid(id);
    setDeleteodalopen(true)

  }

  const handleprint = (row)=>{
    console.log(row);
    setPrintcancel(false)
      setInvoiceNo(row.invoiceno)
      setInvoiceDate(row.invoicedate)
      setAmount(row.premium)
      console.log("Invoice",row.invoiceno)
      console.log(invoiceNo)
      openprint()

  }
    const handleEdit = (row) => {
    const { penalty, penaltypercentage, incentive, incentivepercentage } = row;
    setRowDataForEdit(row);
    setEditDialogOpen(true);
    setUpdatedetails({ penalty: row.penalty, penaltypercentage: row.penaltypercentage, incentive: row.incentive, incentivepercentage: row.incentivepercentage }, () => {
      console.log("Updated Details in callback:", updatedetails);
    });
    console.log(penalty)
  };
  const columns = [
   
    {
        name: 'SLA',
        selector: row => row.slaMaster.sla===null?"":row.slaMaster.sla,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
    },
    {
      name: 'Agency Name',
      selector: row => row.slaMaster.agencyMaster.agencyname===null?"":row.slaMaster.agencyMaster.agencyname,
      sortable:true,
      center: true, 
      wrap: true
      // width:"250px",
  },
    {
      name: 'SLA Type',
      selector: row => row.slaMaster.slaTypeMaster.slatype===null?"":row.slaMaster.slaTypeMaster.slatype,
      sortable:true,
      center: true, 
      wrap: true
      // width:"250px",
  },
 
{
  name: 'Quality Standard',

  selector: row => row.qualityStandardMaster &&  row.qualityStandardMaster.qualitytype ? row.qualityStandardMaster.qualitytype: '',
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'File Date',
  selector: row => row.filedate,
  sortable:true,
  center:true,
  wrap:true
},

{
  name: 'Customer Complaint No.',
  selector: row => row.customerComplaint && row.customerComplaint.complaintid ? row.customerComplaint.complaintid: '',
  sortable:true,
  center:true,
  wrap:true
},




{
  name: 'Status',
  cell: (row) => {
    if (row.isapproved === true && row.isvalid === true) {
      return (
      <> <span style={{ color: 'green' }}>Approved</span>
         <LocalPrintshop  onClick={()=>{
          console.log(row);
          handleprint(row)
         }}/>
           <div id="printContent" style={{ display: "none" }}>
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
        <div style={{ fontWeight: 'bold' }}>No.: {row.invoiceno}</div>
        <div>Date: {currentDate}</div>
      </div>
      
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Sub: Invoice No. {row.invoiceno} Dated {currentDate}
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
            <th style={{ border: '1px solid black', padding: '5px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>1</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{row.invoiceno}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{row.invoicedate}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{row.premium}</td>
            {/* <td style={{ border: '1px solid black', padding: '5px' }}>
              FMS (2<sup>nd</sup> to 5<sup>th</sup> Yrs) Phase-II at Sardar Patel Med. Bikaner for the period of 01.03.18 to 30.04.18
            </td> */}
            {/* <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>55146</td> */}
          </tr>
         
         
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>TOTAL:</td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>{row.premium}</td>
          </tr>
        </tfoot>
      </table>
      <div style={{ marginTop: '20px' }}>
        We request you to please pay by Cheque / Demand Draft or RTG's transfer of Rs. {row.premium}/- in favour of CDAC, Noida.
      </div>
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>Particulars of Bank are as under:</div>
        <div>Account Name: C-DAC, Noida</div>
        <div>Name of the Bank: ORIENTAL BANK OF COMMERCE</div>
        <div>Branch/Address of the Bank: B-31, INSTITUTIONAL AREA, SECTOR-62, NOIDA.</div>
        <div>Account No.: XXXXX                                                                                                                                                                                                                                        XXXXX</div>
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
      </>)
      
    } else if (row.isapproved === false && row.isvalid === false) {
      return <span style={{ color: 'red' }}>Rejected</span>;
    } else {
      return (
        <>
          <Edit
            className={`editbutton ${!row.isapproved && !row.isresolved && row.isvalid ? '' : 'disabled'}`}
            onClick={() => {
              if (!row.isapproved && !row.isresolved && row.isvalid) {
                updatedata(row.id);
                setUpdatedetails(row);
                console.log("first","demo",updatedetails)
              }
            }}
            disabled={!row.isapproved && !row.isresolved && row.isvalid}
            style={{
              color: (!row.isapproved && !row.isresolved && row.isvalid) ? '#yourEnabledColor' : '#yourDisabledColor',
            }}
          />
        </>
      );
    }
  },
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width: '150px'
},


// {
//   name: 'Status',
//   cell: (row) => {
//     const isApproved = row.isapproved === true && row.isvalid === true;
//     const isRejected = row.isapproved === false && row.isvalid === false;
//     console.log(isApproved);
//     return (
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <span style={{ color: isApproved ? 'green' : 'red' }}>
//           {isApproved ? 'Approved' : 'Rejected'}
//         </span>
//         {(isApproved || isRejected) && (
//           <Button
//             onClick={() => openprint(row)}
//             style={{ marginLeft: '10px', minWidth: 'auto', padding: 0 }}
//           >
//             <Print />
//           </Button>
//         )}
//         {!row.isapproved && !row.isresolved && row.isvalid && (
//           <Edit
//             className={`editbutton ${!row.isapproved && !row.isresolved && row.isvalid ? '' : 'disabled'}`}
//             onClick={() => {
//               if (!row.isapproved && !row.isresolved && row.isvalid) {
//                 updatedata(row.id);
//                 setSelectedRowData(row);
//               }
//             }}
//             style={{
//               color: '#yourEnabledColor',
//             }}
//           />
//         )}
//       </div>
//     );
//   },
//   ignoreRowClick: true,
//   allowOverflow: true,
//   button: true,
//   width: '150px',
// }



// {
//   name: 'Approve/Reject',
//   cell: (row) => {
//     if (row.isapproved === true && row.isvalid === true) {
//       return null; // Return null if status is 'Approved'
//     } else if (row.isapproved === false && row.isvalid === false) {
//       return null; // Return null if status is 'Rejected'
//     } else {
//       // Render the button if status is neither 'Approved' nor 'Rejected'
//       return (
//         <>
//           <Edit
//             className={`editbutton ${!row.isapproved && !row.isresolved && row.isvalid ? '' : 'disabled'}`}
//             onClick={() => {
//               if (!row.isapproved && !row.isresolved && row.isvalid) {
//                 updatedata(row.id);
//               }
//             }}
//             disabled={!row.isapproved && !row.isresolved && row.isvalid}
//             style={{
//               color: (!row.isapproved && !row.isresolved && row.isvalid) ? '#yourEnabledColor' : '#yourDisabledColor',
//             }}
//           />
//         </>
//       );
//     }
//   },
//   ignoreRowClick: true,
//   allowOverflow: true,
//   button: true,
//   width: '150px'
// },


  
];

const handlemodal = () =>{
  setModalopen(true);
  // setUpdateid('');
}

const handlemodalclose = () =>{
  setModalopen(false);
}

const handledeletemodalclose = () =>{
  setDeleteodalopen(false);
}
const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};
useEffect(() => {
  console.log("Updated Details in useEffect:", updatedetails);

}, [updatedetails]);
return (
  
     <Box>
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
      <div className='pageheader' style={{marginLeft:"20px"}}>
    <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"white",fontWeight:'900'}} gutterBottom>
    Approval 
      </Typography>
      
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{marginRight:"10px",color:"white",fontWeight:'600'}}>
            Select Type :  
        </div>
        <div style={{marginRight:"10px"}}>
        <FormControl component="fieldset">
             <RadioGroup
        row
        aria-label="approval-type"
        name="approval-type"
        value={approvalType}
        onChange={handleApprovalTypeChange}
        color="white"
      >
        <FormControlLabel value="penalty" control={<Radio   sx={{
          color: teal[800],
          '&.Mui-checked': {
            color: teal[900],
          },
        }} />} label="Penalty" />
        <FormControlLabel value="incentive" control={<Radio sx={{
          color: teal[800],
          '&.Mui-checked': {
            color: teal[900],
          },
        }} />} label="Incentive" />
      </RadioGroup>
      </FormControl>
      
  </div>
      </div>
      </div>

        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center",background:"lightgrey"}}>
          <Grid item xs={3}>
           
          </Grid>
          <Grid item xs={6}>
            
            <div className='masterHeading'><h2 className='centerContent'> Approval </h2> </div>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid> */}

  <Grid item xs={12} style={{marginTop:"-8px"}}>
  
{/*  
          <FormControl component="fieldset" style={{marginTop:'30px'}}>
             <RadioGroup
        row
        aria-label="approval-type"
        name="approval-type"
        value={approvalType}
        onChange={handleApprovalTypeChange}
      >
        <FormControlLabel value="penalty" control={<Radio />} label="Penalty" />
        <FormControlLabel value="incentive" control={<Radio />} label="Incentive" />
      </RadioGroup>
      </FormControl> */}
  <DataTable
            columns={columns}
            data={slaOptions}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            pagination
            responsive
            // striped
            subHeaderAlign="right"
            subHeaderWrap
            // subHeader
            // subHeaderComponent={<input type="text" placeholder="Search here"  style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
            
            customStyles={customStyles}
            highlightOnHover
            desnse
            onRowClicked={(row) => handleEdit(row)} 
        />
       
    {modalopen?  <Approval 
      open={modalopen}  
      onClose={handlemodalclose} 
      updateid={updateid} 
      updatedetails ={updatedetails}
     
      />:""}

<div>



     
      
      {/* <Modal open={isModalOpen} onClose={closeModal}>
        <div>
          {selectedRowData && (
            <PrintInvoice
              remarks="Some remarks"
              approvalid="12345"
              busmasterdetails={() => console.log('Bus Master Details')}
              rejectDetails={() => console.log('Reject Details')}
              image="path/to/logo.png"
              rowData={selectedRowData}
              closeModal={closeModal}
            />
          )}
        </div>
      </Modal> */}
    </div>

  </Grid>
  
</Grid>

        </Box>
    );
}

export default Dm;