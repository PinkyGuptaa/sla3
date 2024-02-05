import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';
import Addsla from './Addsla';
import Slamaster_service from '../../Services/Slamaster_service';

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

function Slaformaster(props) {

  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [slafordetails,setslafordetails] = useState([]);
  const [slafordetailsfiltered,setslafordetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");

  const keys = ["sla","details","remarks",];
  
  useEffect(() => {
    const result = slafordetails.filter(item => {
      return keys.some((key) => (item[key]===null?"":item[key]).toLowerCase().includes(search.toLowerCase()))
    })
    setslafordetailsfiltered(result)
  }, [search])

  useEffect(()=>{
    Slamaster_service.getAll().then((response)=>{
       console.log(response.data);
       setslafordetails(response.data);
       setslafordetailsfiltered(response.data)
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
        selector: row => row.sla,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
        
    },
  {
    name: 'Detail',
    selector: row => row.details,
    sortable:true,
    center:true,
    wrap:true
},
// {
//   name: 'Penalty One',
//   selector: row => row.penaltyone,
//   sortable:true,
//   center:true,
//   wrap:true
// },
// {
//   name: 'Penalty Two',
//   selector: row => row.penaltytwo,
//   sortable:true,
//   center:true,
//   wrap:true
// },
// {
//   name: 'Penalty Three',
//   selector: row => row.penaltythree,
//   sortable:true,
//   center:true,
//   wrap:true
// },
{
  name: 'Remarks',
  selector: row => row.remarks,
  sortable:true,
  center:true,
  wrap:true
},


{
  name: 'Duration',
  selector: row => row.duration,
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
                Add SLA 
            </Button>
          </Grid>
          <Grid item xs={6}>
              <Addsla open={modalopen} onClose={handlemodalclose} updateid={updateid} />

            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deleteslabyid" />
            <div className='masterHeading'><h2 className='centerContent'> SLA Master </h2> </div>
          </Grid>
          <Grid item xs={3}>

          </Grid>
        </Grid>
  

  <Grid item xs={12} style={{marginRight:"10px",marginLeft:"10px"}}>
  <DataTable
            columns={columns}
            data={slafordetailsfiltered}
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

export default Slaformaster;