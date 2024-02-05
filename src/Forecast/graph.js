import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const GraphComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.226.41.40:8000/df-gasoline-data');
      const apiData = response.data;

      const graphData = getGraphData(apiData);
      setData(graphData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getGraphData = (apiData) => {
    const attribute = 'VALUE'; 

    const x = Object.keys(apiData[attribute]);
    const y = Object.values(apiData[attribute]).map(parseFloat);

    const graphData = [
      {
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines+markers',
      },
    ];

    return graphData;
  };

  return (
    <div>
      <Plot data={data} />
    </div>
  );
};

export default GraphComponent;
