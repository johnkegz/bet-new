import { Grid, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import ProductSlider from './ProductSlider';
import Summary from './Summary';
import FrozenModal from './FrozenModal';

const Play = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state: any) => state);
    useEffect(() => {
        dispatch.general.getUserSet({
            onSuccess: (res) => {
                dispatch.general.getProfile({
                    onSuccess: (res) => {
                        console.log(
                            'Profile 88++++>',
                            res.account.status
                        );

                        if(res.account.status === 'frozen'){
                            setOpen(true)
                        }
                        else{
                             setOpen(false)
                        }
                    },
                    onError: (eee) => {
                        // handle error
                    },
                });
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
            dispatch.general.createTranction({
                onSuccess: (res) => {
                window.location.reload()
            },
            onError: (err) => {
                // handle error
            },
            data: {
                type: 'Promote',
                level: store?.general?.set?.level+1,
                product: Math.floor(Math.random() * 10),
                amount_spent: '1500',
                commision: '5',
                set: 1
            }
            })
        }
    };

  

    return (
        <div style={{ height: '100vh', marginTop: '100px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Summary />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ProductSlider />
                </Grid>
                {store.general.profile?.account?.status !== 'frozen' && <Grid item xs={12} sm={12}>
                    <div style={{
                            display: 'flex', alignItems: 'center', justifyContent:'center',
                            color: '#fff',
                            fontSize: '20px',
                            background: 'lightBlue',
                            fontFamily: 'roboto',
                            }}>
                                Level: {store?.general?.set?.level}/ {store?.general?.set?.count}</div>
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
                                    display: 'flex', alignItems: 'center', justifyContent:'center',
                                    fontFamily: 'roboto',
                                }}
                            >
                                Swipe
                            </div>
                        </Draggable>
                        
                    </div>
                </Grid>}
            </Grid>
            <FrozenModal
                open={open}
                handleClose={() => {setOpen(false)}}
                handleTransaction={() => {}}
            />
        </div>
    );
};

export default Play;