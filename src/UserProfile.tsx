import React, { useEffect, useState } from 'react';
import { makeStyles, Avatar, Typography, Grid, Paper } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        maxWidth: 600,
        margin: '0 auto',
        marginTop: '200px'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: theme.spacing(2),
    },
    icon: {
        fontSize: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    field: {
        marginBottom: theme.spacing(1),
    },
}));


const UserProfile = () => {
    const [userProfile, setData] = useState<any>([])
        const store = useSelector((state: any) => state);
    const classes = useStyles();
        const dispatch = useDispatch()

    useEffect(() => {
        dispatch.general.getProfile({
            onSuccess: (res) => {
                console.log('John John John0werwew ++++>', res);
                setData(res)
            },
            onError: (eee) => {
                // handle error
            },
        });
    }, []);

    return (
        <Paper className={classes.root}>
            <Grid container direction="column" alignItems="center">
                <Avatar className={classes.avatar}>
                    <AccountCircle className={classes.icon} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                    {userProfile?.user?.username}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                    Email: {userProfile?.user?.email}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                    Membership Level: {userProfile?.membership_level?.type}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                    Balance: {userProfile?.account?.amount}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                    Pending Payment: {store.general.profile?.account?.status === 'frozen' ? "-"+store.general.profile?.account?.pending_payment:store.general.profile?.account?.amount}
                </Typography>

                
            </Grid>
        </Paper>
    );
};

export default UserProfile;
