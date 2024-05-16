import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", "admin");
      navigate("/admin");
    } else if (username === "user" && password === "user") {
      localStorage.setItem("username", "user");
      navigate("/user");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password!",
      }).then(() => {
        setUsername("");
        setPassword("");
      });
    }
  };

  const gridStyles = {
    height: "100vh",
  };

  const backgroundStyles = (t) => ({
    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const boxStyles = {
    my: 50,
    mx: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formControlStyles = {
    mt: 1,
  };

  const buttonStyles = {
    mt: 3,
    mb: 2,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={gridStyles}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={backgroundStyles} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={boxStyles}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth sx={formControlStyles}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={buttonStyles}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
