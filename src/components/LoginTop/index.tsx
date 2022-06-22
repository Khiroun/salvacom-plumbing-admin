import Avatar from "@mui/material/Avatar";
import { AiOutlineLock as LockOutlinedIcon } from "react-icons/ai";
import Typography from "@mui/material/Typography";

const LoginTop = () => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Connexion
      </Typography>
    </>
  );
};

export default LoginTop;
