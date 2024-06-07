import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Deletecomponent from '../../Components/Deletecomponent';
import Agencymaster_service from '../../Services/Agencymaster_service';
// import Invoice_services from '../Invoice_services';
import Invoice_services from '../../Services/Invoice_services';
// import AddAgency from './AddAgency';
import { customStyles } from '../../datatable';
import Updateinvoice from './Updateinvoice';
import { teal } from '@mui/material/colors';


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

function Invoice(props) {

  const [modalopen,setModalopen] = useState(false)
  const [deletemodalopen,setDeleteodalopen] = useState(false)
  const [agencydetails,setagencydetails] = useState([]);
  const [agencydetailsfiltered,setagencydetailsfiltered] = useState([]);
  const [updateid,setUpdateid] = useState('');
  const [deleteid,setDeleteid] = useState('');
  const [search,setSearch] = useState("");
  const [approvalType, setApprovalType] = useState("penalty");


  const keys = ["invoiceNo.invoiceno","amttoreceived"];
  
  useEffect(() => {
    const preprocessedKeys = keys.map((key) => {
      const [firstKey, secondKey] = key.split('.');
      return { firstKey, secondKey };
    });
    const result = agencydetails.filter(item => {
      return preprocessedKeys.some(({ firstKey, secondKey }) => {
        const itemValue = secondKey ? item[firstKey][secondKey] : item[firstKey];
        return itemValue.toLowerCase().includes(search);
      });    })
    setagencydetailsfiltered(result)
  }, [search])


  useEffect(()=>{
    Invoice_services.getAll().then((response)=>{
       console.log(response.data);
       setagencydetails(response.data);
       setagencydetailsfiltered(response.data)
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
        name: 'Invoice No',
        selector: row => row.invoiceNo?.invoiceno,
        sortable:true,
        center: true, 
        wrap: true
        // width:"250px",
    },
  {
    name: 'Invoice Date',
    selector: row => row.invoiceNo?.invoicedate,
    sortable:true,
    center:true,  
    wrap:true
},
{
  name: 'Amount',
  selector: row => row.amttoreceived,
  sortable:true,
  center:true,
  wrap:true
},
{
  name: 'Status',
  selector: row => row.amttoreceived==row.amtreceived?"Settled":"Pending",
  sortable:true,
  center:true,
  wrap:true
},

{
	name: 'Action',
  			
  cell: (row) =>row.amttoreceived!=row.amtreceived?<>
           <Button variant="contained" style={{backgroundColor:'#136a8a'}} onClick={()=>handlemodal(row)}>
                Update
            </Button>
   {/* <Edit className='editbutton' onClick={updatedata.bind(this,row.id)}/> <Delete className='deletebutton' onClick={deletedata.bind(this,row.id)}/>  */}
    </>:"No Action" ,
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width:"250px",
}
];

const handlemodal = (row) =>{
  setModalopen(true);
  setUpdateid(row);
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
          <Grid item xs={4} style={{marginTop:"10px "}}>
          <div className='masterHeading'><h2 className='centerContent' style={{color:'white',fontSize: '24px'}}> Invoice Details </h2> </div>
          </Grid>
          <Grid item xs={5}>
            <Updateinvoice open={modalopen} onClose={handlemodalclose} updateid={updateid} />
            {/* <Deletecomponent open={deletemodalopen} onClose={handledeletemodalclose} deleteid={deleteid} servicename="deleteagencybyid" /> */}
           
          </Grid>
          <Grid item xs={3} style={{marginTop:"10px "}}>
          {/* <Button variant="contained" style={{backgroundColor:'#136a8a', marginRight:'50px'}} startIcon={<AddIcon />} onClick={handlemodal}>
                Add Agency
            </Button> */}
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
        // onChange={handleApprovalTypeChange}
        color="white"
      >
        <FormControlLabel value="penalty" control={<Radio sx={{
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
          </Grid>
        </Grid>
  <Grid item xs={12}  style={{marginTop:"-10px"}}>
  <DataTable
            columns={columns}
            data={agencydetailsfiltered}
            fixedHeader
            fixedHeaderScrollHeight="65%"
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
            paginationPerPage={15}
        />
  </Grid>
  
</Grid>

        </Box>
    );
}

export default Invoice;