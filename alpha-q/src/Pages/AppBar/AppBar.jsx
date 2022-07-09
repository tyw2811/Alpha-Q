import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../../auth-session.provider";
import LoginDialog from "../Login/Login";



export default function AppBar() {
  const navigate = useNavigate();
  const { isAuth, handleSignout } = useAuthSession();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const goToHome = () => {
    navigate("/")
  }

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    handleSignout();
    navigate("/");
  }

  return (
    <MuiAppBar
      position="fixed"
      color="background"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Button variant="contained" onClick={goToHome}>
          <Typography>
            Alpha Q
          </Typography>
        </Button>
          <Box sx={{ flex: 1 }} />
        <Stack direction="row" spacing={1} display="flex" flex="1" justifyContent="right" alignItems="center">
          {isAuth() ? 
            (<Button variant="contained" onClick={handleLogout}>
              <Typography>
                Logout
              </Typography>
            </Button>)
            : 
            (<>
              <LoginDialog open = {openDialog} handleCloseDialog = {handleCloseDialog}/>
              <Button variant="contained" onClick={handleOpenDialog}>
                <Typography>
                  Login
                </Typography>
              </Button>
              <Button variant="contained" onClick={goToSignup}>
                <Typography>
                  Sign Up
                </Typography>
              </Button>
            </>)
          }
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
}
