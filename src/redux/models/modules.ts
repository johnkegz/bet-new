import api from '../api';
import { createModel } from '@rematch/core'

const { getRequest } = api;
interface errorType {
    response: {
        data: {
            message: ""
        }
    };
}

const modules = createModel<any>()({
    state: {
        modules: []
    },
    reducers: {
        saveModules(state: any, payload: any) {
            return {
                ...state,
                modules: payload
            };
        },
    },
    effects: (dispatch) => ({
        getModules: async (data: any) => {
            await getRequest(`modules`)
                .then((res) => {
                    dispatch.modules.saveModules(res.data);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err:errorType) => {                    
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        }
    }),
});

export default modules;
