import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack } from '@mui/material';
import GoogleMap from './GoogleMap'
import Select from './Select'
import {supabase} from "../../services/supabase.client";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function DisableElevation({post}) {
  const navigate = useNavigate();
  return (
    <Button size="small" variant="contained" disableElevation onClick={() => {
      navigate(`/forum/posts/${post.title.replace(/\s+/g, '-') + "-" + post.telegram}`);
    }}>
      Link to Post
    </Button>
  );
}


function createData(postTitle, description, zipcode) {
  return {
    postTitle,
    description,
    zipcode,

  };
}

function Row(props) {
  const { post } = props;
  const [open, setOpen] = React.useState(false);
  


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Stack display="flex" flex="1" width="50%" justifyContent="left">
            <DisableElevation post = {post}/>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row">
          {post.title}
        </TableCell>
        <TableCell align="left">{post.body}</TableCell>
        <TableCell align="right">{"@" + post.telegram}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function BasicTable() {
  const [location, setLocation] = React.useState("Bishan");
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const [posts, setPosts] = React.useState([]);

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
    <Stack width="100%" spacing={10}>
    <Select location = {location} handleChange = {handleChange}/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Telegram handle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts ? posts.filter(a => a.area === location) ? posts.filter(a => a.area === location).map((post) => (
            <Row key={post.title} post={post} /> // should ideally filter out by zipcodes yknow based off the database or sth
          )) : <></> : <></>}
        </TableBody>
      </Table>
    </TableContainer>
    <GoogleMap location = {location} />
    </Stack>
  );
}