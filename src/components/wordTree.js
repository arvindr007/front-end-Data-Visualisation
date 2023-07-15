import React from 'react';
import Chart from 'react-google-charts';

const TopicsChart = ({ data }) => {
  // Count the occurrences of each topic
  const topicCounts = {};
  data.forEach((topic) => {
    if (topicCounts.hasOwnProperty(topic)) {
      topicCounts[topic]++;
    } else {
      topicCounts[topic] = 1;
    }
  });

  // Convert the topicCounts object to an array of arrays
  const chartData = Object.entries(topicCounts);

  // Add column headers to the chart data
  const chartDataWithHeaders = [['Topic', 'Frequency'], ...chartData];

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={chartDataWithHeaders}
      options={{
        title: 'Topic Frequencies',
        hAxis: {title: 'Frequency'},
        vAxis: {  title: 'Topic' },
      }}
    />
  );
};

export default TopicsChart;