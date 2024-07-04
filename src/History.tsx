import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 2,
        margin: '100px auto',
    },
    card: {
       
        margin: '20px auto',
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
        display: 'flex',
        alignItems: 'center',
        maxWidth: '600px',
        width: '100%',
    },
    leftPart: {
width: '200%',
borderRadiusTopleft: '50px',
  background: 'black',
    },
    cardBody: {
        fontSize: '1rem',
        
        width: '100%', 
        textAlign: 'left', 
        padding: '0 20px', 
        color: '#fff'
    },
    cardFooter: {
       display: 'flex',
       
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    gridContainer: {
        // display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    status: {
        padding: theme.spacing(1),
        borderRadius: '4px',
        fontWeight: 'bold',
        width: '100px',
        textAlign: 'center',
    },
    pending: {
        background: 'orange',
        color: '#fff',
    },
    completed: {
        background: 'green',
        color: '#fff',
    },
    frozen: {
        background: 'red',
        color: '#fff',
    },
}));

const History = () => {
    const [data, setData] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch.general.getHistory({
            onSuccess: (res) => {
                console.log('John John John0 ++++>', res);
                setData(res);
            },
            onError: (eee) => {
                // handle error
            },
        });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            {/* <Typography variant="h6" gutterBottom>
                Transaction Data
            </Typography> */}
            <div className={classes.gridContainer}>
                {data && data.map((row) => (
                    <Paper className={classes.card} key={row.id}>
                        <Typography className={classes.leftPart}>
                        <Typography className={classes.cardBody}>
                            {row?.product?.name || 'N/A'}
                        </Typography>
                        <Typography className={classes.cardBody}>
                            Total Amount: {row.amount_spent}
                        </Typography>
                        <Typography className={classes.cardBody}>
                            Profits: {row.commision}
                        </Typography>
                        <Typography className={classes.cardBody}>
                            <StatusCard status={row?.status} />
                        </Typography>
                        </Typography>
                        <Typography className={classes.cardFooter}>
                            <img src={row.product.url} style={{
                                width: '150px',
                                height: '100px',
                                objectFit: 'contain'
                            }}/>
                        </Typography>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

const StatusCard = ({ status }) => {
    const classes = useStyles();
    const statusClass = classes[status.toLowerCase()] || '';

    return (
        <div className={`${classes.status} ${statusClass}`}>
            {status}
        </div>
    );
};

export default History;
