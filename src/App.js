import React from "react";
import "./App.css";
import Analytics from "./dashboard/analytics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./global/sidebar";
import Topbar from "./global/topbar";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useMode } from "./global/theme";
import { CssBaseline } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  const sidebarTheme = createTheme(theme);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <div className="App">
        <Router>
          <div className="container">
            <div className="sidebar">
              <ThemeProvider theme={sidebarTheme}>
                <Sidebar />
              </ThemeProvider>
            </div>
            <div className="content">
              <div className="top-bar">
                <Topbar toggleDarkMode={colorMode.toggleColorMode} />
              </div>
              <div className="dashboard">
                <Routes>
                  <Route path="/" element={<Analytics />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;