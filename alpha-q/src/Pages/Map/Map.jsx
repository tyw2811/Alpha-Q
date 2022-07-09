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
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function DisableElevation() {
  const navigate = useNavigate();
  return (
    <Button size="small" variant="contained" disableElevation onClick={() => {
      navigate("/forum");
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
              <Stack display="flex" flex="1" width="7%" justifyContent="left">
                <DisableElevation></DisableElevation>
                <Typography variant="h6" gutterBottom component="div">
                  Pictures
                </Typography>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




const rows = [
  createData('get rid of my garbage', "this food is gonna expire soon", 823660),
  createData('very cheap chocolate', "fresh from my toilet", 547332),
  createData('campbells', "circa 1956", 566610),
  createData('p', "de", 145211)
];

const foodData = [{
  area: "Punggol",
  rows: [createData('get rid of my garbage', "this food is gonna expire soon", 823660)]
}, {
  area: "Hougang",
  rows: [createData('very cheap chocolate', "fresh from my toilet", 547332)]
}, {
  area: "Bishan",
  rows: [createData('campbells', "circa 1956", 566610)]
}, {
  area: "Redhill",
  rows: [
    createData('p', "de", 145211),
    createData('iss', "de", 145441)
  ]
}]









export default function BasicTable() {
  const [location, setLocation] = React.useState("Bishan");
  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  const area = foodData.find(a => a.area === location);
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
          {area.rows.map((row) => (
            <Row key={row.postTitle} row={row} /> // should ideally filter out by zipcodes yknow based off the database or sth
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <GoogleMap location = {location} />
    </Stack>
    

  );

  


}