import React from 'react';
import Chart from 'react-google-charts';

const IntensityChart = ({ data }) => {
  // Format the data into an array of arrays
  const chartData = [['Data Point', 'Intensity']]; // Add column headers
  data.forEach((intensity, index) => {
    chartData.push([index, intensity]); // Add each data point as a row
  });

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: 'Intensity Data',
        hAxis: { title: 'Data Point' },
        vAxis: { title: 'Intensity' },
      }}
    />
  );
};

export default IntensityChart;