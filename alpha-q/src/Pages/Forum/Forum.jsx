import * as React from 'react';
import { Stack, Button, Typography } from  "@mui/material";
import ForumBox from './ForumBox';
import PostDialog from './PostDialog';

export default function Forum() {

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const eg = {
    title: "alpha q",
    body: "pls let us win",
    area: "hg",
    pic: "null",
    telegram: "@ywywyw",
  }

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
      <Stack width = "60%" spacing = {2}>
        <ForumBox forumPost = {eg}/>
        <ForumBox forumPost = {eg}/>
      </Stack>
    </Stack>
  );
}
