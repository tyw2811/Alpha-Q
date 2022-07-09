import {
  AppBar as MuiAppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AppTitle from "./AppTitle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";


export default function AppBar() {
  const navigate = useNavigate();
  const gotohome = () => {
    navigate("/")
  }
  const gotologin = () => {
    navigate("/login");
  };
  const gotosignup = () => {
    navigate("/signup");
  };
  return (
    <MuiAppBar
      position="fixed"
      color="background"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Button variant="contained" onClick={gotohome}>
          {"Alpha Q"}
        </Button>
          <Box sx={{ flex: 1 }} />
        <Stack direction="row" spacing={0} display="flex" flex="1" justifyContent="right" alignItems="center">
          <Button variant="contained" onClick={gotologin}>
          {"Login"}
          </Button>
          <Button variant="contained" onClick={gotosignup}>
            {"Sign Up"}
          </Button>
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
}
