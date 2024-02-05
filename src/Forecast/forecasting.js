// import React from 'react'
// import Plot from 'react-plotly.js';
// const forecasting = () => {
//   return (
//     <div>
//     <h1 style={{ textAlign: 'center' }}>Forecasting</h1>
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <Plot
//         data={[
//           {
//             x: [1, 2, 3],
//             y: [2, 6, 3],
//             type: 'scatter',
//             mode: 'lines+markers',
//             marker: { color: 'red' },
//           },
//           { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
//         ]}
//         layout={{ width: 600, height: 400, title: 'Graph' }}
//       />
//     </div>
//   </div>
// );
// };

// export default forecasting
// import React, { useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-dist';
// import { csv } from 'd3';

// // import * as d3 from 'd3';

// const Forecasting = () => {
//   useEffect(() => {
//     const rawDataURL = 'https://raw.githubusercontent.com/plotly/datasets/master/2016-weather-data-seattle.csv';
//     const xField = 'Date';
//     const yField = 'Mean_TemperatureC';

//     const selectorOptions = {
//       buttons: [
//         {
//           step: 'month',
//           stepmode: 'backward',
//           count: 1,
//           label: '1m',
//         },
//         {
//           step: 'month',
//           stepmode: 'backward',
//           count: 6,
//           label: '6m',
//         },
//         {
//           step: 'year',
//           stepmode: 'todate',
//           count: 1,
//           label: 'YTD',
//         },
//         {
//           step: 'year',
//           stepmode: 'backward',
//           count: 1,
//           label: '1y',
//         },
//         {
//           step: 'all',
//         },
//       ],
//     };

//     // d3.csv(rawDataURL, function (err, rawData) {
//       csv(rawDataURL)
//     .then(function (rawData) {
//       const data = prepData(rawData);
//       const layout = {
//         title: 'Time series with range slider and selectors',
//         xaxis: {
//           rangeselector: selectorOptions,
//           rangeslider: {},
//         },
//         yaxis: {
//           fixedrange: true,
//         },
//       };

//       Plotly.newPlot('myDiv', data, layout);
//     })
//     .catch(function (error) {
//       console.error('Error fetching or processing CSV:', error);
//     });

//     function prepData(rawData) {
//       const x = [];
//       const y = [];

//       rawData.forEach(function (datum, i) {
//         x.push(new Date(datum[xField]));
//         y.push(datum[yField]);
//       });

//       return [
//         {
//           mode: 'lines',
//           x: x,
//           y: y,
//         },
//       ];
//     }
//   }, []);

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Forecasting</h1>
//       <div id="myDiv" style={{ width: '100%', height: '400px' }}></div>
//     </div>
//   );
// };

// export default Forecasting;
// import React, { useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-dist';
// import { csv } from 'd3';

// const Forecasting = () => {
//   useEffect(() => {
//     const dataURL = 'http://10.226.42.237:8000/df-data';
//     const xField = 'Date';
//     const yField = 'VALUE';

//     const selectorOptions = {
//       buttons: [
//         {
//           step: 'month',
//           stepmode: 'backward',
//           count: 1,
//           label: '1m',
//         },
//         {
//           step: 'month',
//           stepmode: 'backward',
//           count: 6,
//           label: '6m',
//         },
//         {
//           step: 'year',
//           stepmode: 'todate',
//           count: 1,
//           label: 'YTD',
//         },
//         {
//           step: 'year',
//           stepmode: 'backward',
//           count: 1,
//           label: '1y',
//         },
//         {
//           step: 'all',
//         },
//       ],
//     };

//     fetch(dataURL)
//       .then(response => response.json())
//       .then(rawData => {
//         const data = prepData(rawData);
//         const layout = {
//           title: 'Time series with range slider and selectors',
//           xaxis: {
//             rangeselector: selectorOptions,
//             rangeslider: {},
//           },
//           yaxis: {
//             fixedrange: true,
//           },
//         };

//         Plotly.newPlot('myDiv', data, layout);
//       })
//       .catch(error => {
//         console.error('Error fetching or processing data:', error);
//       });

//     function prepData(rawData) {
//       const x = Object.keys(rawData);
//       const y = Object.values(rawData).map(entry => entry.VALUE);

//       return [
//         {
//           mode: 'lines',
//           x: x,
//           y: y,
//         },
//       ];
//     }
//   }, []);

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Forecasting</h1>
//       <div id="myDiv" style={{ width: '100%', height: '400px' }}></div>    
//     </div>
//   );
// };
// export default Forecasting;

// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-dist';
// import { csv } from 'd3';

// const Forecasting = () => {
//   const [dfData, setDfData] = useState([]);
//   const [forecastData, setForecastData] = useState([]);
//   const selectorOptions = {
//     buttons: [
//       {
//         step: 'month',
//         stepmode: 'backward',
//         count: 1,
//         label: '1m',
//       },
//       {
//         step: 'month',
//         stepmode: 'backward',
//         count: 6,
//         label: '6m',
//       },
//       {
//         step: 'year',
//         stepmode: 'todate',
//         count: 1,
//         label: 'YTD',
//       },
//       {
//         step: 'year',
//         stepmode: 'backward',
//         count: 1,
//         label: '1y',
//       },
//       {
//         step: 'all',
//       },
//     ],
//   };
//   useEffect(() => {
//     const dfDataURL = 'http://10.226.42.237:8000/df-data';
//     const forecastDataURL = 'http://10.226.42.237:8000/forecast-data';
//     const xField = 'Date';
//     const yField = 'VALUE';

    

//     fetch(dfDataURL)
//       .then(response => response.json())
//       .then(rawData => {
//         const data = prepData(rawData);
//         setDfData(data);

//         fetch(forecastDataURL)
//           .then(response => response.json())
//           .then(forecastRawData => {
//             const forecastData = prepData(forecastRawData);
//             setForecastData(forecastData);
//           })
//           .catch(error => {
//             console.error('Error fetching or processing forecast data:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error fetching or processing df-data:', error);
//       });

//     function prepData(rawData) {
//       const x = Object.keys(rawData);
//       const y = Object.values(rawData).map(entry => entry[yField]);

//       return [
//         {
//           mode: 'lines',
//           x: x,
//           y: y,
//         },
//       ];
//     }
//   }, []);

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Forecasting</h1>
//       <div id="myDiv" style={{ width: '100%', height: '400px' }}>
//         <Plot
//           data={[...dfData, ...forecastData]} // Combining both dfData and forecastData
//           layout={{
//             title: 'Time series with range slider and selectors',
//             xaxis: {
//               rangeselector: selectorOptions,
//               rangeslider: {},
//             },
//             yaxis: {
//               fixedrange: true,
//             },
//           }}
//           config={{ displayModeBar: false }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Forecasting;

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-dist';
import { csv } from 'd3';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import GraphComponent from './graph';

const Forecasting = () => {
  const [dfData, setDfData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const selectorOptions = {
    buttons: [
      {
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m',
      },
      {
        step: 'month',
        stepmode: 'backward',
        count: 6,
        label: '6m',
      },
      {
        step: 'year',
        stepmode: 'todate',
        count: 1,
        label: 'YTD',
      },
      {
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y',
      },
      {
        step: 'all',
      },
    ],
  };
  useEffect(() => {
    const dfDataURL = 'http://10.226.41.40:5000/df-data';
    const forecastDataURL = 'http://10.226.41.40:5000/forecast';
    const xField = 'Date';
    const yField = 'VALUE';

    fetch(dfDataURL)
      .then(response => response.json())
      .then(rawData => {
        const data = prepData(rawData);
        setDfData(data);

        fetch(forecastDataURL)
          .then(response => response.json())
          .then(forecastRawData => {
            const forecastData = prepData(forecastRawData);
            setForecastData(forecastData);
          })
          .catch(error => {
            console.error('Error fetching or processing forecast data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching or processing df-data:', error);
      });

    function prepData(rawData) {
      let x, y;

      if (Array.isArray(rawData.date) && Array.isArray(rawData.value)) {
        // Handle the second API response structure
        x = rawData.date;
        y = rawData.value;
      } else {
        // Handle the first API response structure
        x = Object.keys(rawData);
        y = Object.values(rawData).map(entry => entry.VALUE);
      }

      return [
        {
          mode: 'lines',
          x: x,
          y: y,
        },
      ];
    }
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Trend Analysis</h1>
      <div id="myDiv">
        <Row className="mt-5">         
        <Plot
          data={[...dfData, ...forecastData]} //combining both dfData and forecastData
          layout={{
            title: 'Gasoline DataTime series with range slider and selectors',
            xaxis: {
              rangeselector: selectorOptions,
              rangeslider: {},
            },
            yaxis: {
              fixedrange: true,
            },
            width: 1400
          }}
          config={{ displayModeBar: false }}
        />
        </Row>

        {/* <Plot
          data={[...dfData, ...forecastData]} //combining both dfData and forecastData
          layout={{
            title: 'Gasoline DataTime series with range slider and selectors',
            xaxis: {
              rangeselector: selectorOptions,
              rangeslider: {},
            },
            yaxis: {
              fixedrange: true,
            },
            width: '100%'
          }}
          config={{ displayModeBar: false }}
        /> */}
        {/* <GraphComponent/> */}
      </div>
    </div>
  );
};
export default Forecasting;