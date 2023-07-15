import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculate the width and height based on the container size
  const width = 800;
  const height = 400;

  // Calculate the maximum and minimum values in the data
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  // Custom data sampling function
  const sampleData = (data, sampleSize) => {
    const step = Math.max(1, Math.floor(data.length / sampleSize));
    return data.filter((_, index) => index % step === 0);
  };

  // Use the custom sampleData function to sample the data for smoothness
  const sampledData = sampleData(data, 10); // Adjust the sampleSize as needed

  // Calculate the x and y scales
  const xScale = (index) => (width / (sampledData.length - 1)) * index;
  const yScale = (value) =>
    ((height - 20) * (value - minValue)) / (maxValue - minValue);

  // Generate the path string for the line
  const linePath = sampledData
    .map((value, index) => `${xScale(index)},${yScale(value)}`)
    .join(" L ");

  return (
    <svg width={width} height={height}>
      <g transform="translate(0, 20)">
        <path
          d={`M ${linePath}`}
          fill="none"
          stroke={isDashboard ? colors.grey[100] : colors.primary[400]}
        />
      </g>
    </svg>
  );
};

export default LineChart;