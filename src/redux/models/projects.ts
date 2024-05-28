import api from '../api';
import { createModel } from '@rematch/core'

const { getRequest } = api;

interface stateType {
    projects: Array<{}>;
    project: {}
}

interface errorType {
    message?: string;
    response?: {
        data?: {
            message?: "";
            statusCode?: any;
        }
    };
}

const projects = createModel<any>()({
    state: {
        projects: [],
        project: {}
    },
    reducers: {
        getProjects(state: stateType, payload: any) {
            return {
                ...state,
                projects: payload
            };
        },
        project(state: stateType, payload: any) {
            return {
                ...state,
                project: payload
            };
        },
    },
    effects: (dispatch) => ({
        getAllProjects: async (data: any) => {
            await getRequest('projects')
                .then((res) => {
                    dispatch.projects.getProjects(res.data.rows);
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if(err.message === "Network Error"){
                        return data.onError && data.onError(err.message);
                    }
                    if (err.response && err.response.data.statusCode === 401) {
                        dispatch.projects.getProjects([]);
                    }
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getProject: async (data: any) => {
            await getRequest(`projects/${data.id}`)
                .then((res) => {
                    dispatch.projects.project(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
    }),
});

export default projects;
