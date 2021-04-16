// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/action/auth";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { email, password } = formData;

  // to enable both to be typed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // run login function in actions/auth
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h4">
          Project Management
        </Typography>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;