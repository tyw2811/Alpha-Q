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
import { useAuthSession } from "../../auth-session.provider";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Select from '../Map/Select'


export default function PostDialog({ open, handleCloseDialog }) {
  const { handleSignin } = useAuthSession();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [location, setLocation] = React.useState("Bishan");
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // Enables responsive dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseReset = () => {
    setTitle("");
    setBody("");
    handleCloseDialog();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullScreen={fullScreen}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText
            variant="h3"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Create post
          </DialogContentText>
          <TextField
            id="title"
            name="title"
            label="Title"
            margin="dense"
            autoFocus
            fullWidth
            required
            defaultValue={title}
            onChange={handleTitleChange}
          />
          <TextField
            id="body"
            name="body"
            label="Body"
            margin="dense"
            fullWidth
            required
            defaultValue={body}
            onChange={handleBodyChange}
          />
          <Select location = {location} handleChange = {handleChange}/>
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