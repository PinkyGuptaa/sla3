import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';
import Warningmaster_service from '../../Services/Warningmaster_service';
import Addwarning from './AddWarning';
import { customStyles } from '../../datatable';

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
//         backgroundColor:"#A5D8DD",
//         textAlign:"center !important",
//         '&:hover': {
//           backgroundColor: '#267871 !important',
//           color:"white !important",
//           fontWeight:"900 !important"
//         }, 
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
//         color:'white',
//         paddingLeft:"10px",
//         width:"fit-content",
//         whiteSpace: "normal !important",
//         wordBreak: "auto-phrase !important",
//         color:"white"
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

function WarningMaster(props) {

  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [warningdetails,setwarningdetails] = useState([]);
  const [warningdetailsfiltered,setwarningdetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");

  const keys = ["name","stname"];
  
  useEffect(() => {
    const result = warningdetails.filter(item => {
      return keys.some((key) => (item[key]===null?"":item[key]).toLowerCase().includes(search.toLowerCase()))
    })
    setwarningdetailsfiltered(result)
  }, [search])

  useEffect(()=>{
    Warningmaster_service.getAll().then((response)=>{
       console.log(response.data);
       setwarningdetails(response.data);
       setwarningdetailsfiltered(response.data)
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
        name: 'Warning Name',
        selector: row => row.name,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
    },
  {
    name: 'Warning Short Name',
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"} className='pageheader'>
          <Grid item xs={4}  style={{marginTop:"10px "}}>
          <div className='masterHeading'><h2 className='centerContent' style={{color:'white',fontSize: '24px'}}> Warning Master </h2> </div>
          </Grid>
          <Grid item xs={5}>
            <Addwarning open={modalopen} onClose={handlemodalclose} updateid={updateid} />
            <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deletewarningbyid" />
           
          </Grid>
          <Grid item xs={3} style={{marginTop:"10px "}}>
          <Button variant="contained" style={{backgroundColor:'#136a8a', marginRight:'50px'}} startIcon={<AddIcon />} onClick={handlemodal}>
                Add Warning
            </Button>
          </Grid>
        </Grid>
  <Grid item xs={12}  style={{marginTop:"-10px"}}>
  <DataTable
            columns={columns}
            data={warningdetailsfiltered}
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

export default WarningMaster;