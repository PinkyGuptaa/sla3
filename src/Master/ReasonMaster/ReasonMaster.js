import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';
import Reasonmaster_service from '../../Services/Reasonmaster_service';
import Addreason from './AddReason';


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
        backgroundColor:"#A5D8DD",
        textAlign:"center !important",
         
      },
  },
  headCells: {
      style: {
        fontSize:'14px',
        height:"auto",
        backgroundColor:'#267871',
        borderRadius: "10",
        border: "#34ebcc 5px",
        textAlign:"center",
        //padding:"0px !important",
        fontWeight:"700 !important",
        color:'white',
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

function ReasonMaster(props) {

  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [reasondetails,setreasondetails] = useState([]);
  const [reasondetailsfiltered,setreasondetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");

  const keys = ["name","stname"];
  
  useEffect(() => {
    const result = reasondetails.filter(item => {
      return keys.some((key) => (item[key]===null?"":item[key]).toLowerCase().includes(search.toLowerCase()))
    })
    setreasondetailsfiltered(result)
  }, [search])

  useEffect(()=>{
    Reasonmaster_service.getAll().then((response)=>{
       console.log(response.data);
       setreasondetails(response.data);
       setreasondetailsfiltered(response.data)
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
        name: 'Reason Name',
        selector: row => row.name,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
    },
  {
    name: 'Reason Short Name',
    selector: row => row.stname,
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"}  className='pageheader'>
          <Grid item xs={4}  style={{marginTop:"10px "}}>
          <div className='masterHeading'><h2 className='centerContent' style={{color:'white',fontSize: '24px'}}> Reason Master </h2> </div>
          </Grid>
          <Grid item xs={5}>
            <Addreason open={modalopen} onClose={handlemodalclose} updateid={updateid} />
            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletereasonbyid" />
            
          </Grid>
          <Grid item xs={3} style={{marginTop:"10px "}}>
          <Button variant="contained" style={{backgroundColor:'#136a8a', marginRight:'50px'}} startIcon={<AddIcon />} onClick={handlemodal}>
                Add Reason
            </Button>
          </Grid>
        </Grid>
  <Grid item xs={12} style={{marginTop:"-10px"}}>
  <DataTable
            columns={columns}
            data={reasondetailsfiltered}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            pagination
            responsive
            subHeaderAlign="right"
            // subHeaderWrap
            // subHeader
            // subHeaderComponent={<input type="text" placeholder="Search here"  
            // style={{paddingLeft:"10px"}} value={search} onChange={(e)=>setSearch(e.target.value)}/>}
            customStyles={customStyles}
            highlightOnHover
            desnse
        />
  </Grid>
  
</Grid>

        </Box>
    );
}

export default ReasonMaster;