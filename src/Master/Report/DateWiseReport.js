
import { Print, Search } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import './report.css'
import { useReactToPrint } from 'react-to-print';

function DateWiseReport(props) {


    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedSLAFor, setSelectedSLAFor] = useState('');
    const [reportDetails, setReportDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const componentRef = useRef();
    const [showPDF, setShowPDF] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const quarters = [
        { label: 'January - June', months: ['01-01', '02-01', '03-01', '04-01', '05-01', '06-01'], range: ['2023-01-01', '2023-06-30'] },
        { label: 'July - December', months: ['07-01', '08-01', '09-01', '10-01', '11-01', '12-01'], range: ['2023-07-01', '2023-12-31'] },
      ];
      


  const slaTypes = ['bus', 'conductor', 'driver'];

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      if (selectedDate && selectedSLAFor) {
        const apiUrl = `http://10.226.33.132:9100/busperformance/getalldate/${selectedDate}/${selectedSLAFor}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
         
        });
  console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setReportDetails(data);
      } else {
        setError('Please select both date and SLA');
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

        <input type='date'  style={{outlineColor:"blue",borderColor:"lightgrey",height:"53px",width:"150px",borderRadius:"5px",paddingRight:"10px"}}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        />

           <FormControl sx={{ m: 4, minWidth: 120 }} size="large">
      <InputLabel id="demo-select-small-label">SLA For</InputLabel>      
        <Select   labelId="demo-select-small-label"
        id="demo-select-small" style={{ color:"black"}} value={selectedSLAFor} onChange={(e) => setSelectedSLAFor(e.target.value)} label="SLA For">
          {slaTypes.map((slaType, index) => (
            <MenuItem key={index} value={slaType}>
              {slaType}
            </MenuItem>
          ))}
        </Select>
        </FormControl>

      

        <Search style={{marginLeft:'30px'}} variant="contained" onClick={handleGenerateReport}>
          Generate Report
        </Search>
        {loading && <p>Loading...</p>}

        {/* {error && <p>Error: {error}</p>} */}
        
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


{selectedDate && selectedSLAFor && (
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
export default DateWiseReport;
