import React from 'react';
import Chart from 'react-google-charts';

const LikelihoodChart = ({ data }) => {
  const chartData = [['Data Point', 'Likelihood']];
  data.forEach((likelihood, index) => {
    chartData.push([index, likelihood]);
  });

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: 'Likelihood Data',
        hAxis: { title: 'Data Point' },
        vAxis: { title: 'Likelihood' },
        curveType: 'function', // Display a smooth curve
      }}
    />
  );
};

export default LikelihoodChart;