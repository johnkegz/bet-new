// src/Login.js
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
   const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    
  }, [])

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Email:', userName);
    console.log('Password:', password);
    dispatch.general.login({
                onSuccess: (res) => {
                   router.push('/')

                },
                onError: (err) => {
                     console.log("err +++>", err);
                    // handle error
                    setError(err.non_field_errors)
                },
                data: {username: userName, password: password},
            });
  };

  console.log("error +++>", error);

  const router = useHistory()

  return (
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
            Bet
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              name="userName"
              autoComplete="email"
              autoFocus
            value={userName}
            onChange={handleUserNameChange}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button href="#">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => {router.push('/register')}}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <Box mt={8}>
          <Typography color="textSecondary" align="center">
            {'Copyright © '}
            Your Website {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
  );
}

export default Login;
