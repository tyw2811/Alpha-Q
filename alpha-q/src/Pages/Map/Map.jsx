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

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function createData(postTitle, description, zipcode) {
  return {
    postTitle,
    description,
    zipcode,
    pictures: [
      {
      },
      {
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.postTitle}
        </TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="right">{row.zipcode}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pictures
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




const rows = [
  createData('get rid of my garbage', "this food is gonna expire soon", 823661),
  createData('very cheap chocolate', "fresh from my toilet", 547332),
  createData('campbells', "circa 1956", 235211),
];

const foodData = [{
  area: "Punggol",
  lat: 1.4029897287723678,
  lng: 103.91765866702444
}, {
  area: "Hougang",
  lat: 1.3715304982645449,
  lng: 103.89272759746416
}, {
  area: "Bishan",
  lat: 1.3506460537972835,
  lng: 103.84786212177235
}, {
  area: "Redhill",
  lat: 1.289291598245397,
  lng: 103.81689648378763
}]









export default function BasicTable() {
  const [location, setLocation] = React.useState("Bishan");
  const handleChange = (event) => {
    setLocation(event.target.value);
  };
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
            <TableCell align="right">Zipcode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.postTitle} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <GoogleMap location = {location} />
    </Stack>
    

  );

  


}