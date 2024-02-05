// import { Delete, Edit } from '@mui/icons-material';
// import AddIcon from '@mui/icons-material/Add';
// import { Box, Button, Grid } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Deletecomponent from '../../Components/Deletecomponent';
// // import AddDm from './AddServiceProvider'
// import AddServiceProvider from './AddServiceProvider'
// import Bus_service from '../../Services/Bus_service';

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
//         backgroundColor:'#3a9d91',
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

// function ServiceProvider(props) {

//   const [modalopen,setModalopen] = useState(false)
//   const [deletemodalopen,setDeleteodalopen] = useState(false)
//   const [busdetails,setbusdetails] = useState([]);
//   const [busdetailsfiltered,setbusdetailsfiltered] = useState([]);
//   const [updateid,setUpdateid] = useState('');
//   const [deleteid,setDeleteid] = useState('');
//   const [search,setSearch] = useState("");

//   const keys = ["details", "instance", "penalty", "penaltydetail"];
  
//   useEffect(() => {
//     const result = busdetails.filter(item => {
//       return keys.some((key) => (item[key]===null?"":item[key]).toLowerCase().includes(search.toLowerCase()))
//     })
//     setbusdetailsfiltered(result)
//   }, [search])

//   useEffect(()=>{
//     Bus_service.getbyisApproved().then((response)=>{
//        console.log(response.data);
//        setbusdetails(response.data);
//        setbusdetailsfiltered(response.data)
      
//     }).catch(err=>console.log(err))
   
//   },[modalopen,deletemodalopen])

//   const updatedata = (id) =>{
//        setUpdateid(id);
//        setModalopen(true);
//   }

//   const deletedata = (id) =>{
//     setDeleteid(id);
//     setDeleteodalopen(true)

//   }

//   const columns = [
   
//     // {
//     //     name: 'SLA',
//     //     selector: row => row.slaMaster,
//     //     sortable:true,
//     //     center: true, 
//     //     wrap: true
//     //     // width:"250px",
        
//     // },
//   {
//     name: 'Details',
//     selector: row => row.details,
//     sortable:true,
//     center:true,
//     wrap:true
// },
// // {
// //   name: 'Instance',
// //   selector: row => row.instance,
// //   sortable:true,
// //   center:true,
// //   wrap:true
// // },
// {
//   name: 'Penalty',
//   selector: row => row.penalty,
//   sortable:true,
//   center:true,
//   wrap:true
// },
// {
//   name: 'Penalty Detail',
//   selector: row => row.penaltydetail,
//   sortable:true,
//   center:true,
//   wrap:true
// },
// // {
// //   name: 'Quality Standard',
// //   selector: row => row.qualityStandardMaster,
// //   sortable:true,
// //   center:true,
// //   wrap:true
// // },
// {
//   name: 'File Date',
//   selector: row => row.filedate,
//   sortable:true,
//   center:true,
//   wrap:true
// },
// // {
// //   name: 'Resolved Date',
// //   selector: row => row.resolvedate,
// //   sortable:true,
// //   center:true,
// //   wrap:true
// // },
// // {
// //   name: 'Customer Complaint No.',
// //   selector: row => row.customerComplaint,
// //   sortable:true,
// //   center:true,
// //   wrap:true
// // },
// {
//     name: 'Entry Date',
//     selector: row => row.entrydate===null?"":row.entrydate.substr("0","10"),
//     sortable:true,
//     center:true
//   },

// // {
// // 	name: 'Action',
  			
// //   cell: (row) =><> <Edit className='editbutton' onClick={updatedata.bind(this,row.id)}/> <Delete className='deletebutton' onClick={deletedata.bind(this,row.id)}/>  </> ,
// //   ignoreRowClick: true,
// //   allowOverflow: true,
// //   button: true,
// // }
// ];

// const handlemodal = () =>{
//   setModalopen(true);
//   setUpdateid('');
// }

// const handlemodalclose = () =>{
//   setModalopen(false);
// }

// const handledeletemodalclose = () =>{
//   setDeleteodalopen(false);
// }
// return (
//      <Box>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
//         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center",background:"lightgrey"}}>
//           <Grid item xs={3}>
//             <Button size='large' variant="contained" startIcon={<AddIcon />} onClick={handlemodal}>
//                 Approve/Reject
//             </Button>
//           </Grid>
//           <Grid item xs={6}>
//               <AddServiceProvider open={modalopen} onClose={handlemodalclose} updateid={updateid} />

//             <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletebusbyid" />
//             <div className='masterHeading'><h2 className='centerContent'> Service Provider Approval </h2> </div>
//           </Grid>
//           <Grid item xs={3}>
//           </Grid>
//         </Grid>
  

//   <Grid item xs={12} style={{marginRight:"10px",marginLeft:"10px"}}>
//   <DataTable
//             columns={columns}
//             data={busdetailsfiltered}
//             fixedHeader
//             fixedHeaderScrollHeight="600px"
//             pagination
//             responsive
//             // striped
//             subHeaderAlign="right"
//             subHeaderWrap
//             subHeader
//             subHeaderComponent={<input type="text" placeholder="Search here"  style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
//             customStyles={customStyles}
//             highlightOnHover
//             desnse

//         />
//   </Grid>
  
// </Grid>

//         </Box>
//     );
// }

// export default ServiceProvider;
import { Check, Close, Delete, Edit, Label } from '@mui/icons-material';
import { Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Checkbox, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';

import Bus_service from '../../Services/Bus_service';
import Slaformaster_service from '../../Services/Slaformaster_service';
import axios from 'axios';
import Conductor_service from '../../Services/Conductor_service';
import Driver_service from '../../Services/Driver_service';
import Approval from './Approval';
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

function ServiceProvider(props) {

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
  const [slafortype,setSlafortype] = useState("");
  const [sla,setsla] = useState('');
  const slaMaster = {"id": sla}
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [rowDataForEdit, setRowDataForEdit] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null); // Assuming you track the selected row id

  const keys = ["details", "instance", "penalty", "penaltydetail"];
  
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



  useEffect(()=>{
    Slaformaster_service.getAll().then((res)=>{
      setslafordetails(res.data); 
      console.log(res.data)
    }).catch(err=>console.log(err))
  },[])
 
  const handleRowSelect = (id) => {
    setSelectedRowId(id); // Set the selected row id in state
  };
  const handleApproval = async (id) => {
    try {
      console.log('ID being passed:', id);
      let serviceToUpdate;
      let row_id = id;
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
        console.log(slaOptions)

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
    setRowDataForEdit(row);
    setEditDialogOpen(true);
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
    name: 'Details',
    selector: row => row.details,
    sortable:true,
    center:true,
    wrap:true
},
{
  name: 'Instance',
  selector: row => row.instanceMaster && row.instanceMaster.instancename ? row.instanceMaster.instancename: '',
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Penalty',
  selector: row => row.penalty,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Penalty Detail',
  selector: row => row.penaltydetail,
  sortable:true,
  center:true,
  wrap:true
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
  name: 'Status',
  cell: (row) => {
    if (row.isapproved === true && row.isvalid === true && row.isresolved === true) {
      return <span style={{ color: 'green' }}>Approved</span>;
    } 
    else if (row.isapproved === false && row.isvalid === true && row.isresolved === true) {
      return <span style={{ color: 'red' }}>Rejected</span>;
    } 
    else {
      return  <Edit
      className='editbutton'
      onClick={updatedata.bind(this,row.id)}
      // onClick={() => handleApproval(row.id)}
    />;
    }
  },
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width: '150px'
},
// {
//   name: 'Approve/Reject',
//   cell: (row) => (
//     <>
//       <Edit
//         className='editbutton'
//         onClick={updatedata.bind(this,row.id)}
//         // onClick={() => handleApproval(row.id)}
//       />
//     </>
//   ),
//   ignoreRowClick: true,
//   allowOverflow: true,
//   button: true,
//   width: '150px'
// }


  
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
            {/* <Button size='large' variant="contained" startIcon={<AddIcon />} onClick={handlemodal}>
                Approve/Reject
            </Button> */}
          <TextField 
          style={{width: '150px'}}
          id="standard-basic" 
      select
      label="Select SLA For"  
      variant="standard" 
      name='slafor' value={slafor} 
      onChange={handleSlaforChange}
      // onChange={(e)=>setSlafor(e.target.value)} 
      required
        >
              <MenuItem>
        
        </MenuItem>
{slafordetails.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.slafor}
        </MenuItem>
      ))}
      </TextField>
          </Grid>
          <Grid item xs={6}>
              {/* <AddDm open={modalopen} onClose={handlemodalclose} updateid={updateid} /> */}
            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletebusbyid" />
            <div className='masterHeading'><h2 className='centerContent'> Service Provider Approval </h2> </div>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>

  <Grid item xs={12} style={{marginRight:"10px",marginLeft:"10px"}}>
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
        />
      <Approval open={modalopen} onClose={handlemodalclose} updateid={updateid} />
  </Grid>
  
</Grid>

        </Box>
    );
}
export default ServiceProvider;
