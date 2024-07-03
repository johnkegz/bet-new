import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // marginBottom: theme.spacing(25),
  },
  paper: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
    padding: theme.spacing(2),
    cursor: 'pointer',
    // height: '300px',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#f5f5f5',
  },
  divider: {
    width: '100%',
    height: '2px',
    backgroundColor: 'white',
    // marginBottom: theme.spacing(2),
  },
  section: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    textAlign: 'center',
  },
  balanceSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    marginLeft: theme.spacing(2),
  },
}));

function Summary() {
  const classes = useStyles();
const store = useSelector((state: any) => state);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.section}>
          <Grid item>
            <Typography>Current membership</Typography>
          </Grid>
          <Grid item>
            <Typography>{store.general.profile?.membership_level?.type}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.section}>
          <Grid item xs={2} className={classes.icon}>
            Icon
          </Grid>
          <Grid item xs={6}>
            <Typography>Todays profits</Typography>
            <Typography variant="body2" color="textSecondary">
              System will automatically update the account profits daily
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>USDT</Typography>
            <Typography>0</Typography>
          </Grid>
        </Grid>
        <Box className={classes.divider}></Box>
        <Grid container className={classes.balanceSection}>
          <Grid item xs={2} className={classes.icon}>
            Icon
          </Grid>
          <Grid item xs={6}>
            <Typography>Total balance</Typography>
            <Typography variant="body2" color="textSecondary">
              Profits from each day will automatically be added to the account balance
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>USDT</Typography>
            {/* {console.log(store.general.profile?.account?.status , store.general.profile?.account?.status === 'frozen', "<><><><><")} */}
            <Typography>{store.general.profile?.account?.status === 'frozen' ? "-"+store.general.profile?.account?.pending_payment:store.general.profile?.account?.amount}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Summary;
