import * as React from 'react';
import { Card, CardActionArea, CardContent, Dialog, Skeleton, Typography, IconButton, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function ForumBox(props) {
  const { forumPost, index} = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      <CardContent sx={{ position: "relative", width: 340, height: 90 }}>
        <Typography variant="caption" position='relative' bottom='30%'>
          {forumPost.title}
        </Typography>
        <Typography variant="h6" position='relative' bottom='30%'>
          {forumPost.body}
        </Typography>
        <Typography variant="caption" position='relative' bottom='20%' noWrap >
          by: {forumPost.telegram}
        </Typography>
      </CardContent>
    </Card>
  );
}