import * as React from 'react';
import { Stack, Button, Typography } from  "@mui/material";
import ForumBox from './ForumBox';

export default function Forum() {

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
        <Button variant="contained">
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
