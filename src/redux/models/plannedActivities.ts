import api from '../api';
import { createModel } from '@rematch/core';

const { getRequest, patchRequest, createRequest, deleteRequest } = api;
interface errorType {
    response: {
        data: {
            message: ""
        }
    };
}

const initialState = {
    plannedActivities: {
        currentPage: 1,
        limit: null,
        nextpage: null,
        pageItemCount: null,
        previouspage: null,
        rows: [],
        totalItems: null,
        totalPages: 0
    },
    userPlannedActivities: {
        currentPage: 1,
        limit: null,
        nextpage: null,
        pageItemCount: null,
        previouspage: null,
        rows: [],
        totalItems: null,
        totalPages: 0
    },
    plotPlannedActivities: {
        currentPage: 1,
        limit: null,
        nextpage: null,
        pageItemCount: null,
        previouspage: null,
        rows: [],
        totalItems: null,
        totalPages: 0
    },
    plannedActivitySummary: {},
    plannedActivitySummaryPlotPage: {},
    plannedActivitySummaryUserPage: {},
    plannedFiltersChecked: {},
    plannedFilters: {},
    availablePlannedChips: {},
    plannedChips: [],
}

const plannedActivities = createModel<any>()({
    state: {...initialState},
    reducers: {
        resetPlannedActivitiesState() {
            return {...initialState}
        },
        userPlannedActivities(state: any, data: any) {
            return {
                ...state,
                userPlannedActivities: data
            }
        },
        userPlannedActivity(state: any, data: any) {
            return {
                ...state,
                plannedActivity: data
            }
        },
        plannedActivities(state: any, data: any) {
            return {
                ...state,
                plannedActivities: data
            }
        },
        plannedActivitySummary(state: any, data: any) {
            return {
                ...state,
                plannedActivitySummary: data
            }
        },
        plannedActivitySummaryPlotPage(state: any, data: any) {
            return {
                ...state,
                plannedActivitySummaryPlotPage: data
            }
        },
        plannedActivitySummaryUserPage(state: any, data: any) {
            return {
                ...state,
                plannedActivitySummaryUserPage: data
            }
        },
        plotPlannedActivities(state: any, data: any) {
            return {
                ...state,
                plotPlannedActivities: data
            }
        },
        plannedFiltersChecked(state: any, data: any) {
            return {
                ...state,
                plannedFiltersChecked: data
            }
        },
        plannedFilters(state: any, data: any) {
            return {
                ...state,
                plannedFilters: data
            }
        },
        availablePlannedChips(state: any, data: any) {
            return {
                ...state,
                availablePlannedChips: data,
            }
        },
        plannedChips(state: any, data: any) {
            return {
                ...state,
                plannedChips: data,
            }
        },
    },
    effects: (dispatch) => ({
        getuserPlannedActivities: async (data: any) => {
            dispatch.plannedActivities.userPlannedActivities({
                currentPage: 1,
                limit: null,
                nextpage: null,
                pageItemCount: null,
                previouspage: null,
                rows: [],
                totalItems: null,
                totalPages: 0
            });
            await getRequest(`planned-activity/user/${data.userId}?${data.data}`)
                .then((res) => {
                    dispatch.plannedActivities.userPlannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        createPlannedActivity: async (data: any) => {
            await createRequest('planned-activity/create', data.plannedActivity)
            .then((res) => {
                data.onSuccess && data.onSuccess(res.data);
            })
            .catch((err: errorType) => {
                if (err && err.response && err.response.data) {
                    data.onSuccess && data.onError(err.response.data.message);
                }
            });
        }, 
        getPlannedActivity: async (data: any) => {
            await getRequest(`planned-activity/${data.id}`)
                .then((res) => {
                    dispatch.plannedActivities.userPlannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        updatePlannedActivity: async (data: any) => {
            await patchRequest(`planned-activity/${data.id}`, data.editedPlannedActivity)
                .then((res) => {
                    // dispatch.plannedActivities.userPlannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getPlannedActivities: async (data: any) => {
            await getRequest(`v2/planned-activity?${data.data}`)
                .then((res) => {
                    dispatch.plannedActivities.plannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getPlotPlannedActivities: async (data: any) => { // get all planned activities for a plot
            await getRequest(`planned-activity/plot/${data.plotId}?${data.data}`)
                .then((res) => {
                    dispatch.plannedActivities.plotPlannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        setPlannedActivitySummary: (data: any) =>{
            if(data.page === "plot") dispatch.plannedActivities.plannedActivitySummaryPlotPage(data.plannedActivitySummary);
            if(data.page === "user") dispatch.plannedActivities.plannedActivitySummaryUserPage(data.plannedActivitySummary);
            if(data.page === "planned-activity")  dispatch.plannedActivities.plannedActivitySummary(data.plannedActivitySummary);
        },
        createMultiplePlannedActivity: async (data: any, _store: any) => {
            const newWarning = {..._store.general.warnBeforeExit, createPlannedActivity: ''}
            dispatch.general.warnBeforeExit(newWarning)
            await createRequest('v2/planned-activity/create', data.plannedActivity)
            .then((res) => {
                data.onSuccess && data.onSuccess(res.data);
            })
            .catch((err: errorType) => {
                if (err && err.response && err.response.data) {
                    data.onSuccess && data.onError(err.response);
                }
            });
        }, 
        deleteBatchPlannedActivities: async (data: any) => {
            await deleteRequest('planned-activity/batch-delete', data.plannedData)
            .then((res) => {
                data.onSuccess && data.onSuccess(res.data);
            })
            .catch((err: errorType) => {
                if (err && err.response && err.response.data) {
                    data.onSuccess && data.onError(err.response.data.message);
                }
            });
        },
        setPlannedFiltersChecked: async (data: any) => {
            dispatch.plannedActivities.plannedFiltersChecked(data.plannedFiltersChecked)
        },
        setAvailablePlannedChips: async (data: any) => {
            dispatch.plannedActivities.availablePlannedChips(data.availableChips)
        },
        setPlannedChips: async (data: any) => {
            try {
                let result
                if (Object.keys(data.availableChips).length !== 0) {
                    result = Object.keys(data.availableChips).map((key) => ({ label: `${key}: ${data.availableChips[key]}` }));
                }
                else {
                    result = []
                }
                dispatch.planned.plannedChips(result)
            } catch (e) {
                console.log(e)
            }
        },
        setPlannedFilters: async (data: any) => {
            dispatch.plannedActivities.plannedFilters(data.plannedFilters)
        },
        filterPlannedActivities: async (data: any) => {
            await getRequest(`planned-activity/filter?${data.data}`)
                .then((res) => {
                    dispatch.plannedActivities.plannedActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
    })
});

export default plannedActivities;
