import { Check, Close, Delete, Edit, Label } from '@mui/icons-material';
import { FormControl, FormControlLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
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
import IncentiveMaster from '../IncentiveMaster/IncentiveMaster';
const customStyles = {
  header: {
		style: {
			fontSize: '20px',
			color: "black",
      textAlign:"justify",
      fontWeight:"700 !important",
			padding:"0px 0px 0px 10px !important",
      paddingLeft:"10px"
			
		},
	},
  rows: {
      style: {
        backgroundColor:"#b6e7e1",
        textAlign:"center !important",
         
      },
  },
  headCells: {
      style: {
        fontSize:'14px',
        height:"auto",
        backgroundColor:'#3a9d91',
        borderRadius: "10",
        border: "#34ebcc 5px",
        textAlign:"center",
        //padding:"0px !important",
        fontWeight:"700 !important",
      
        paddingLeft:"10px"
        
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', 
          paddingRight: '8px',
          textAlign:"center !important", 
      },
      
  },
  columns:{
    style:{
         borderRight:"white 5px"  
    },
  },
};

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
    fetchData(); // Fetch data when component mounts or approval type changes
  }, [approvalType]);

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
      const response = await axios.get(`http://10.226.33.132:9100/busperformance/list`);
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
  


  const deletedata = (id) =>{
    setDeleteid(id);
    setDeleteodalopen(true)

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
      return <span style={{ color: 'green' }}>Approved</span>;
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center",background:"lightgrey"}}>
          <Grid item xs={3}>
           
          </Grid>
          <Grid item xs={6}>
              {/* <AddDm open={modalopen} onClose={handlemodalclose} updateid={updateid} /> */}
            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletebusbyid" />
            <div className='masterHeading'><h2 className='centerContent'> Approval </h2> </div>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>

  <Grid item xs={12} style={{marginRight:"10px",marginLeft:"10px"}}>
  
  {/* <FormControl component="fieldset">
            <RadioGroup row aria-label="approvalType" name="approvalType" value={approvalType} onChange={handleApprovalTypeChange}>
              <FormControlLabel value="Penalty" control={<Radio />} label="Penalty" />
              <FormControlLabel value="Incentive" control={<Radio />} label="Incentive" />
            </RadioGroup>
          </FormControl> */}
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
      </FormControl>
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
            subHeader
            // subHeaderComponent={<input type="text" placeholder="Search here"  style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
            
            customStyles={customStyles}
            highlightOnHover
            desnse
            onRowClicked={(row) => handleEdit(row)} 
        />
       
      <Approval 
      open={modalopen}  
      onClose={handlemodalclose} 
      updateid={updateid} 
      updatedetails ={updatedetails}
     
      />



  </Grid>
  
</Grid>

        </Box>
    );
}

export default Dm;