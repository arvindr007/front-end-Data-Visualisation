import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Topbar = ({ toggleDarkMode }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <AppBar sx={{ background: theme.palette.primary.main }}>
          <Toolbar>
            <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
            {isMatch ? (
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Shoppee
              </Typography>
            ) : (
              <>
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  indicatorColor="secondary"
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                >
                  <Tab label="Products" />
                  <Tab label="Services" />
                  <Tab label="About Us" />
                  <Tab label="Contact" />
                </Tabs>
                <Button sx={{ marginLeft: "auto" }} variant="contained">
                  Login
                </Button>
                <Button sx={{ marginLeft: "10px" }} variant="contained">
                  SignUp
                </Button>
                <Brightness4RoundedIcon
                className="mode-toggle"
                  sx={{ marginLeft: "10px" }}
                  onClick={toggleDarkMode}
                />
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Topbar;