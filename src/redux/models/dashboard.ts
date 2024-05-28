import api from '../api';
import { createModel } from '@rematch/core';

const { getRequest } = api;

interface stateType {
    projectDashboard: Array<{}>;
    isFetching: boolean;
    duration: string;
    sevenDaysDashboard: {};
    missingMeasurements: {};
    isFetchingMissingMeasurements: boolean;
}

type payloadType  = Array<{}>

interface errorType {
    message: string;
    statusCode: number;
    response: {
        data: {
            message: '';
            statusCode?: any;
        };
    };
}

const initialState = {
    projectDashboard: [],
    isFetching: false,
    duration: 'month',
    sevenDaysDashboard: {},
    missingMeasurements: {},
    isFetchingMissingMeasurements: false
};

const dashboard = createModel<any>()({
    state: { ...initialState },
    reducers: {
        resetDasboardState() {
            return { ...initialState };
        },
        projectDashboard(state: stateType, data: payloadType) {
            return {
                ...state,
                projectDashboard: data,
            };
        },
        isFetching(state: stateType, data: boolean) {
            return {
                ...state,
                isFetching: data,
            };
        },
        duration(state: stateType, data: string) {
            return {
                ...state,
                duration: data,
            };
        },
        sevenDaysDashboard(state: stateType, data: payloadType) {
            return {
                ...state,
                sevenDaysDashboard: data,
            };
        },
        missingMeasurements(state: stateType, data: payloadType) {
            return {
                ...state,
                missingMeasurements: data,
            };
        },
        isFetchingMissingMeasurements(state: stateType, data: boolean) {
            return {
                ...state,
                isFetchingMissingMeasurements: data,
            };
        },
    },
    effects: (dispatch) => ({
        getProjectActivities: async (data: any, _store: any) => {
            dispatch.dashboard.isFetching(true);
            const dataProjects = [..._store.users.userProjects.filter(item => item.organization.id === data.organizationId).map(item => item.id)]
            await getRequest(`summary/stats?projectId=${dataProjects.join(",")}&filter=${data.duration}`)
                .then((res) => {
                    dispatch.dashboard.isFetching(false);
                    dispatch.dashboard.projectDashboard(res.data);
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    dispatch.dashboard.isFetching(false);
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                    dispatch.dashboard.projectDashboard([]);
                });
        },
        getSevenDaysDashboard: async (data: any, _store: any) => {
            dispatch.dashboard.isFetching(true);
            await getRequest(`summary/seven-day`)
                .then((res) => {
                    dispatch.dashboard.isFetching(false);
                    dispatch.dashboard.sevenDaysDashboard(res.data);
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    dispatch.dashboard.isFetching(false);
                    data.onError && data.onError(err);
                    dispatch.dashboard.sevenDaysDashboard({});
                });
        },
        getMissingMeasurementsDashboard: async (data: any, _store: any) => {
            dispatch.dashboard.isFetchingMissingMeasurements(true);
            const { filters } = data;
            const queries = {...filters}
            const newParams = []
            Object.keys(queries).forEach(item => {
                if(queries[item]){
                    newParams.push(`${item}=${queries[item]}&`)
                }   
            })
            let requestData = newParams.join('');
            await getRequest(`summary/missing?${requestData}`)
                .then((res) => {
                    
                    dispatch.dashboard.missingMeasurements(res.data);
                    data.onSuccess && data.onSuccess(res.data.rows);
                    dispatch.dashboard.isFetchingMissingMeasurements(false);
                })
                .catch((err: errorType) => {
                    dispatch.dashboard.isFetchingMissingMeasurements(false);
                    data.onError && data.onError(err);
                    dispatch.dashboard.missingMeasurements({});
                });
        },
    }),
});

export default dashboard;
