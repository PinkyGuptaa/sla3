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

        <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{display:"flex",flexDirection:"column",width:"45vw",margin:"0 10px 10px 0"}}>
            <div style={{display:"flex",flexDirection:"column",border: "1px solid black",boxShadow: "1px 1px grey",
    padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
               <div style={{display:"flex",color:"black",fontWeight:"bold",fontSize:"17px"}}>
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",borderBottom:"1px solid"}}>For Breakdown - Clause 20.2.2 </span></div>
               <div style={{display:"flex",margin:"10px 0px",flexDirection:"column"}}>
                <div>
                   <img src={BreakdownFormula} width="80%"/>
                </div>
                <div>
                  <p><span style={{color:"black",fontWeight:"bold"}}>*</span> <span style={{color:"black"}}>The operator agrees that for every increase in the Breakdown Factor by 0.1 above 0.5, it shall pay Damages to the authority at the rate of 0.1% of the Monthly Fees.</span><span>{` ( Clause 20.2.3 )`}</span></p>
                </div>
                <div>
                  <p><span style={{color:"black",fontWeight:"bold"}}>*</span> <span style={{color:"black"}}>The authority agrees that for every 0.1 decrease in the Breakdown Factor below a factor of 0.5, the authority shall pay to the operator an incentive equal to 0.05% of the Monthly Fees.</span><span>{` ( Clause 20.2.4 )`}</span></p>
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
                 <p><span style={{color:"black",fontWeight:"bold"}}>*</span> <span style={{color:"black"}}>The Operator agrees that for every 1% reduction in start punctuality or arrival punctuality in a month, as compared to Guaranteed start or arrival punctuality, it shall pay damages to the authority at the rate of 2% of the monthly fees. </span><span>{` ( Clause 20.4.5 )`}</span></p>

                 <p><span style={{color:"black",fontWeight:"bold"}}>*</span> <span style={{color:"black"}}>The authority agrees that for every 1% increase in start punctuality or arrival punctuality in a month, as compared to Guaranteed start or arrival punctuality, it shall pay incentive to the operator at the rate of 0.05% of the monthly fees. </span><span>{` ( Clause 20.4.6 )`}</span></p>

                </div>
                
               </div>
          </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",width:"45vw"}}>
            <div style={{display:"flex",flexDirection:"column",border: "1px solid black",boxShadow: "1px 1px grey",
    padding: "10px",width: "-webkit-fill-available",margin:"10px 0"}}>
               <div style={{display:"flex",color:"black",fontWeight:"bold",fontSize:"17px"}}>
                <span style={{color:"black",fontWeight:"bold",fontSize:"17px",borderBottom:"1px solid"}}>For Availabilty - Clause 20.3.3</span>
                </div>
               <div style={{display:"flex",margin:"10px 0px",flexDirection:"column"}}>
                <div>
                   <img src={AvailabiltyFormula} width="80%"/>
                </div>
               
                
               </div>
          </div>
            </div>
        </div>
          

         

         
            </Box>

            </div>

    )

}

export default Formula