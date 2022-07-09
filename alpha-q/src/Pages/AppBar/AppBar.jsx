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

  const goToForum = () => {
    navigate("/forum")
  }

  const goToMap = () => {
    navigate("/map")
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
        <Stack direction="row" spacing={1} display="flex" flex="1" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} display="flex" flex="1" justifyContent="left" alignItems="center">
            <Button variant="contained" onClick={goToHome}>
              <Typography>
                Home
              </Typography>
            </Button>
            {isAuth() ? 
              <>
                <Button variant="contained" onClick={goToForum}>
                  <Typography>
                    Forum
                  </Typography>
                </Button>
                <Button variant="contained" onClick={goToMap}>
                  <Typography>
                    Map
                  </Typography>
                </Button>
                  <Box sx={{ flex: 1 }} /> 
              </>
              : <></>
            }
          </Stack>
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
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
}
