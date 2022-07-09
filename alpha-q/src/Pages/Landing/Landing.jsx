import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/Home.jpg";
import "./style.css"

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <section className = "main-container">
      <Stack spacing={2} display="flex" flex="1" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleStart}>
          {"Get started"}
        </Button>
      </Stack>
    </section>
  );
}
