import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
// import Grid from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
// import LineChart from "../components/lineChart";
import IntensityChart from "../components/intensityCHart";
import { Chart } from "react-google-charts";
import LikelihoodChart from "../components/likelihoodChart";
import YearDataChart from "../components/timeStampChart";
import TopicsChart from "../components/wordTree";
import "./analytics.css";

const Analytics = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/dashboard");
        const data = await response.json();
        setMyData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Render loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }
  // Extracting the  values from myData
  const intensityData = myData.map((dataEntry) => dataEntry.intensity);
  const likelihoodData = myData.map((data) => data.likelihood);
  const relevanceData = myData.map((data) => data.relevance);
  const yearData = myData.map((data) => data.published);
  const countryData = myData.map((data) => data.country);
  const topicsData = myData.map((data) => data.topic);
  const regionData = myData.map((data) => data.region);
  const cityData = myData.map((data) => data.likelihood);

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
  };

  const renderChartComponent = () => {
    switch (selectedFilter) {
      case "End Year Filter":
        return null; // Render no chart component for this filter
      case "Topics Filters":
        return null;
      case "Sector Filter":
        return null;
      case "Region Filter":
        return null; // Render no chart component for this filter
      case "PEST Filter":
        return null; // Render no chart component for this filter
      case "Source Filter":
        return null; // Render no chart component for this filter
      case "SWOT Filter":
        return null; // Render no chart component for this filter
      case "Country Filter":
        return null; // Render no chart component for this filter
      case "City Filter":
        return null; // Render no chart component for this filter
      default:
        return null; // Render no chart component for unknown filters
    }
  };

  // geo data [No latitude data]
  const regData = [["Country", "Latitude"]];
  for (let i = 0; i < regionData.length; i++) {
    if (regionData[i] !== "World" && regionData[i] !== "") {
      regData.push([regionData[i], null]);
    }
  }

  // This is data sample with the country & latitude data
  // const data = [
  //   ["Country", "Latitude"],
  //   ["Algeria", 36],
  //   ["Angola", -8],
  //   ["Benin", 6],
  //   ["Botswana", -24],
  //   ["Burkina Faso", 12],
  //   ["Burundi", -3],
  //   ["Cameroon", 3],
  //   ["Canary Islands", 28],
  //   ["Cape Verde", 15],
  //   ["Central African Republic", 4],
  //   ["Ceuta", 35],
  //   ["Chad", 12],
  //   ["Comoros", -12],
  //   ["Cote d'Ivoire", 6],
  //   ["Democratic Republic of the Congo", -3],
  //   ["Djibouti", 12],
  //   ["Egypt", 26],
  //   ["Equatorial Guinea", 3],
  //   ["Eritrea", 15],
  //   ["Ethiopia", 9],
  //   ["Gabon", 0],
  //   ["Gambia", 13],
  //   ["Ghana", 5],
  //   ["Guinea", 10],
  //   ["Guinea-Bissau", 12],
  //   ["Kenya", -1],
  //   ["Lesotho", -29],
  //   ["Liberia", 6],
  //   ["Libya", 32],
  //   ["Madagascar", null],
  //   ["Madeira", 33],
  //   ["Malawi", -14],
  //   ["Mali", 12],
  //   ["Mauritania", 18],
  //   ["Mauritius", -20],
  //   ["Mayotte", -13],
  //   ["Melilla", 35],
  //   ["Morocco", 32],
  //   ["Mozambique", -25],
  //   ["Namibia", -22],
  //   ["Niger", 14],
  //   ["Nigeria", 8],
  //   ["Republic of the Congo", -1],
  //   ["Réunion", -21],
  //   ["Rwanda", -2],
  //   ["Saint Helena", -16],
  //   ["São Tomé and Principe", 0],
  //   ["Senegal", 15],
  //   ["Seychelles", -5],
  //   ["Sierra Leone", 8],
  //   ["Somalia", 2],
  //   ["Sudan", 15],
  //   ["South Africa", -30],
  //   ["South Sudan", 5],
  //   ["Swaziland", -26],
  //   ["Tanzania", -6],
  //   ["Togo", 6],
  //   ["Tunisia", 34],
  //   ["Uganda", 1],
  //   ["Western Sahara", 25],
  //   ["Zambia", -15],
  //   ["Zimbabwe", -18],
  // ];

  const options = {
    // region: "002", // Africa
    colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
    backgroundColor: "#81d4fa",
    // datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
  };

  const countryCounts = {};
  countryData.forEach((country) => {
    if (country !== "") {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
  });

  const handleDownloadReport = () => {
    // Convert myData to JSON string
    const jsonData = JSON.stringify(myData);

    // Create a new Blob object with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Generate a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element and set its properties
    const link = document.createElement("a");
    link.href = url;
    link.download = "myData.json";

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up by revoking the URL object
    URL.revokeObjectURL(url);
  };

  // Create an array of arrays with country names and their counts
  const chartData = Object.entries(countryCounts).map(([country, count]) => [
    country,
    count,
  ]);

  // Add a header row to the data array
  const countyData = [["Country", "Count"], ...chartData];

  // relavence data
  // Remove non-numeric values and create an array of arrays with relevance values
  const filteredData = relevanceData
    .filter((value) => typeof value === "number")
    .map((value, index) => [` ${index + 1}`, value]);

  // Add a header row to the data array
  const relevance = [["Item", "Relevance"], ...filteredData];

  return (
    <div className="dashboard">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          style={{ backgroundColor: "yellowgreen" }}
        >
          Filters
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>End Year Filter</MenuItem>
          <MenuItem onClick={() => handleFilterSelection("Topics Filters")}>
            Topics Filters
          </MenuItem>
          <MenuItem>Sector Filter</MenuItem>
          <MenuItem>Region Filter</MenuItem>
          <MenuItem>PEST Filter</MenuItem>
          <MenuItem>Source Filter</MenuItem>
          <MenuItem>SWOT Filter</MenuItem>
          <MenuItem>Country Filter</MenuItem>
          <MenuItem>City Filter</MenuItem>
        </Menu>
      </Box>
      <Box>
        {/* Header */}
        <Box className="header1">
          <h1>Welcome to Dashboard</h1>

          <div className="down-load">
            <Box>
              <Button
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                className="down-load"
                onClick={handleDownloadReport}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download Report
              </Button>
            </Box>
          </div>
        </Box>
        {/* Revenue Generated */}
        <Grid>
          <div className="row-1">
            <Grid className="grid-1">
              <Box>
                <Typography variant="h5" fontWeight="600">
                  IntensityChart
                </Typography>
              </Box>
              <Box>
                <IntensityChart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={intensityData}
                  // options={options}
                />
              </Box>
            </Grid>
            {/* Campaign */}
            <Grid className="grid-2" ml="180px">
              <Box>
                <Typography variant="h5" fontWeight="600" textAlign="center">
                  LikelihoodChart
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                ></Box>
                <LikelihoodChart
                  // chartType="Line"
                  width="100%"
                  height="400px"
                  data={likelihoodData}
                  // options={options}
                />
              </Box>
            </Grid>
          </div>
          <div className="row-2">
            {/* Sales Quantity */}
            <Grid className="grid-3">
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "30px 30px 0 30px" }}
                  textAlign="center"
                >
                  Relevance Chart
                </Typography>
                <Box>
                  <Chart
                    chartType="ColumnChart"
                    data={relevance}
                    width={"100%"}
                    height={"400px"}
                    options={{
                      colors: ["#4285F4"],
                      hAxis: {
                        title: "arvi",
                      },
                      vAxis: {
                        title: "Relevance",
                        minValue: 0,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            {/* Geography Based Traffic */}
            <Grid className="grid-4">
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                  textAlign="center"
                >
                  YearDataChart
                </Typography>
                <Box>
                  {/* <GeographyChart isDashboard={true} /> */}
                  <YearDataChart data={yearData} />
                </Box>
              </Box>
            </Grid>
          </div>
          <div className="row-3">
            <Grid className="grid-5">
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                  textAlign="center"
                >
                  Country
                </Typography>
                <Box>
                  <Chart
                    chartType="PieChart"
                    data={countyData}
                    width={"100%"}
                    height={"400px"}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid className="grid-6">
              <Box>
                <Typography textAlign="center">Topics</Typography>
                <Box>
                  {/* Chart */}
                  <TopicsChart data={topicsData} />
                </Box>
              </Box>
            </Grid>
          </div>
          <div className="row 4">
            <Grid className="grid-7">
              Region
              <Box>
                <Typography textAlign="center">GeoChart</Typography>
                <Box>
                  <Chart
                    chartType="GeoChart"
                    width="100%"
                    height="400px"
                    data={regData}
                    options={options}
                  />
                </Box>
              </Box>
            </Grid>
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default Analytics;
