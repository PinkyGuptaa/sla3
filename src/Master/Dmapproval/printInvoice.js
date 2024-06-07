// import React, { useEffect } from 'react';
// import { Button } from '@mui/material';

// const PrintInvoice = ({ remarks, approvalid, busmasterdetails, rejectDetails, image, rowData, closeModal }) => {
//   useEffect(() => {
//     const handlePrint = () => {
//       window.print();
//       closeModal(); // Close the modal after print action
//     };

//     handlePrint();
//   }, [closeModal]);

//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}.${month}.${year}`;
//   };

//   const currentDate = formatDate(new Date());

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
//         <img
//           src={image}
//           alt="CDAC Logo"
//           style={{ float: 'left', marginRight: '10px', width: '100px', height: 'auto' }}
//         />
//         <div style={{ textAlign: 'right' }}>
//           <div>केंद्रीय संगणक विकास केंद्र</div>
//           <div>CENTRE FOR DEVELOPMENT OF ADVANCED COMPUTING</div>
//           <div>
//             A Scientific Society of the Ministry of Electronics and Information
//             Technology, Govt. of India
//           </div>
//         </div>
//         <div style={{ clear: 'both' }}></div>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <div style={{ fontWeight: 'bold' }}>No.: 4(65)/2018-19/Inv./Fin.</div>
//         <div>Date: {currentDate}</div>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <div>To,</div>
//         <div>The Managing Director,</div>
//         <div>Rajcomp Info Services Limited</div>
//         <div>C-Block, 1st Floor, Yojana Bhawan,</div>
//         <div>Tilak Marg, C-Scheme, Jaipur-302005.</div>
//       </div>
//       <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
//         Sub: Invoice No. CDAC/2018-19/087, 088 & 089 Dated {currentDate}
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         Dear Sir,
//         <br />
//         Please find enclosed the following Invoices:-
//       </div>
//       <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '5px' }}>S. No.</th>
//             <th style={{ border: '1px solid black', padding: '5px' }}>Date</th>
//             <th style={{ border: '1px solid black', padding: '5px' }}>Invoice No.</th>
//             <th style={{ border: '1px solid black', padding: '5px' }}>Particular</th>
//             <th style={{ border: '1px solid black', padding: '5px' }}>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>1</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>{currentDate}</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>CDAC/2018-19/087</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>
//               FMS (2<sup>nd</sup> to 5<sup>th</sup> Yrs) Phase-II at Sardar Patel Med. Bikaner for the period of 01.03.18 to 30.04.18
//             </td>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>55146</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>2</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>{currentDate}</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>CDAC/2018-19/088</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>
//               FMS (2<sup>nd</sup> to 5<sup>th</sup> Yrs) Phase-II at JLN Med. Coll. Ajmer for the period of 01.03.18 to 30.04.18
//             </td>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>94400</td>
//           </tr>
//           <tr>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>3</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>{currentDate}</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>CDAC/2018-19/089</td>
//             <td style={{ border: '1px solid black', padding: '5px' }}>
//               FMS (2<sup>nd</sup> to 5<sup>th</sup> Yrs) Phase-II at SMS Med. Coll. Jaipur period of 01.03.18 to 30.04.18
//             </td>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>289683</td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="4" style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>TOTAL:</td>
//             <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right' }}>4,39,229</td>
//           </tr>
//         </tfoot>
//       </table>
//       <div style={{ marginTop: '20px' }}>
//         We request you to please pay by Cheque / Demand Draft or RTG's transfer of Rs.
//       </div>
//     </div>
//   );
// };

// export default PrintInvoice;
