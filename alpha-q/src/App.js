import './App.css';
import Router from './Router';
import { BrowserRouter } from "react-router-dom";
import AppBar from './Pages/AppBar/AppBar';
import MainFrame from './Pages/AppBar/MainFrame';
import { Box, CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }} bgcolor="background.paper">
        <CssBaseline />
        <AppBar/>
        <MainFrame>
          <Router />
        </MainFrame>
      </Box>
    </BrowserRouter>
  );
}

export default App;
