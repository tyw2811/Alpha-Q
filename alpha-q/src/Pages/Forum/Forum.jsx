import * as React from 'react';
import { Stack, Button, Typography, Grid } from  "@mui/material";
import ForumBox from './ForumBox';
import PostDialog from './PostDialog';
import {supabase} from "../../services/supabase.client";
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';

export default function Forum() {

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [posts, setPosts] = React.useState([]);


  React.useEffect(() => {
    async function init() {
      const { data, error } = await supabase
       .from('posts')
       .select();
      if (error) throw error;
      setPosts(data);
    }

    init();
  }, [posts]);

  return (
    <Stack
      width="100%"
      direction = "row"
      justifyContent="center"
      spacing = {4}
    >
      <Stack>
        <PostDialog open = {openDialog} handleCloseDialog = {handleCloseDialog} />
        <Button variant="contained" onClick = {handleOpenDialog}>
          <Typography>Post</Typography>
        </Button>
      </Stack>
      <Stack width = "60%">
        <Stack spacing = {2}>
          {posts.length !== 0 ? posts.map(post => <ForumBox forumPost = {post}/>
          ) : <Typography>There are currently no posts!</Typography>}
        </Stack>
      </Stack>
    </Stack>
  );
}
