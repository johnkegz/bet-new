import api from '../api'
import { createModel } from '@rematch/core'

const { createRequest } = api

interface stateType {
    data: {
        message: string
    },
    logs: any
}

interface errorType {
    response: {
        data: {
            message: ''
        }
    }
}

const logs = createModel<any>()({
    state: {
        data: {
            message: '',
        },
        logs: [],
    },
    reducers: {
        created(state: stateType) {
            return {
                ...state,
                data: state.data,
            }
        },
        saveLogs(state: any, payload: any) {
            return {
                ...state,
                logs: payload,
            }
        },
    },
    effects: (dispatch) => ({
        createLog: async (data: any) => {
            await createRequest('logs/create-log', data.log)
                .then((res) => {
                    dispatch.logs.created(res.data)
                    data.onSuccess && data.onSuccess(res.statusText)
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess && data.onError(err.response.data)
                    }
                })
        },
    }),
})

export default logs;
