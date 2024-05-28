import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Test = () => {
    const [setlist, setSetList] = useState([]);
    const [setRequest, setSetRequest] = useState({});
    const [merges, setMerge] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch.general.getTest({
            onSuccess: (res) => {
                console.log('Kalyang ++++>', res);
                setSetList(res);
                //
            },
            onError: (eee) => {
                // setIsfiltering(false)
                // props.handleAfterFilter(false)
                // props.setRefreshFilter(false)
            },
        });
    }, []);

    const onrequestChange = (e) => {
        setSetRequest({ ...setRequest, [e.target.name]: e.target.value });
    };

    const onrequest = (e) => {
        e.preventDefault();
        console.log('eeeee ++++>');
        dispatch.general.requestSet({
            onSuccess: (res) => {
                setSetList(res);
                //
            },
            onError: (eee) => {
                // setIsfiltering(false)
                // props.handleAfterFilter(false)
                // props.setRefreshFilter(false)
            },
            data: {
                status: 'pending',
                ...setRequest,
            },
        });
    };

    const onApproverequest = (id) => {
        console.log('appppppp ++++>');
        dispatch.general.approveSet({
            onSuccess: (res) => {
                // setSetList(res);
                //
            },
            onError: (eee) => {
                // setIsfiltering(false)
                // props.handleAfterFilter(false)
                // props.setRefreshFilter(false)
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

    const onMergeSetSubmit = (e, id) => {
        e.preventDefault();
        const data = {
            status: 'pending',
            set: id,
            ...merges,
        };
        console.log('====>', data);

        dispatch.general.createMerge({
            onSuccess: (res) => {
                // setSetList(res);

                console.log('first -------', res);
                dispatch.general.approveSet({
                    onSuccess: (res2) => {
                        // setSetList(res);
                        //
                        console.log('Kalyango john +++++++>', res2);
                        window.location.reload();
                    },
                    onError: (error) => {
                        alert(error);
                    },
                    id: id,
                    data: {
                        status: 'approved',
                    },
                });
            },
            onError: (error) => {
                alert(error);
            },
            data: data,
        });
    };
    //

    console.log('setlist +++>', merges);
    return (
        <div>
            <div
                style={{
                    marginTop: '60px',
                    background: 'red',
                }}
            >
                <form action="" onSubmit={onrequest}>
                    <input
                        type="number"
                        placeholder="user id"
                        name="user"
                        onChange={onrequestChange}
                    />
                    <input
                        type="number"
                        placeholder="count"
                        name="count"
                        onChange={onrequestChange}
                    />
                    <input
                        type="number"
                        placeholder="level"
                        name="level"
                        onChange={onrequestChange}
                    />
                    <Button
                        variant="contained"
                        className="addPlotBtn"
                        onClick={() => {}}
                        type="submit"
                    >
                        Requst
                    </Button>
                </form>
            </div>

            <div
                style={{
                    background: 'green',
                }}
            >
                <div>List</div>
                <div>
                    <ul>
                        {setlist.map((item) => (
                            <li style={{ marginBottom: '10px' }} key={item.id}>
                                                          {item.user}
                                {item.status}
                                {item.count}
                                {item.status === 'pending' &&<form
                                    action=""
                                    onSubmit={(e) =>
                                        onMergeSetSubmit(e, item.id)
                                    }
                                >
                                    {/* TODO: Validations for amount put and level */}
                                    <input
                                        type="number"
                                        placeholder="user id"
                                        name="level"
                                        onChange={(e) =>
                                            onMergeChange(e, item.id)
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="count"
                                        name="merge_amount"
                                        onChange={(e) =>
                                            onMergeChange(e, item.id)
                                        }
                                    />
                                    <Button
                                        variant="contained"
                                        className="addPlotBtn"
                                        // onClick={() =>
                                        //     onApproverequest(item.id)
                                        // }
                                        type="submit"
                                    >
                                        Approve
                                    </Button>
                                </form>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div
                style={{
                    background: 'yellow',
                }}
            >
                <div>Play test ground</div>
                <div>
                    <ul>
                        {setlist.map((item) => (
                            <li
                                style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                }}
                            >
                                {item.status !== 'pending' && (
                                    <div>
                                        {item.user}
                                        {item.status}
                                        <form action="">
                                            <input type="number" />
                                            <Button
                                                variant="contained"
                                                className="addPlotBtn"
                                                onClick={() => {}}
                                            >
                                                swipe
                                            </Button>
                                        </form>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Test;
