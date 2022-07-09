import * as React from 'react';
import { Stack, Button, Typography } from  "@mui/material";
import ForumBox from './ForumBox';
import PostDialog from './PostDialog';
import {supabase} from "../../services/supabase.client";

export default function Forum() {

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [posts, setPosts] = React.useState([]);
  const [post, setPost] = React.useState([]);

  const eg = {
    title: "alpha q",
    body: "pls let us win",
    area: "hg",
    pic: "null",
    telegram: "@ywywyw",
  }

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
      direction="row"
      justifyContent="center"
      spacing = {4}
    >
      <Stack>
        <PostDialog open = {openDialog} handleCloseDialog = {handleCloseDialog} />
        <Button variant="contained" onClick = {handleOpenDialog}>
          <Typography>Post</Typography>
        </Button>
      </Stack>
      <Stack width = "60%" spacing = {2} overflowY="scroll">
        {posts.map(post => <ForumBox forumPost = {post} setPost = {setPost}/>
        )}
      </Stack>
    </Stack>
  );
}
