import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AppTitle() {
  const navigate = useNavigate();
  return (
    <>
      {({ toggleLanding }) => (
        <Button
          onClick={() => {
            navigate("/");
            toggleLanding();
          }}
        >
          <Typography
            variant="h5"
            color={"primary"}
            noWrap
            sx={{ fontWeight: "bold" }}
          >
            Alpha Q
          </Typography>
        </Button>
      )}
    </>
  );
}
