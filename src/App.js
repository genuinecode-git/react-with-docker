import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Button } from "@mui/material";
import CharacterGrid from "./components/CharacterGrid";
import CharacterDetail from "./components/CharacterDetail";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const App = () => {
  // State for theme mode (light or dark)
  const [mode, setMode] = useState("light");

  // Load the theme preference from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Toggle theme mode and save it in localStorage
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // Create a Material-UI theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/react-with-docker">
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}
          startIcon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        >
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
        <Routes>
          <Route path="/" element={<CharacterGrid />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
