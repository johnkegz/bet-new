// src/Registration.js
import React, { useState } from 'react';
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

function Registration() {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Username:', userName);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    dispatch.general.register({
      onSuccess: (res) => {
        alert('Registration successful');
      },
      onError: (err) => {
        console.log("err +++>", err);
        // handle error
        setError(err.non_field_errors);
      },
      data: {
        username: userName,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
    });
  };

  const router = useHistory();

  console.log("error +++>", error);

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          Bet
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={handleLastNameChange}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={() => {router.push('/login')}}>
                {"Already have an account? Sign In"}
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

export default Registration;
