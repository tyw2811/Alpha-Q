import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/Home.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <Stack spacing={2} display="flex" flex="1" justifyContent="center" alignItems="center">
      <Typography variant="h1" display={{ sm: "block", xs: "none" }} fontWeight="bold" color="primary">
        ALPHA Q
      </Typography>
      <Button variant="contained" onClick={handleStart}>
        {"Get started"}
      </Button>
    </Stack>
  );
}
