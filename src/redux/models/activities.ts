import api from '../api';
import { createModel } from '@rematch/core'
import { activityStatuses, listOfActivityType, measurementStatuses, plotStatuses, plannedStatuses, plannedTypes, zoneTypes, zoneSubTypes, treeHealth } from '../../constants';

const { getRequest, patchRequest, createRequest } = api;
interface errorType {
    response: {
        data: {
            message: ""
        }
    };
}

const initialState = {
    activities: [],
    activityTypes: [],
    activityLabels: [],
    listOfLabels: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
    availableChips: {},
    activityChips: [],
    activityFilters: {},
    activityFiltersChecked: {},
    activityFilterOptionData: {
        organizations: [],
        projects: [],
        plotStatus: plotStatuses,
        activityStatus: activityStatuses,
        label: [],
        activityType: listOfActivityType,
        measurementStatus: measurementStatuses,
        measurementType: "",
        plannedStatus: plannedStatuses,
        plannedType: plannedTypes,
        zoneTypes: zoneTypes,
        zoneSubTypes: zoneSubTypes,
        treeHealth: treeHealth,
        treeSpecies: [],
    },
    activitySummary: {},
    activitiesAggregateData: [],
    activityAggregateData: {},
    measurement: [],
    landSurveyGeoCoordinates: [],
    landSurveyGeoCoordinatesLoading: false,
    exportTreeSurveyData:[],
    activitiesIds: [],
    currentFilterURL: ''
}

const activities = createModel<any>()({
    state: {...initialState},
    reducers: {
        resetActivitiesState() {
            return {...initialState}
        },
        requestGetActivities(state: any, data: any) {
            return {
                ...state,
                activities: data.data.rows,
                totalPages: data.data.totalPages,
                currentPage: data.data.currentPage,
                totalItems: data.data.totalItems,
                currentFilterURL: data.config.url
            }
        },
        requestGetActivity(state: any, data: any) {
            return {
                ...state,
                activity: data
            }
        },
        requestGetDeviceInfo(state: any, data: any) {
            return {
                ...state,
                deviceInfo: data
            }
        },
        activityMeasurement(state: any, data: any) {
            return {
                ...state,
                measurement: data.rows
            }
        },
        activityTypes(state: any, data: any) {
            return {
                ...state,
                activityTypes: data
            }
        },
        activityLabels(state: any, data: any) {
            return {
                ...state,
                activityLabels: data
            }
        },
        listOfLabels(state: any, data: any) {
            return {
                ...state,
                listOfLabels: data
            }
        },
        availableChips(state: any, data: any) {
            return {
                ...state,
                availableChips: data,
            }
        },
        activityChips(state: any, data: any) {
            return {
                ...state,
                activityChips: data,
            }
        },
        activityFilters(state: any, data: any) {
            return {
                ...state,
                activityFilters: data
            }
        },
        activityFiltersChecked(state: any, data: any) {
            return {
                ...state,
                activityFiltersChecked: data
            }
        },
        activityFilterOptionData(state: any, data: any) {
            return {
                ...state,
                activityFilterOptionData: data
            }
        },
        activitySummary(state: any, data: any) {
            return {
                ...state,
                activitySummary: data
            }
        },
        activitiesAggregateData(state: any, data: any) {
            return {
                ...state,
                activitiesAggregateData: data
            }
        },
        activityAggregateData(state: any, data: any) {
            return {
                ...state,
                activityAggregateData: data
            }
        },
        landSurveyGeoCoordinates(state: any, data: any) {
            return {
                ...state,
                landSurveyGeoCoordinates: data.rows
            }
        },
        landSurveyGeoCoordinatesLoading(state: any, data: any){
            return {
                ...state,
                landSurveyGeoCoordinatesLoading: data
            }
        },
        exportTreeSurveyData(state: any, data: any) {
            return {
                ...state,
                exportTreeSurveyData: data
            }
        },

        getActivitiesIds(state: any, data: any) {
            return {
                ...state,
                activitiesIds: data.rows,
            }
        },

        treeSpeciesOnGetMeasurement(state: any, data: any) {
            return {
                ...state,
                activityFilterOptionData: {
                    ...state.activityFilterOptionData,
                    treeSpecies: data.species,
                },
            };
        }        
    },
    effects: (dispatch) => ({
        getActivities: async (data: any) => {

            await getRequest(`v2/activities?page=${data.page}&sort=${data.sort}`)
                .then((res) => {
                    dispatch.activities.requestGetActivities(res);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getSingleActivity: async (data: any) => {
            dispatch.activities.requestGetActivity({});
            await getRequest(`activities/${data.activityId}`)
                .then((res) => {
                    dispatch.activities.requestGetActivity(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    data.onError && data.onError(err);
                });
        },
        getDeviceInfo: async (data: any) => {
            await getRequest(`device-info/${data.deviceId}`)
                .then((res) => {
                    dispatch.activities.requestGetDeviceInfo(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getActivityTypes: async (data: any) => {
            let queryParams = data.queryParams ? data.queryParams : ""
            await getRequest(`activitytemplate${queryParams}`)
                .then((res) => {
                    dispatch.activities.activityTypes(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getActivityLabels: async (data: any) => {
            await getRequest(`activities/list/labels`)
                .then((res) => {
                    dispatch.activities.activityLabels(res.data.labels);
                    data.onSuccess && data.onSuccess(res.data.labels);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        filterActivities: async (data: any) => {
            await getRequest(`activities/all/filter?${data.data}`)
                .then((res) => {
                    dispatch.activities.requestGetActivities(res);
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
            
            // // get only ids 
            // const removePage = data.data.split('&').filter(item => !item.includes('page')).join('&');
            // await getRequest(`activities/all/filter?${removePage}`)
            //     .then((res) => {
            //         dispatch.activities.getActivitiesIds(res.data);
            //     })
            //     .catch(() => {
            //         //
            //     });
        },
        updateActivity: async (data: any) => {
            let finalData: any = { ...data.activity }
            await patchRequest(`activities/${data.activityId}`, finalData)
                .then((res) => {
                    dispatch.activities.requestGetActivity(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },

        getListOfLabels: async (data: any) => {
            await getRequest(`activities/list/labels`)
                .then((res) => {
                    dispatch.activities.listOfLabels(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },

        filterActivityMeasurement: async (data: any) => {
            await getRequest(`measurements/activity/${data.activityId}/filter?${data.data}&show_ignored_measurements=${data.includeIgnored}`)
                .then((res) => {
                    dispatch.activities.activityMeasurement(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                        dispatch.activities.activityMeasurement({rows: []});
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getActivitiesByPlotId: async (data: any) => {
            await getRequest(`activities/plot/${data.plotId}`)
                .then((res) => {
                    dispatch.activities.requestGetActivities(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                }).catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        setAvailableChips: async (data: any) => {
            dispatch.activities.availableChips(data.availableChips)
        },
        setActivityChips: async (data: any) => {
            try {
                let result;
                if (Object.keys(data.availableChips).length !== 0) {
                    result = Object.keys(data.availableChips).map((key) => ({ label: `${key}: ${data.availableChips[key]}` }));
                }
                else {
                    result = []
                }
                dispatch.activities.activityChips(result)
                dispatch.activities.availableChips(data.availableChips)
            } catch (e) {
                console.log(e)
            }
        },
        setActivityFilters: async (data: any) => {
            dispatch.activities.activityFilters(data.activityFilters)
        },
        setActivityFiltersChecked: async (data: any) => {
            dispatch.activities.activityFiltersChecked(data.activityFiltersChecked)
        },
        setActivityFilterOptionData: async (data: any) => {
            dispatch.activities.activityFilterOptionData(data.activityFilterOptionData)
        },
        setActivitySummary: async (data: any) => {
            dispatch.activities.activitySummary(data.activitySummary)
        },
        getActivitiesAggregateData: async (data: any) => {
            await createRequest(`summary/activities`, data.data)
                .then((res) => {
                    dispatch.activities.activitiesAggregateData(res.data.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        }, 
        getActivityAggregateData: async (data: any) => {
            await createRequest(`summary/activities`, data.data)
                .then((res) => {
                    dispatch.activities.activityAggregateData(res.data.data[0]);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getLandSurveyGeoCoordinates: async (data: any) => {
            await getRequest(`measurements/activity/${data.activityID}`)
                .then((res) => {
                    dispatch.activities.landSurveyGeoCoordinates(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        }, 
        setLandSurveyGeoCoordinatesLoading: async (data: any) => {
            dispatch.activities.landSurveyGeoCoordinatesLoading(data.state);
        },
        exportTreeSurveyActivities: async (data: any) => {
            await createRequest(`activities/export-tree-survey-activities`, data)
            .then((res) => {
                dispatch.activities.exportTreeSurveyData(res.data);
                data.onSuccess && data.onSuccess(res.data);
            })
            .catch((err: errorType) => {
                if (err.response && err.response.data) {
                    data.onError && data.onError(err.response.data.message);
                }
            });
        }, 
        getActivitiesExportIds: async (data: any, _store: any) => {
            if(_store.table2.selectedIds.length !== 0) {
                // dispatch.activities.getActivitiesIds({rows:  _store.table2.selectedIds.map(item => {id: item})});
                data.onSuccess && data.onSuccess(_store.table2.selectedIds);
            }
            else{
                const removePageAndUrl = (url) =>  {
                const urlObject = new URL(url);
                urlObject.searchParams.delete('page');
                return urlObject.search;
            }
            //TODO: seperate plot activities from main activities
            const searchParams = data.plotPage?  `?plotId=${data.plotId}`: removePageAndUrl(_store.activities.currentFilterURL);
            await getRequest(`activities/all/filter${searchParams}`)
                .then((res) => {
                    dispatch.activities.getActivitiesIds(res.data);
                    data.onSuccess && data.onSuccess(res.data.rows.map(item => item.id).filter(item2 => !_store.table2.notIn.includes(item2)));
                })
                .catch((e) => {
                     data.onError && data.onError(e);
                    //
                });
            }
        },

        getTreeSpeciesOnGetMeasurement: async (data: any) => {
            await getRequest(`measurements/tree-species/${data.id}`)
                .then((res) => {
                    dispatch.activities.treeSpeciesOnGetMeasurement(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        }        
    }),
});

export default activities;
