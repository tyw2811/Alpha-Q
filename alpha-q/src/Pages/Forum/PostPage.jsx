import * as React from 'react';
import { Button, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import {supabase} from "../../services/supabase.client";
import { useAuthSession } from "../../providers/auth-session.provider";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const { checkUser, deletePost, deleteImage } = useAuthSession();
  const [posts, setPosts] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const navigate = useNavigate();

  const splithref = window.location.href.split("-");
  let title = React.useMemo(() => [splithref[0].split("/")[splithref[0].split("/").length-1]], []);
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
    if (posts.length===0)
      init();
  }, [posts, telegram, title, selectedImage]);

  React.useEffect(() => {
    async function init() {
      const { data, error } = await supabase
      .storage
      .from("public/post-images")
      .download(title + "-" + telegram);
      if (error) throw error;
      setSelectedImage(data);
    }

    if (!selectedImage)
      init();
  }, [posts, telegram, title, selectedImage]);

  const handleDelete = () => {
    deletePost({
      title: title,
      body: post.body,
      area: post.area,
    });
    deleteImage(title);
    navigate("/forum");
  }

  return (
    post ?
      <Stack direction = "row" justifyContent = "center" spacing = {4} width = "100%" alignItems = "flex-start">
        <Stack spacing = {4}>
          <Paper variant = "outlined" height = "100px">
            <Typography variant="h6">
              Author: @{post.telegram}
            </Typography>
          </Paper>
          {checkUser(telegram) ? <Button variant="contained" onClick = {handleDelete}>Delete</Button> : <></>}
        </Stack>
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
                <img alt="not fount" width={"350px"} src={URL.createObjectURL(selectedImage)} />
              </Stack>
          </Stack>
      </Stack>  
    : <></>
  );
}