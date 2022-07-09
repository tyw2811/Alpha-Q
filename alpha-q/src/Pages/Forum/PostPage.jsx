import * as React from 'react';
import { Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import {supabase} from "../../services/supabase.client";
import { useAuthSession } from "../../providers/auth-session.provider";

export default function PostPage(props) {
  const { forumPost } = props;
  const [posts, setPosts] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

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
  }, [posts, telegram, title, selectedImage]);

  React.useEffect(() => {
    async function init() {
      const { data, error } = await supabase
      .storage
      .from("public/post-images")
      .download("abcd");
      if (error) throw error;
      setSelectedImage(data);
    }

    init();
  }, [posts, telegram, title, selectedImage]);

  return (
    <>
    {post ?
    <Stack direction = "row" justifyContent = "center" spacing = {4} width = "100%" alignItems = "flex-start">
      <Paper variant = "outlined" height = "100px">
        <Typography variant="h6">
          Author: @{post.telegram}
        </Typography>
      </Paper>
      <Stack justifyContent = "top" width = "30%" spacing = {4}>
          <Typography variant="h3">
            {post.title}
          </Typography>
          <Stack spacing = {0.5}>
            <Typography variant="h5">
              Description:
            </Typography>
            <Typography variant="h6">
              {post.body}
            </Typography>
          </Stack>
      </Stack>
    </Stack>  
    : <></>}
    {selectedImage ? 
    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
    : <>hi</>}
    </>
  );
}