import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import AppTitle from "./AppTitle";
import MenuIcon from "@mui/icons-material/Menu";


export default function AppBar() {
  return (
    <MuiAppBar
      position="fixed"
      color="background"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton color="primary" edge="start">
          <MenuIcon />
        </IconButton>
        <AppTitle/>
        <Box sx={{ flex: 1 }} />
      </Toolbar>
    </MuiAppBar>
  );
}
