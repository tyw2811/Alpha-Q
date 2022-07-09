import * as React from 'react';
import Stack from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
    <Stack spacing = "2">
      <ForumBox forumPost = {eg}/>
      <ForumBox forumPost = {eg}/>
    </Stack>
  );
}
