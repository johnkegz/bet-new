import { createModel } from '@rematch/core';
import api from '../api';
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
    },
    effects: (dispatch) => ({
        getTest: async (data: any) => {
            await fetch(`http://127.0.0.1:8000/sets/`)
                .then((r) => r.json())
                .then((res: any) => {
                    console.log('Momomo +++++++>', res);
                    data.onSuccess && data.onSuccess(res.results);
                })
                .catch((err) => {
                    console.log('+++++++>', err);
                    // if (err.response && err.response.data) {
                    //     data.onError && data.onError(err.response.data.message);
                    // }
                });
        },
        requestSet: async (data: any) => {
            console.log('herererere +++++++>');
            await fetch('http://127.0.0.1:8000/sets/', {
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
        approveSet: async (data: any) => {
            console.log('herererere +++++++>');
            await fetch(`http://127.0.0.1:8000/sets/${data.id}/`, {
                method: 'PATCH',
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
            console.log('two +++++++>');
            await fetch(`http://127.0.0.1:8000/sets/2/`, {
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

        createTranction: async (data: any) => {
            console.log('two +++++++>');
            await fetch(`http://127.0.0.1:8000/transactions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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

    }),
});

export default general;
