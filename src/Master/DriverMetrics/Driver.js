import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Slamaster_service from '../../Services/Slatypemaster_service';
import Deletecomponent from '../../Components/Deletecomponent';
// import Addslatype from './Addslatype';
import Addbus from './Adddriver'
import Adddrive from './Adddriver'
import Driver_service from '../../Services/Driver_service';

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

function Bus(props) {

  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [busdetails,setbusdetails] = useState([]);
  const [busdetailsfiltered,setbusdetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");

  const keys = ["slaMaster","details", "instance", "penalty", "penaltydetail"];
  
  useEffect(() => {
    const result = busdetails.filter(item => {
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

  const updatedata = (id) =>{
       setUpdateid(id);
       setModalopen(true);
  }

  const deletedata = (id) =>{
    setDeleteid(id);
    setDeleteodalopen(true)
  
  }

  const columns = [
   
    {
        name: 'SLA',
        selector: row => row.slaMaster,
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
  selector: row => row.instance,
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
  selector: row => row.qualityStandardMaster,
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
  name: 'Resolved Date',
  selector: row => row.resolvedate,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Customer Complaint No.',
  selector: row => row.customerComplaint,
  sortable:true,
  center:true,
  wrap:true
},
{
    name: 'Entry Date',
    selector: row => row.entrydate===null?"":row.entrydate.substr("0","10"),
    sortable:true,
    center:true
  },

{
	name: 'Action',
  			
  cell: (row) =><> <Edit className='editbutton' onClick={updatedata.bind(this,row.id)}/> <Delete className='deletebutton' onClick={deletedata.bind(this,row.id)}/>  </> ,
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
}
];

const handlemodal = () =>{
  setModalopen(true);
  setUpdateid('');
}

const handlemodalclose = () =>{
  setModalopen(false);
}

const handledeletemodalclose = () =>{
  setDeleteodalopen(false);
}
return (
     <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center"}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} style={{textAlign:"center",background:"lightgrey"}}>
          <Grid item xs={3}>
            <Button size='large' variant="contained" startIcon={<AddIcon />} onClick={handlemodal}>
                Add Bus Metrics
            </Button>
          </Grid>
          <Grid item xs={6}>
              <Addbus open={modalopen} onClose={handlemodalclose} updateid={updateid} />

            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletebusbyid" />
            <div className='masterHeading'><h2 className='centerContent'> Bus Performance Metrics </h2> </div>
          </Grid>
          <Grid item xs={3}>

          </Grid>
        </Grid>
  

  <Grid item xs={12} style={{marginRight:"10px",marginLeft:"10px"}}>
  <DataTable
            columns={columns}
            data={busdetailsfiltered}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            pagination
            responsive
            // striped
            subHeaderAlign="right"
            subHeaderWrap
            subHeader
            subHeaderComponent={<input type="text" placeholder="Search here"  style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
            customStyles={customStyles}
            highlightOnHover
            desnse
            
            


        />
  </Grid>
  
</Grid>

        </Box>
    );
}

export default Bus;