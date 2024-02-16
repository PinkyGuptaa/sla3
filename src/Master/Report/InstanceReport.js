
import { Print, Search } from '@mui/icons-material';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import './report.css'
import { useReactToPrint } from 'react-to-print';
import Instancemaster_service from '../../Services/Instancemaster_service';


function HalfYearlyReport(props) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedSLAFor, setSelectedSLAFor] = useState('');
    const [reportDetails, setReportDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const componentRef = useRef();
    const [instancedetails,setinstancedetails] = useState([]);
    const [instancename,setinstancename] = useState('');
    const [showPDF, setShowPDF] = useState(false);



    useEffect(()=>{
      Instancemaster_service.getAll().then((res)=>{
        setinstancedetails(res.data);
        console.log(res.data)
        
      }).catch(err=>console.log(err))
    },[])
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });


  const slaTypes = ['bus', 'conductor', 'driver'];

  const handleGenerateReport = async () => {
    setLoading(true); // Set loading to true when fetching data

    try {
      if (instancename && selectedSLAFor) {
        // const selectedQuarter = quarters.find((quarter) => quarter.label === selectedMonth);
        // const startDate = selectedQuarter.range[0];
        // const endDate = selectedQuarter.range[1];
   
        const apiUrl = `http://10.226.33.132:9100/busperformance/getallinstancewise/${instancename}/${selectedSLAFor}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          // Other necessary configurations like headers, etc.
        });
console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setReportDetails(data);
      } else {
        setError('Please select both month and SLA');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };
  // const handlePrint = () => {
  //   window.print();
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:"40px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Generate Report
      </Typography>
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        {/* <Select style={{ width: '200px' }} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} label="Select Quarter">
          {quarters.map((quarter, index) => (
            <MenuItem key={index} value={quarter.label}>
              {quarter.label}
            </MenuItem>
          ))}
        </Select> */}
 <TextField id="standard-basic" label="Select Instance" 
      variant="outlined" name='instance' value={instancename} 
      select
      fullWidth
      onChange={(e)=>setinstancename(e.target.value)} required 
      >
        {instancedetails.map((option) => (
            <MenuItem key={option.instancename} value={option.instancename}>
              {option.instancename}
            </MenuItem>
          ))}
        </TextField>    


        <Select style={{ width: '250px' , marginLeft:'50px'}} value={selectedSLAFor} onChange={(e) => setSelectedSLAFor(e.target.value)} label="Select SLA For">
          {slaTypes.map((slaType, index) => (
            <MenuItem key={index} value={slaType}>
              {slaType}
            </MenuItem>
          ))}
        </Select>

        <Search style={{marginLeft:'30px'}} variant="contained" onClick={handleGenerateReport}>
          Generate Report
        </Search>
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}
        
      </Box>
      <div ref={componentRef}>
        
      {reportDetails.length > 0 ? (
        <table   className="report-table">
          <thead>
            <tr>
            <th>SL No</th>
                <th>SLA</th>
                <th>Agency</th>
                <th>Remarks</th>
                <th>SLA Type</th>
                <th>Details</th>
                <th>Penalty</th>
                <th>Penalty Detail</th>
                <th>Quality Type</th>
                <th>Complaint</th>
            </tr>
          </thead>
          <tbody>
            {reportDetails.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                 <td>{item.slaMaster ? item.slaMaster.sla : 'N/A'}</td>
                  <td>{item.slaMaster && item.slaMaster.agencyMaster ? item.slaMaster.agencyMaster.agencyname : 'N/A'}</td>
                  <td>{item.slaMaster ? item.slaMaster.remarks : 'N/A'}</td>
                  <td>{item.slaMaster && item.slaMaster.slaTypeMaster ? item.slaMaster.slaTypeMaster.slatype : 'N/A'}</td>
                  <td>{item.slaMaster ? item.slaMaster.details : 'N/A'}</td>
                  <td>{item.penalty || 'N/A'}</td>
                  <td>{item.penaltydetail || 'N/A'}</td>
                  <td>{item.qualityStandardMaster ? item.qualityStandardMaster.qualitytype : 'N/A'}</td>
                  <td>{item.customerComplaint ? item.customerComplaint.complaint : 'N/A'}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
          ) : (
            <Typography variant="body1" align="center" style={{ marginTop: '50px' }}>
              {loading ? 'Loading...' : error ? `Error: ${error}` : 'No data available'}
            </Typography>
      )}
</div>


{instancename && selectedSLAFor && (
      <Print variant="contained" onClick={() => {
        handlePrint();
        setShowPDF(true);
      }} style={{ marginLeft: '10px' ,marginTop: '30px'}}>
               Print 
        </Print>
    )}
    </div>
  );
}
export default HalfYearlyReport;
