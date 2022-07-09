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
  Stack,
  Alert,
  LinearProgress,
} from "@mui/material";
import { useAuthSession } from "../../providers/auth-session.provider";
import Select from '../Map/Select'


export default function PostDialog({ open, handleCloseDialog }) {
  const { handleSignin, postToForum } = useAuthSession();
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
      await postToForum({
        title: data.get("title"),
        body: data.get("body"),
        area: location,
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
            Create Post
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
          <Stack marginTop={1}>
            <Select location = {location} handleChange = {handleChange}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" disabled={loading}>
            Post
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