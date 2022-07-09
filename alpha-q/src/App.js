import './App.css';
import Router from './Router';
import { BrowserRouter } from "react-router-dom";
import AppBar from './Pages/AppBar/AppBar';
import MainFrame from './Pages/AppBar/MainFrame';
import { Box, CssBaseline } from "@mui/material";
import { AuthSessionProvider } from './providers/auth-session.provider';
import { ForumProvider } from './providers';

function App() {
  return (
    <ForumProvider>
      <AuthSessionProvider>
        <BrowserRouter>
          <Box sx={{ display: "flex" }} bgcolor="green">
            <CssBaseline />
            <AppBar/>
            <MainFrame>
              <Router />
            </MainFrame>
          </Box>
        </BrowserRouter>
      </AuthSessionProvider>
    </ForumProvider>
  );
}

export default App;
