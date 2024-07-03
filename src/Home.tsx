import { Grid, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import { useHistory } from 'react-router-dom';
import ModalPending from './components/modals/Modal';

const Home = () => {
    const dispatch = useDispatch();
    const router = useHistory()
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        dispatch.general.getUserSet({
            onSuccess: (res) => {
                console.log('000000 ++++>', res);
                if(res.length !== 0 && res[0].status === 'approved'){
                    alert(1)
                    router.push('/play')
                }
                if(res.length !== 0 && res[0].status === 'pending'){
                    // router.push('/frozen')
                    alert(0)
                    handleClickOpen()
                }

            },
            onError: (eee) => {
                // handle error
            },
        });
    }, []);

    const eventLogger = (e: MouseEvent) => {
        console.log('Event:>>>>>?> ', e);
    };

    const handleStop = (e, data) => {
        console.log('Event: ', e);
        console.log('Position: ', data.x, data.y);

        if (data.x >= 300) {
            // alert('Reached the end!');
            dispatch.general.requestSet({
                onSuccess: (res) => {
                    // window.location.reload();
                },
                onError: (err) => {
                    // handle error
                },
                data: {
                    // status: 'pending',
                    // count: 50,
                    // level: 0,
                },
            });
        }
    };
    const store = useSelector((state: any) => state);
    // <Button variant="outlined" onClick={handleClickOpen}>
    //     Open Modal
    //   </Button>

    return (
        <div
            style={{
                height: '100vh',
                // background: 'red',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <div
                        style={{
                            background: 'darkBlue',
                            maxWidth: '400px',
                            overflow: 'hidden',
                            position: 'relative',
                            margin: '0 auto',
                            // height: '50px'
                        }}
                    >
                        <Draggable
                            axis="x"
                            handle=".handle"
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            grid={[25, 25]}
                            scale={1}
                            bounds={{ left: 0, right: 300 }}
                            onStart={eventLogger}
                            onDrag={eventLogger}
                            onStop={handleStop}
                        >
                            <div
                                className="handle"
                                style={{
                                    background: 'yellow',
                                    cursor: 'pointer',
                                    width: '90px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'roboto',
                                }}
                            >
                                Swipe
                            </div>
                        </Draggable>
                    </div>
                </Grid>
            </Grid>
            <ModalPending open={open} handleClose={handleClose} />
        </div>
    );
};

export default Home;
