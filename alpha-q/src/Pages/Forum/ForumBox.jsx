import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";

export default function ForumBox(props) {
  const { forumPost } = props;

  const handleOpenPost = () => {
    window.location.href = `/forum/posts/${forumPost.title.replace(/\s+/g, '-') + "-" + forumPost.telegram}`;
  }

  return (
    <Card onClick={handleOpenPost}>
      <CardContent sx={{ position: "relative", height: 90 }}>
        <Typography variant="body2" noWrap position='relative' bottom='22%'>
          {forumPost.title}
        </Typography>
        <Typography variant="h6" noWrap position='relative' bottom='26%'>
          {forumPost.body}
        </Typography>
        <Typography variant="caption" position='relative' bottom='20%' noWrap >
          by: {forumPost.telegram}
        </Typography>
      </CardContent>
    </Card>
  );
}