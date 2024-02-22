import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AssignmentLate, Assistant, DepartureBoard } from "@mui/icons-material";
import { useEffect } from "react";
import Environment from './Environment/Environment.json';
import axios from "axios";
import { useState } from "react";
export default function Home() {

  const Base_url = Environment.Base_Url
  const [penaltydetails,setpenaltydetails] = useState([]);
  const [incrementdetails,setIncrementdetails] = useState([]);

  useEffect(()=>{
   
    axios.get(`${Base_url}/busperformance/getQualityTypeCount`).then((res)=>{
       setpenaltydetails(res.data);
    }).catch((err)=>console.log(err));

    axios.get(`${Base_url}/pincentive/getQualityTypeCount`).then((res)=>{
      setIncrementdetails(res.data);
 }).catch((err)=>console.log(err));

  },[]);

  const checkpenalty = (type) =>{
    let value = 0;
    penaltydetails.map((data)=>{
     if(data.quality==type){
         value = data.totalCountPenalty;
     }
    })
    return value;
  }

  const checkincrement = (type) =>{
    let value = 0;
    incrementdetails.map((data)=>{
     if(data.quality==type){
         value = data.totalCountIncentive;
     }
    })
    return value;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "80vh",
        // background: "linear-gradient(to bottom, #99f2c8, #1f4037)",
        padding: "0 20px",
        flexWrap:"wrap"
      }}
    >
      {/* <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 700,
          backgroundImage: "linear-gradient(to right, #267871, #136a8a);",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          borderRadius: "16px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              // fontWeight: "bold",
              letterSpacing: "1.5px",
              marginBottom: "20px"
            }}
          >
            Service Level Agreement
          </Typography>
          <Typography variant="body1"  sx={{
              textAlign: "center"
            }}>
            A service-level agreement (SLA) sets the expectations between the
            service provider and the customer and describes the products or
            services to be delivered, the single point of contact for end-user
            problems, and the metrics by which the effectiveness of the process
            is monitored and approved.
          </Typography>
        </CardContent>
      </Card> */}
      <div style={{display:"flex",width:"-webkit-fill-available",
    justifyContent: "space-between"}}>
      <div className="homecard">
        <div className="homecardheading" style={{background:"#064741"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}>Reliabilityy</p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Reliability (BF)")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Reliability (BF)")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Operational Availability </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
              <div>{checkpenalty("Operational Availability")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
              <div>{checkincrement("Operational Availability")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Start Punctuality </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Start Punctuality")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Start Punctuality")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Arrival Punctuality </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Arrival Punctuality")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Arrival Punctuality")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      </div>

      <div style={{display:"flex",width:"-webkit-fill-available",
    justifyContent: "space-between",marginTop:"30px"}}>
      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}} >
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Trip Frequency </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Trip Frequency")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Trip Frequency")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Bus KMs Frequency </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Bus KMs Frequency")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Bus KMs Frequency")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Minor Accident  </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Minor Accident (Safety of Operation)")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Minor Accident (Safety of Operation)")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>

      <div className="homecard">
        <div className="homecardheading" style={{background:"#136a8a"}}>
          <p style={{margin:"0px"}}> <span><DepartureBoard style={{width:"35px"}}/></span>
          
          </p> 
          <p style={{margin:"0px",fontWeight:"600",fontSize:"18px"}}> Major Accident  </p> 
        </div>
        <div className="homecarddetails">
          <div style={{display:"flex",width:"inherit"}}>
             <div className="homecarddetails1" style={{borderRight:"1px solid grey"}}>
              <div style={{display:"flex"}}><AssignmentLate style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkpenalty("Major Accident (Safety of Operation)")}</div>
                <div>Penalty</div>
              </div>
              </div>

              <div className="homecarddetails1">
              <div style={{display:"flex"}}><Assistant style={{width:"35px",height:"38px"}}/></div>
              <div style={{ display: "flex",alignItems: "center",flexDirection: "column"}}>
                <div>{checkincrement("Major Accident (Safety of Operation)")}</div>
                <div>Increment</div>
              </div>
              </div>
          </div> 
        </div>

      </div>
      </div>
      

      
   

      
    </div>
  );
}
