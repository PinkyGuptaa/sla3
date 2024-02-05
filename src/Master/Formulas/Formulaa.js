import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import BreakdownFormula from '../../assets/images/breakdownformula.PNG'
import AvailabiltyFormula from '../../assets/images/availabiltyformula.PNG'

function Formula(){

    const handleClickpdf = () => {
        // Replace 'your-pdf-file.pdf' with the actual file name or URL
        const pdfUrl = process.env.PUBLIC_URL + '/1919.pdf';
    
        // Open the PDF in a new tab
        window.open(pdfUrl, '_blank');
      };

    return (
        <div style={{ display: 'flex',flexDirection:"column", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{display:"flex",width:"-webkit-fill-available",justifyContent:'space-between',background:'lightgrey',height:"100px",alignItems:'center'}}>
          
        <Typography variant="h5" align="center" style={{marginLeft:'20px',color:"#678cdc",fontWeight:'900'}} gutterBottom>
          All Formulas Used
        </Typography>
        </div>
  
        <Box style={{ display: 'flex',flexDirection:"column", alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{display:"flex",flexDirection:"row",padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
            <div style={{display:"flex"}}>
               <p> View Pdf </p> 
               <Button onClick={handleClickpdf}> View </Button> 
            </div>

        </div>
          <div style={{display:"flex",flexDirection:"column",border: "1px solid black",boxShadow: "1px 1px grey",
    padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
               <div style={{display:"flex",color:"black",fontWeight:"bold",fontSize:"17px"}}>
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",borderBottom:"1px solid"}}>For Breakdown - Clause 20.2.2 </span></div>
               <div style={{display:"flex",margin:"10px 0px"}}>
                <div>
                   <img src={BreakdownFormula} />
                </div>
                
               </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",border: "1px solid black",boxShadow: "1px 1px grey",
    padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
               <div style={{display:"flex",color:"black",fontWeight:"bold",fontSize:"17px"}}>
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",borderBottom:"1px solid"}}>For Availabilty - Clause 20.3.3</span>
                </div>
               <div style={{display:"flex",margin:"10px 0px"}}>
                <div>
                   <img src={AvailabiltyFormula} />
                </div>
                
               </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",border: "1px solid black",boxShadow: "1px 1px grey",
    padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
               <div style={{display:"flex",color:"black",fontWeight:"bold",fontSize:"17px"}}>
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",borderBottom:"1px solid"}}> For Puntuality</span> </div>
               <div style={{display:"flex",margin:"10px 0px"}}>
                <div>
                 <p><span style={{color:"black",fontWeight:"bold"}}>Guaranteed Start Punctuality - </span> <span>shall be equal to more than 90% </span> <span>{` ( Clause 20.4.4 )`}</span> </p>
                 <p><span style={{color:"black",fontWeight:"bold"}}>Guaranteed Arrival Punctuality -  </span> <span> shall be equal to more than 80% </span> <span>{` ( Clause 20.4.4 )`}</span></p>
                 <p><span style={{color:"black",fontWeight:"bold"}}>Start Punctuality Relaxation-  </span> <span>upto 5 minutes for start time </span> <span>{` ( Clause 20.4.3 )`}</span></p>
                 <p><span style={{color:"black",fontWeight:"bold"}}>Arrival Punctuality Relaxation-  </span> <span>upto max 15 minutes </span> <span>{` ( Clause 20.4.3 )`}</span></p>
                </div>
                
               </div>
          </div>
            </Box>

            </div>

    )

}

export default Formula