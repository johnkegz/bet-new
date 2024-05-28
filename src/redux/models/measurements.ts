import { measurementStatuses } from '../../constants';
import api from '../api';
import { createModel } from '@rematch/core'

const { patchRequest, getRequest } = api;
interface errorType {
    response: {
        data: {
            message: ""
        }
    };
}

const measurements = createModel<any>()({
    state: {
        measurementSummary: {},
        nearByPlots: [],
        activeViewContent: 'measurement',
        nearByplot: {},
        availableChips: {},
        activityChips: [],
        activityFilters: {},
        activityFiltersChecked: {},
    },
    reducers: {
        activityMeasurement(state: any, data: any) {
            return {
                ...state,
            measurement: data
            }
        },
        measurementSummary(state: any, data: any) {
            return {
                ...state,
                measurementSummary: data
            }
        },
        plotOnMeasurement(state: any, payload: any) {
            return {
                ...state,
                plot: payload
            };
        },
        nearByPlots(state: any, data: any){
            return {
                ...state,
                nearByPlots: data,
            }
        },
        activeViewContent(state: any, data: any) {
            return {
                ...state,
                activeViewContent: data,
            }
        },
        nearByplot(state: any, data: any) {
            return {
                ...state,
                nearByplot: data,
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
    },
    effects: (dispatch) => ({
        updateMeasurement: async (data: any, store: any) => {
            await patchRequest(`measurements/${data.measurementID}`, data.data)
                .then((res) => {
                    dispatch.measurements.activityMeasurement(res.data);
                    let currentTeasurementData = store.activities.measurement;
                    const measurementIndex = currentTeasurementData.findIndex(obj => obj.id == data.measurementID);
                    currentTeasurementData[measurementIndex].status = res.data.data[0].status;
                    currentTeasurementData[measurementIndex].additionalData = res.data.data[0].additionalData;
                    dispatch.activities.activityMeasurement({rows:currentTeasurementData});
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getActivityTypes: async (data: any) => {
            await getRequest(`measurements/measurements_types/activity/${data.id}`)
                .then((res) => {
                    // dispatch.measurements.activityMeasurement(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getActivityMeasurementsAggregateData: async (data: any) => {
            await getRequest(`measurements/activity/${data.activityId}/summary`)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getMeasurement: async (data: any) => {
            await getRequest(`measurements/${data.id}`)
                .then((res) => {
                    dispatch.measurements.activityMeasurement(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        measurementBatchStatusUpdate: async (data: any) => {
            await patchRequest(`measurements/v2/batch-status-update`, data)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        setMeasurementSummary: async (data: any) => {
            dispatch.measurements.measurementSummary(data.measurementSummary)
        },
        getPlotOnMeasurements: async (data: any) => {
            dispatch.measurements.plotOnMeasurement({});
            await getRequest(`plots/${data.id}`)
                .then((res) => {
                    dispatch.measurements.plotOnMeasurement(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    data.onError && data.onError(err);
                });
        },
        getNearByPlots: async (data: any) => {
            dispatch.measurements.nearByPlots([]);
            await getRequest(`plots/all/available?lat=${data.lat}&lng=${data.lng}&distance=${data.distance}`)
                .then((res) => {
                    let newData = res.data.rows
                    const index = newData.findIndex(obj => obj.id === data.plotId);
                    if (index !== -1) {
                        newData.splice(index, 1);
                    }
                    dispatch.measurements.nearByPlots(newData);
                    data.onSuccess && data.onSuccess(newData);
                })
                .catch((err: errorType) => {
                    dispatch.measurements.nearByPlots([]);
                    data.onError && data.onError(err);
                });
        },
        setActiveViewContent: async (data: any) => {
            dispatch.measurements.activeViewContent(data.content);
        },
        setNearByplot: async (data: any) => {
            dispatch.plots.setPlotSummary({ plotId: data.plot.id });
        },
        setAvailableChips: async (data: any) => {
            dispatch.measurements.availableChips(data.availableChips)
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
                dispatch.measurements.activityChips(result)
                dispatch.measurements.availableChips(data.availableChips)
            } catch (e) {
                console.log(e)
            }
        },
        setActivityFilters: async (data: any) => {
            dispatch.measurements.activityFilters(data.activityFilters)
        },
        setActivityFiltersChecked: async (data: any) => {
            dispatch.measurements.activityFiltersChecked(data.activityFiltersChecked)
        }, 
        setIncludeIgnored: async (data: any, store: any) => {
            const newActivityFilterOptionData = {...store.activities.activityFilterOptionData, measurementStatus: !data.includeIgnored? measurementStatuses: [...measurementStatuses, {
                id: 'ignored',
                name: 'ignored',
            }] }
            dispatch.activities.activityFilterOptionData(newActivityFilterOptionData)
        },
        updateTreeSpecies: async (data: any, store: any) => {
            await patchRequest(`measurements/tree-species/${data.measurementID}`, data.data)
                .then((res) => {
                    dispatch.measurements.activityMeasurement(res.data);
                    let currentTeasurementData = store.activities.measurement;
                    const measurementIndex = currentTeasurementData.findIndex(obj => obj.id == data.measurementID);
                    currentTeasurementData[measurementIndex].status = res.data.data[0].status;
                    currentTeasurementData[measurementIndex].additionalData = res.data.data[0].additionalData;
                    dispatch.activities.activityMeasurement({rows:currentTeasurementData});
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },  
    }),
});

export default measurements;
