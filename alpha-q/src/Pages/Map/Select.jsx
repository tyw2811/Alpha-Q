import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({location, handleChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Locations</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="Location"
          onChange={handleChange}
        >
          <MenuItem value={"Bishan"}>Bishan</MenuItem>
          <MenuItem value={"Hougang"}>Hougang</MenuItem>
          <MenuItem value={"Punggol"}>Punggol</MenuItem>
          <MenuItem value={"Redhill"}>Redhill</MenuItem>
    
        </Select>
      </FormControl>
    </Box>
  );
}