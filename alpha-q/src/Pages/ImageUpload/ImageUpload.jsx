import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import ImageUploadThing from './ImageUploadThing';
import { useAuthSession } from "../../providers/auth-session.provider";

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TypographyTheme() {
  return <Stack>
    <Typography>HelpMe</Typography>
    <ImageUploadThing></ImageUploadThing>
    </Stack>;

}