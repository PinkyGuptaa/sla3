
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../Home";
import axios from "axios";
import Slamaster from '../Master/SlaMaster/Slamaster';
import Slatypemaster from '../Master/SlaTypeMaster/Slatypemaster'
import QualityStandardmaster from '../Master/QualityStandardMaster/Qualitystandardmaster';
import BusPerformance from '../Master/BusPerformanceMetrics/BusPerformance'
import ConductorPerformance from '../Master/ConductorPerformance/ConductorPerformance';
import Dmapproval from '../Master/Dmapproval/Dm'
import ServiceProvider from '../Master/ServiceProvider/ServiceProvider'
import Verify from './Verify.js';
import Slaformaster from '../Master/SlaForMaster/Slaformaster';
import CustomerComplaint from '../Master/CustomerComplaint/CustomerComplaint';
import AgencyMaster from '../Master/AgencyMaster/AgencyMaster';
import ActionMaster from '../Master/ActionMaster/ActionMaster';
import OutcomeMaster from '../Master/OutcomeMaster/OutcomeMaster';
import QualityCheckMaster from '../Master/QualitycheckMaster/QualitycheckMaster';
import ReasonMaster from '../Master/ReasonMaster/ReasonMaster';
import BusScheduleMatrics from '../Master/ScheduleMatrics/BusScheduleMatrics'
import BreakdownFactor from '../Master/BreakdownFactor/Breakdown'
import Frequency from '../Master/BreakdownFactor/Frequency'
import SafetyOperation from "../Master/SafetyOperation/SafetyOperation";
import GenericPenaltyMaster from "../Master/GenericPenaltyMaster/GenericPenaltyMaster";
import PenaltyMaster from "../Master/PenaltyMasterForQC/PenaltyMaster";
import IncentiveMaster from "../Master/IncentiveMaster/IncentiveMaster"
import WarningMaster from '../Master/WarningMaster/WarningMaster'
import Report from '../Master/Report/Report';
import HalfYearlyReport from '../Master/Report/HalfyearlyReport';
import InstanceReport from '../Master/Report/InstanceReport';
import MonthlyReport from '../Master/ReportGenerate/MonthlyReport';
import Busavailablematrics from "../Master/BusAvailableMatrics/BusAvailableMatrics";
import Busdetails from "../Master/Busdetails/Busdetails";
import Formula from "../Master/Formulas/Formula";
import { AccountCircle, ChevronLeft, ChevronRight, MenuBook, MenuOutlined, StarBorder ,Home, Build, PersonRounded, LabelImportant} from "@mui/icons-material";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import Environment from '../Environment/Environment.json'; 
import { ToastContainer } from 'react-toastify';
import ParameterReport from "../Master/ReportGenerate/ParameterWise";

  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
      ({ theme, open }) => ({
        flexGrow: 1,
        // padding: theme.spacing(3),
        padding:"0px",
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: 0
        })
      })
    );
    
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open"
    })(({ theme, open }) => ({
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      })
    }));
    
    const DrawerHeader = styled("div")(({ theme }) => ({
      display: "flex",
      alignItems: "center",
      // padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    }));
    
    
    export default function Sidebar() {
      // const theme = useTheme();
      const [anchorEl,setAnchorEl] = useState(null);
      const [sidebar, setSidebar] = React.useState(false);
      const profilemodal = Boolean(anchorEl);
      const [open, setOpen] = React.useState(false);
      const [openServices, setOpenServices] = React.useState(false);
      const [openReport, setOpenReport] = React.useState(false);
      const [activeid,setActiveid] = useState('');
      const [pto,setPto] = useState('');
      const [ptocheckbox,setPtocheckbox] = useState(false);
      const [ptodetails,setPtodetails] = useState([])
      const Base_Url = Environment.Base_Url;
      const Base_Url1 = Environment.Base_Url1;
    useEffect(()=>{
      sessionStorage.setItem("entryby","Pinky");
      sessionStorage.setItem("depotId","D01");
    },[])
    useEffect(()=>{
      axios.get(`${Base_Url1}/busperformance/getpto`).then((res)=>{
          setPtodetails(res.data);
          
      }).catch((err)=>{
       console.log(err);
      })
 },[])
      const handleClick = () => {
    setOpen(!open);
    setOpenServices(false);
    setOpenReport(false)
  };
  const handleServicesClick = () => {
    setOpenServices(!openServices);
    setOpen(false);
    setOpenReport(false);
  };
  const handleReportClick = () => {
    setOpenReport(!openReport);
    setOpen(false)
    setOpenServices(false);
    
  };

      const handleDrawer = () => {
        setSidebar(!sidebar);
        // setOpen(false);
        // setOpenServices(false);
        // setOpenReport(false)
      };
       
      const handleprofilemodal = (event) =>{
        setAnchorEl(event.currentTarget);
      };

      const handlecloseprofilemodal =()=>{
        setAnchorEl(null);
      }

      const changeactiveid= (id)=>{
        setActiveid(id);
      }
      const handleptoChange = (e)=>{
        setPto(e.target.value)
       //  console.log(e.target.value);
        sessionStorage.setItem("pto",e.target.value);
   }

   const handleptocheck = ()=>{
      setPtocheckbox(!ptocheckbox);
      if(ptocheckbox==true){
       setPto("");
       sessionStorage.setItem("pto","");
      }
   }

    
      return (
        <BrowserRouter>
       
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" 
          open={sidebar} 
          sx={{height:"80px",
          // background: rgb(4,6,108),
          // background: linear-gradient(90deg, rgba(4,6,108,1) 0%, rgba(69,71,159,1) 50%, rgba(0,1,59,1) 100%);
          backgroundImage: 'linear-gradient(to right, #267871, #136a8a);',
          // backgroundImage: 'linear-gradient(180deg, rgba(66,140,198,1) 8%, rgba(3,62,108,1) 35%, rgba(2,31,71,1) 70%, rgba(21,45,78,1) 76%)',
          // width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{ mr: 2, }}
              >
                <MenuOutlined />
              </IconButton>
              <Typography variant="h4" noWrap component="div" 
              sx={{textAlign:"center",fontWeight:"500",marginLeft:"auto",marginRight:"auto",display:"block",letterSpacing:"1.5px",wordSpacing:"4px",marginTop:"10px"}} alignItems="center">
               Service Level Agreement 
              </Typography>
              <div>
                 <IconButton
                     id="basic-button"
                     aria-controls={profilemodal? 'basic-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={profilemodal ? 'true' : undefined}
                     onClick={handleprofilemodal}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={profilemodal}
        onClose={handlecloseprofilemodal}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem > Logout </MenuItem>
        </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
             sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                transition: "width 0.3s ease-in-out",
              },
            }}
            variant="persistent"
            anchor="left"
            open={sidebar}
          >
            <DrawerHeader>
            <Typography variant="h6" 
            sx={{textAlign:"center", marginTop: "16px", 
            marginRight:"85px" , color: '#136a8a'}}>
              SLA
            </Typography>
            </DrawerHeader>

            <Divider />
            <List style={{ overflowY: "auto",marginBottom:"150px" }}>
              <NavLink to="/home" 
              style={{color:"black",
              textDecoration:"None",
              background:activeid===1?"lightgrey":""}} >
                <ListItem  disablePadding 
                onClick={changeactiveid.bind(this,1)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Home />
                      {/* <MenuBook /> */}
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                </NavLink>
            <Divider />
          <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonRounded />
        </ListItemIcon>
        <ListItemText primary=" Master " />
        {open ? <ChevronRight /> : <ChevronLeft />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
      
      <List component="div" disablePadding  style={{color:"black",textDecoration:"None",
          background:activeid===2?"lightgrey":""}}>
          <NavLink to="/slaformaster" 
          style={{color:"black",textDecoration:"None",
          background:activeid===2?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} 
          onClick={changeactiveid.bind(this,2)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA For Entities " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===10?"lightgrey":""}}>
          <NavLink to="/slatypemaster" style={{color:"black",textDecoration:"None",background:activeid===10?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,10)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA Type Master " />
          </ListItemButton>
          </NavLink>
            </List>
        <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===11?"lightgrey":""}}>
          <NavLink to="/slamaster" style={{color:"black",textDecoration:"None",background:activeid===11?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,11)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA Master " />
          </ListItemButton>
          </NavLink>
            </List>
          
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===5?"lightgrey":""}} >
          <NavLink to="/genericpenaltymaster" style={{color:"black",textDecoration:"None",background:activeid===5?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,5)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Generic Penalty Master " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===6?"lightgrey":""}}>
          <NavLink to="/penaltymaster" style={{color:"black",textDecoration:"None",background:activeid===6?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,6)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA Penalty" />
          </ListItemButton>
          </NavLink>
            </List>
        
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===25?"lightgrey":""}}>
          <NavLink to="/incentivemaster" style={{color:"black",textDecoration:"None",background:activeid===25?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,25)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA Incentive" />
          </ListItemButton>
          </NavLink>
            </List>

            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===12?"lightgrey":""}}>
          <NavLink to="/qcmaster" style={{color:"black",textDecoration:"None",background:activeid===12?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,12)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Generic Quality Check " />
          </ListItemButton>
          </NavLink>
            </List>

 
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===13?"lightgrey":""}}>
          <NavLink to="/qualitystandardmaster" style={{color:"black",textDecoration:"None",background:activeid===13?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,13)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" SLA Quality Parameter " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{background: activeid === 3 ? "lightgrey" : ""}}>
          <NavLink to="/agencymaster" style={{color:"black",textDecoration:"None",background:activeid===3?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,3)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Agency Master " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding  style={{color:"black",textDecoration:"None",background:activeid===4?"lightgrey":""}}>
          <NavLink to="/warningmaster" style={{color:"black",textDecoration:"None",background:activeid===4?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,4)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Warning Master " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===7?"lightgrey":""}}>
          <NavLink to="/actionmaster" style={{color:"black",textDecoration:"None",background:activeid===7?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,7)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Action Master " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===8?"lightgrey":""}}>
          <NavLink to="/reasonmaster" style={{color:"black",textDecoration:"None",background:activeid===8?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,8)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Reason Master " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===9?"lightgrey":""}}>
          <NavLink to="/outcomemaster" style={{color:"black",textDecoration:"None",background:activeid===9?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,9)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Outcome Master " />
          </ListItemButton>
          </NavLink>
            </List>
            </Collapse>
            <Divider/>
            <ListItemButton onClick={handleServicesClick}>
        <ListItemIcon>
          <MiscellaneousServicesIcon />
        </ListItemIcon>
        <ListItemText primary=" Services " />
        {openServices ? <ChevronRight /> : <ChevronLeft />}
      </ListItemButton>
      <Collapse in={openServices} timeout="auto" unmountOnExit>
      <List component="div" disablePadding style={{background: activeid === 24 ? "lightgrey" : ""}}>
                    <NavLink
                      to="/formulas"
                      style={{
                        color: "black",
                        textDecoration: "None",
                        background: activeid ===24 ? "lightgrey" : "",
                      }}
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={changeactiveid.bind(this, 24)}
                      >
                        <ListItemIcon>
                          <LabelImportant />
                        </ListItemIcon>
                        <ListItemText primary="All Formulas Used " />
                      </ListItemButton>
                    </NavLink>
                  </List>
      <List component="div" disablePadding style={{background: activeid === 23 ? "lightgrey" : ""}}>
                    <NavLink
                      to="/busdetails"
                      style={{
                        color: "black",
                        textDecoration: "None",
                        background: activeid ===23 ? "lightgrey" : "",
                      }}
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={changeactiveid.bind(this, 23)}
                      >
                        <ListItemIcon>
                        <LabelImportant />
                        </ListItemIcon>
                        <ListItemText primary=" Bus Details " />
                      </ListItemButton>
                    </NavLink>
                  </List>

                  
      <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===14?"lightgrey":""}}>
          <NavLink to="/breakdownfactor" style={{color:"black",textDecoration:"None",background:activeid===14?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,14)}>
            <ListItemIcon>
            <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Reliability " />
          </ListItemButton>
          </NavLink>
            </List>

            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===16?"lightgrey":""}}>
          <NavLink to="/busavailablematrics" style={{color:"black",textDecoration:"None",background:activeid===16?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,16)}>
            <ListItemIcon>
                <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Operational Availability " />
          </ListItemButton>
          </NavLink>
            </List>

            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===15?"lightgrey":""}}>
          <NavLink to="/schedulematrics" style={{color:"black",textDecoration:"None",background:activeid===15?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,15)}>
            <ListItemIcon>
               <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Bus Schedule Metrics " />
          </ListItemButton>
          </NavLink>
            </List>

            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===19?"lightgrey":""}}>
          <NavLink to="/frequency" style={{color:"black",textDecoration:"None",background:activeid===19?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,19)}>
            <ListItemIcon>
              <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Frequency " />
          </ListItemButton>
          </NavLink>
            </List>

            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===20?"lightgrey":""}}>
          <NavLink to="/safetyoperation" style={{color:"black",textDecoration:"None",background:activeid===20?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,20)}>
            <ListItemIcon>
               <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Safety of Operation " />
          </ListItemButton>
          </NavLink>
            </List>
    
            
      {/* <List component="div" disablePadding>
          <NavLink to="/performancematrics" style={{color:"black",textDecoration:"None",background:activeid===2?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,10)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Performance Metrics " />
          </ListItemButton>
          </NavLink>
            </List> */}
            <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===17?"lightgrey":""}}>
          <NavLink to="/dmapproval" style={{color:"black",textDecoration:"None",background:activeid===17?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,17)}>
            <ListItemIcon>
            <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Approval " />
          </ListItemButton>
          </NavLink>
            </List>
            {/* <List component="div" disablePadding>
          <NavLink to="/spapproval" style={{color:"black",textDecoration:"None",background:activeid===2?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,11)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Service Provider Approval" />
          </ListItemButton>
          </NavLink>
            </List> */}
             <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===18?"lightgrey":""}}>
          <NavLink to="/customercomplaint" style={{color:"black",textDecoration:"None",background:activeid===18?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,18)}>
            <ListItemIcon>
            <LabelImportant />
            </ListItemIcon>
            <ListItemText primary=" Customer Complaint " />
          </ListItemButton>
          </NavLink>
            </List>
           
            </Collapse>
            <Divider/>
            <ListItemButton onClick={handleReportClick}>
        <ListItemIcon>
          <MenuBook />
        </ListItemIcon>
        <ListItemText primary=" Report " />
        {openReport ? <ChevronRight /> : <ChevronLeft />}
      </ListItemButton>
      <Collapse in={openReport} timeout="auto" unmountOnExit>
      <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===24?"lightgrey":""}}>
          <NavLink to="/monthlyreport" style={{color:"black",textDecoration:"None",background:activeid===24?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,24)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Monthly Report " />
          </ListItemButton>
          </NavLink>
            </List>
       <List component="div" disablePadding style={{color:"black",textDecoration:"None",background:activeid===25?"lightgrey":""}}>
          <NavLink to="/parameterreport" style={{color:"black",textDecoration:"None",background:activeid===25?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,25)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Parameter-Wise Report " />
          </ListItemButton>
          </NavLink>
            </List>
            {/*
            <List component="div" disablePadding>
          <NavLink to="/halfyearlyreport" style={{color:"black",textDecoration:"None",background:activeid===2?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,5)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary=" Half Yearly Report " />
          </ListItemButton>
          </NavLink>
            </List>
            <List component="div" disablePadding>
          <NavLink to="/instancereport" style={{color:"black",textDecoration:"None",background:activeid===2?"lightgrey":""}} >
          <ListItemButton sx={{ pl: 4 }} onClick={changeactiveid.bind(this,5)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Instance Report" />
          </ListItemButton>
          </NavLink>
            </List> */}
   </Collapse>
            </List>
            <div
                style={{
                  backgroundColor: "#68b3c4",
                  position: "fixed",
                  bottom: "0px",
                  width: "inherit",
                  borderTop: "1px solid green",
                  boxShadow: "grey 0px -2px 4px 0px",
                  minHeight: "150px",
                }}
              >
                <div style={{ marginLeft: "20px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ptocheckbox}
                        onChange={handleptocheck}
                      />
                    }
                    label="Check for PTO"
                  />
                </div>

                <div>
                  {
                    ptocheckbox?
                    <TextField
                    id="standard-basic"
                    select
                    label="Select PTO"
                    variant="standard"
                    name="pto"
                    value={pto}
                    onChange={handleptoChange}
                    // onChange={(e)=>setSlafor(e.target.value)}
                    required
                    sx={{ width: "20ch", margin: "20px" }}
                  >
                    {
                     ptodetails.map((data)=>(
                      <MenuItem key={data.ptoid} value={data.ptoid}>
                      {data.ptostname}:{data.ptoid}
                    </MenuItem>
                     ))
                  }
                   
                   
                  </TextField>
                  :""
                  }
                 
                </div>
              </div>
          </Drawer>
          <Main open={sidebar}  
          sx={{ flexGrow: 1, padding: "20px", 
          transition: "margin-left 0.3s ease-in-out" }}>
            <DrawerHeader />
         
            <Routes>
            <Route path="/" exact element={<HomePage />} />
               <Route path="home" exact element={<HomePage />} />
               <Route path="slamaster" exact element={<Slamaster />} />
               <Route path="slatypemaster" exact element={<Slatypemaster />} />
              <Route path="qualitystandardmaster" exact element={<QualityStandardmaster />} />
               <Route path="slaformaster" exact element={<Slaformaster />} />
               <Route path="agencymaster" exact element={<AgencyMaster />} />
               <Route path="actionmaster" exact element={<ActionMaster />} />
               <Route path="genericpenaltymaster" exact element={<GenericPenaltyMaster />} />
               <Route path="penaltymaster" exact element={<PenaltyMaster />} />
               <Route path="incentivemaster" exact element={<IncentiveMaster />} />
               <Route path="warningmaster" exact element={<WarningMaster />} />
               <Route path="outcomemaster" exact element={<OutcomeMaster />} />
               <Route path="reasonmaster" exact element={<ReasonMaster />} />
               <Route path="qcmaster" exact element={<QualityCheckMaster />} />
               <Route path="schedulematrics" exact element={<BusScheduleMatrics pto={pto}/>} />
               <Route path="breakdownfactor" exact element = {<BreakdownFactor/>} />
               <Route path="frequency" exact element = {<Frequency/>} />
               <Route path="safetyoperation" exact element = {<SafetyOperation/>} />
               <Route path="dmapproval" exact element = {<Dmapproval/>} />
               {/* <Route path="spapproval" exact element = {<ServiceProvider/>} /> */}
                <Route path="customercomplaint" exact element = {<CustomerComplaint/>} />
                <Route path="monthlyreport" exact element = {<MonthlyReport/>} />
                <Route path="parameterreport" exact element = {<ParameterReport/>} />
                {/* <Route path="halfyearlyreport" exact element = {<HalfYearlyReport/>} /> */}
                {/* <Route path="instancereport" exact element = {<InstanceReport/>} /> */}
                <Route path="busavailablematrics" exact element={<Busavailablematrics pto={pto}/>} />
                <Route path="busdetails" exact element={<Busdetails pto={pto} /> } />
                <Route path="formulas" exact element={<Formula pto={pto} /> } />
            </Routes>
            </Main>
            </Box>  
            </BrowserRouter>
          
        

        )

    }

