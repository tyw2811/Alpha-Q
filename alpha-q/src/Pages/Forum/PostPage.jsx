import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
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
    <Card>
      <CardContent sx={{ position: "relative", width: 340, height: 90 }}>
        <Typography variant="body2" position='relative' bottom='22%'>
          {post.title}
        </Typography>
        <Typography variant="h6" position='relative' bottom='26%'>
          {post.body}
        </Typography>
        <Typography variant="caption" position='relative' bottom='20%' noWrap >
          by: {post.telegram}
        </Typography>
      </CardContent>
    </Card> : <></>
  );
}