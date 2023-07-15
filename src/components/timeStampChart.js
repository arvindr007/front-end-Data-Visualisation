import React from 'react';
import Chart from 'react-google-charts';

const YearDataChart = ({ data }) => {
  // Create an object to store the count of occurrences for each month
  const monthCounts = {};

  // Count the occurrences of each month and year
  data.forEach((timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month}-${year}`;

    if (monthCounts.hasOwnProperty(key)) {
      monthCounts[key]++;
    } else {
      monthCounts[key] = 1;
    }
  });

  // Extract unique months and years
  const uniqueMonths = [];
  const uniqueYears = [];

  Object.keys(monthCounts).forEach((key) => {
    const [month, year] = key.split('-');
    if (!uniqueMonths.includes(month)) {
      uniqueMonths.push(month);
    }
    if (!uniqueYears.includes(year)) {
      uniqueYears.push(year);
    }
  });

  // Sort the months and years
  uniqueMonths.sort();
  uniqueYears.sort();

  // Create the chart data array
  const chartData = [['Month', ...uniqueYears]];

  uniqueMonths.forEach((month) => {
    const row = [month];
    uniqueYears.forEach((year) => {
      const key = `${month}-${year}`;
      const count = monthCounts[key] || 0;
      row.push(count);
    });
    chartData.push(row);
  });

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: 'Data by Month and Year',
        hAxis: { title: 'Month' },
        vAxis: { title: 'Year' },
      }}
    />
  );
};

export default YearDataChart;