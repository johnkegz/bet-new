import { createModel } from '@rematch/core';
import api from '../api';
import { profile } from 'console';
const { getRequest, patchRequest, createRequest } = api;


const initialState = {};
const general = createModel<any>()({
    state: { ...initialState },
    reducers: {
        resetGeneralState() {
            return { ...initialState };
        },
        test(state: any, data: any) {
            return {
                ...state,
                test: data,
            };
        },
        profile(state: any, data: any) {
            return {
                ...state,
                profile: data,
            };
        },
        set(state: any, data: any) {
            return {
                ...state,
                set: data,
            };
        },
    },
    effects: (dispatch) => ({
        login: async (data: any) => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/api-token-auth/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data.data),
                    }
                );

                // Check if the response status is OK (2xx)
                if (!response.ok) {
                    // Handle HTTP errors
                    const errorData = await response.json();
                    console.log('HTTP Error +++++++>', errorData);
                    data.onError && data.onError(errorData);
                } else {
                    const res = await response.json();
                    console.log('Momomo +++++++>', res);

                    // Assuming the token is returned as res.token, adjust if needed
                    if (res.token) {
                        localStorage.setItem('authToken', res.token);
                    }

                    data.onSuccess && data.onSuccess(res);
                }
            } catch (err) {
                console.log('Fetch Error +++++++>', err);
                data.onError && data.onError(err);
            }
        },

        register: async (data: any) => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/register/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data.data),
                    }
                );

                // Check if the response status is OK (2xx)
                if (!response.ok) {
                    // Handle HTTP errors
                    const errorData = await response.json();
                    console.log('HTTP Error +++++++>', errorData);
                    data.onError && data.onError(errorData);
                } else {
                    const res = await response.json();
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res);
                }
            } catch (err) {
                // console.log('Fetch Error +++++++>', err);
                // data.onError && data.onError(err);
            }
        },

        getTest: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch(`http://127.0.0.1:8000/sets/all/sets`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }})
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                    // if (err.response && err.response.data) {
                    //     data.onError && data.onError(err.response.data.message);
                    // }
                });
        },
        requestSet: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch('http://127.0.0.1:8000/sets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data.data),
            })
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res.results);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                });
        },
        approveSet: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch(`http://127.0.0.1:8000/sets/${data.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data.data),
            })
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res.results);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                });
        },
        createMerge: async (data: any) => {
            console.log('herererere +++++++>');
            await fetch(`http://127.0.0.1:8000/merges/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.data),
            })
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res.results);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                });
        },

        getUserSet: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch(`http://127.0.0.1:8000/sets/status/user/?status=approved,pending`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }})
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    dispatch.general.set(res[0])
                    data.onSuccess && data.onSuccess(res[0]);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                });
        },

        createTranction: async (data: any) => {
             const token = localStorage.getItem('authToken');
            await fetch(`http://127.0.0.1:8000/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data.data),
            })
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                });
        },

        getHistory: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch(
                `http://localhost:8000/transactions/user-transactions/3/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            }
            )
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('getHistory +++++++>', res);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err) => {
                    console.log('getHistory+++++++>', err);
                });
        },

        getProfile: async (data: any) => {
            const token = localStorage.getItem('authToken');
            await fetch(`http://localhost:8000/profiles/user`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then((r) => r.json())
                .then((res: any) => {
                    dispatch.general.profile(res);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    }),
});

export default general;
