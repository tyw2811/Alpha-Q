import * as React from 'react';
import { useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  Collapse,
  Alert,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../../providers/auth-session.provider";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';


export default function LoginDialog({ open, handleCloseDialog }) {
  const navigate = useNavigate();
  const { handleSignin } = useAuthSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateInput, setValidateInput] = useState("");

  // Enables responsive dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseReset = () => {
    setEmail("");
    setPassword("");
    setValidateInput("");
    handleCloseDialog();
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await handleSignin({
        email: data.get("email"),
        password: data.get("password"),
      });
      handleCloseReset();
      navigate("/forum");
    } catch (error) {
      console.error(error);
      setValidateInput(error.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullScreen={fullScreen}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="h3"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Food Share
          </DialogContentText>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="dense"
            autoFocus
            fullWidth
            required
            defaultValue={email}
            onChange={handleEmailChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="dense"
            fullWidth
            required
            defaultValue={password}
            onChange={handlePasswordChange}
          />
          <Collapse in={!!validateInput}>
            <Alert severity="error">{validateInput}</Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" disabled={loading}>
            Login
          </Button>
          <Button onClick={handleCloseReset}>Cancel</Button>
        </DialogActions>
        {loading ? (
          <LinearProgress />
        ) : (
          <LinearProgress variant="determinate" value={100} />
        )}
      </Box>
    </Dialog>
  );
}