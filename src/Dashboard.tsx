import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    editButton: {
        marginRight: theme.spacing(1),
    },
}));

const Dashboard = () => {
    const [setlist, setSetList] = useState([]);
    const [setRequest, setSetRequest] = useState({});
    const [merges, setMerge] = useState({});
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch.general.getTest({
            onSuccess: (res) => {
                console.log('Response ++++>', res);
                setSetList(res);
            },
            onError: (eee) => {
                // handle error
            },
        });
    }, [dispatch]);

    const onRequestChange = (e) => {
        setSetRequest({ ...setRequest, [e.target.name]: e.target.value });
    };

    const onRequest = (e) => {
        e.preventDefault();
        dispatch.general.requestSet({
            onSuccess: (res) => {
                setSetList(res);
            },
            onError: (eee) => {
                // handle error
            },
            data: {
                status: 'pending',
                ...setRequest,
            },
        });
    };

    const onApproveRequest = (id) => {
        dispatch.general.approveSet({
            onSuccess: (res) => {
                // handle success
            },
            onError: (eee) => {
                // handle error
            },
            id: id,
            data: {
                status: 'approved',
            },
        });
    };

    const onMergeChange = (e, id) => {
        setMerge({ ...merges, [e.target.name]: e.target.value, set: id });
    };

    // const onMergeSetSubmit = (e, id) => {
    //     e.preventDefault();
    //     const data = {
    //         status: 'pending',
    //         set: id,
    //         ...merges,
    //     };

    //     dispatch.general.createMerge({
    //         onSuccess: (res) => {
    //             dispatch.general.approveSet({
    //                 onSuccess: (res2) => {
    //                     window.location.reload();
    //                 },
    //                 onError: (error) => {
    //                     alert(error);
    //                 },
    //                 id: id,
    //                 data: {
    //                     status: 'approved',
    //                 },
    //             });
    //         },
    //         onError: (error) => {
    //             alert(error);
    //         },
    //         data: data,
    //     });
    // };

    const handleApprove = (e, id) => {
        e.preventDefault();
        const data = {
            id: id,
        };

        // dispatch.general.approveSet({
        //     onSuccess: (res) => {
                dispatch.general.approveSet({
                    onSuccess: (res2) => {
                        // window.location.reload();
                    },
                    onError: (error) => {
                        alert(error);
                    },
                    id: id,
                    data: {
                        status: 'approved',
                    },
                });
            }
        //     onError: (error) => {
        //         alert(error);
        //     },
        //     data: data,
        // });
    // };

    return (
        <div>
            {/* <div className={classes.container}>
                <form onSubmit={onRequest}>
                    <TextField
                        className={classes.input}
                        type="number"
                        placeholder="User ID"
                        name="user"
                        onChange={onRequestChange}
                        fullWidth
                    />
                    <TextField
                        className={classes.input}
                        type="number"
                        placeholder="Count"
                        name="count"
                        onChange={onRequestChange}
                        fullWidth
                    />
                    <TextField
                        className={classes.input}
                        type="number"
                        placeholder="Level"
                        name="level"
                        onChange={onRequestChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                    >
                        Request
                    </Button>
                </form>
            </div> */}

            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Count</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {setlist.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.user.username}</TableCell>
                                <TableCell><Status value={item.status} /></TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell>{item?.account?.Amount}</TableCell>
                                <TableCell>
                                    {item.status === 'pending' ? (
                                        <form
                                            onSubmit={(e) =>
                                                handleApprove(e, item.id)
                                            }
                                        >
                                            {/* <TextField
                                                type="number"
                                                placeholder="Level"
                                                name="level"
                                                onChange={(e) =>
                                                    onMergeChange(e, item.id)
                                                }
                                                className={classes.input}
                                            />
                                            <TextField
                                                type="number"
                                                placeholder="Count"
                                                name="merge_amount"
                                                onChange={(e) =>
                                                    onMergeChange(e, item.id)
                                                }
                                                className={classes.input}
                                            /> */}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className={classes.button}
                                            >
                                                Approve
                                            </Button>
                                        </form>
                                    ) : ""
                                    // (
                                    //     <Button
                                    //         variant="contained"
                                    //         color="secondary"
                                    //         className={classes.editButton}
                                    //         onClick={() =>
                                    //             onApproveRequest(item.id)
                                    //         }
                                    //     >
                                    //         Edit
                                    //     </Button>
                                    // )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;

const Status = ({value}) => {
    let color = 'grey'
    if(value === 'approved') color = 'green'
    if(value === 'pending') color = 'orange'
    
    return <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        <div style={{
        background: color,
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        borderRadius: '10px',
        border: `1px solid white`
    }}>{value}</div> </div>
}
