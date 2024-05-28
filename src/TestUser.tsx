import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';

const TestUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch.general.getUserSet({
            onSuccess: (res) => {
                console.log('Kalyang0 ++++>', res);
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
                console.log('zzzKalyang0 ++++>', res);
            },
            onError: (err) => {
                // handle error
            },
            data: {
                type: 'Spend',
                level: 2,
                product: 1,
                amount_spent: '1500',
                commision: '5',
                set: 1
            }
            })
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <div style={{ background: 'pink', height: '200px' }}>Products</div>
            <div
                style={{
                    background: 'darkBlue',
                    maxWidth: '400px',
                    overflow: 'hidden',
                    position: 'relative',
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
                        }}
                    >
                        Swipe
                    </div>
                </Draggable>
            </div>
        </div>
    );
};

export default TestUser;
