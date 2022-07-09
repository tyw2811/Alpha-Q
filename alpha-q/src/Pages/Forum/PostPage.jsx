import * as React from 'react';
import { Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import {supabase} from "../../services/supabase.client";
import { useAuthSession } from "../../providers/auth-session.provider";

export default function PostPage(props) {
  const { forumPost } = props;
  const [posts, setPosts] = React.useState([]);

  const splithref = window.location.href.split("-");
  let title = [splithref[0].split("/")[splithref[0].split("/").length-1]];
  title = title.concat(splithref.slice(1, splithref.length - 1));
  title = title.join(" ");
  const telegram = splithref[splithref.length - 1];

  const post = posts.find(p => p.title === title && p.telegram === telegram);

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
    post ?
    <Stack direction = "row" justifyContent = "center" spacing = {4} width = "100%" alignItems = "flex-start">
      <Paper variant = "outlined" height = "100px">
        <Typography variant="h6">
          By: {post.telegram}
        </Typography>
      </Paper>
      <Stack justifyContent = "top" width = "30%">
        <Paper variant = "outlined" spacing = {4} alignItems= "center">
          <Typography variant="h4">
            {post.title}
          </Typography>
          <Typography variant="h5">
            {post.body}
          </Typography>
        </Paper>
      </Stack>
    </Stack>  
    : <></>
  );
}