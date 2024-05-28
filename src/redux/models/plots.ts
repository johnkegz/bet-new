import api from '../api';
import { createModel } from '@rematch/core'

const { gql, getRequest, createRequest, patchRequest, updateRequest } = api;

const initialCheckedLayer = {
    polygonLabel: false,
    polygonColor: false,
    polygonBorderColor: false,
    showLegend: false,
};

type InitialCheckedLayer = {
    polygonLabel: boolean;
    polygonColor: boolean;
    polygonBorderColor: boolean;
    showLegend: boolean;
}

interface VisibleMapSection {
    lat: number;
    lng: number;
    distance: number;
}

interface stateType {
    plots: Array<{}>;
    plot: {};
    error: {};
    plotProject: {};
    isFiltering: boolean;
    listOfLabels: Array<{}>;
    availablePlotChips: {};
    plotChips: Array<{}>;
    nearByPlots:  Array<{}>;
    layerType: string;
    pickerPlots: Array<{}>;
    plotFilters: {};
    plotFiltersChecked: {};
    activities: Array<{}>;
    totalPages: number;
    currentPage: number;
    totalItems: number;
    plotActivitiesAggregateData: Array<{}>;
    showTiles: boolean;
    tableData: Array<{}>;
    plotsTotalPages: number;
    plotsCurrentPage: number;
    mapPlotData: Array<{}>;
    mapCluseteredPlot: Array<{}>;
    visibleMapSection: VisibleMapSection;
    plotSummary: {};
    plotSummaryError: {};
    allPlotsIds: String[];
    mapSelectedPlotData: Array<{}>;
    mapSelectedCluseteredPlot: Array<{}>;
    plotsToUpate: {},
    plotsUpatedSuccessfully: Array<{}>;
    plotsUpateErrors: {};
    plotsUpated: boolean;
    isUpdating: boolean;
    currentFilterData: {};
    polygonColors: {};
    polygonBorderColors: {};
    polygonLabelColors: {};
    highlighted: boolean;
    changePolygonColors: {
        changePolygonColors: boolean; 
        column: string; 
        currentColumn:string;
        checkedLayer: InitialCheckedLayer
    };
    plotActivities: {}
    plotActivitiesMeasurements: {},
    plotActivitiesMeasurementSummary: {},
    totalPlotActivities: number;
    //Plot activities filters
    availablePlotActivitiesChips: {};
    plotActivitiesFilters: {};
    plotActivitiesFiltersChecked: {};
}

interface errorType {
    message: string;
    statusCode: number;
    response: {
        data: {
            message: "";
            statusCode?: any;
        }
    };
}

const initialState = {
    plots: [],
    plot: {},
    error: {},
    plotProject: {},
    isFiltering: false,
    listOfLabels: [],
    availablePlotChips: {},
    plotChips: [],
    nearByPlots: [],
    layerType: "mapbox://styles/mapbox/light-v10",
    pickerPlots: [],
    plotFilters: {},
    plotFiltersChecked: {},
    activities: [],
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    plotActivitiesAggregateData: [],
    showTiles: false,
    tableData: [],
    mapPlotData: [],
    plotsTotalPages: 0,
    plotsCurrentPage: 1,
    mapCluseteredPlot: [],
    visibleMapSection: {
        lat: 0,
        lng: 0,
        distance: 0,
    },
    plotSummary: {},
    plotSummaryError: {},
    allPlotsIds: [],
    mapSelectedPlotData: [],
    mapSelectedCluseteredPlot: [],
    plotsToUpate: {},
    plotsUpatedSuccessfully: [],
    plotsUpateErrors: {},
    plotsUpated: false,
    isUpdating: false,
    currentFilterData: {},
    polygonColors: {},
    polygonBorderColors: {},
    polygonLabelColors: {},
    highlighted: false,
    changePolygonColors: {changePolygonColors: false, column: '', currentColumn: '', checkedLayer: initialCheckedLayer},
    plotActivities: {},
    plotActivitiesMeasurements:{},
    plotActivitiesMeasurementSummary: {},
    totalPlotActivities: 0,
    //Plot activities filters
    availablePlotActivitiesChips: {},
    plotActivitiesFilters: {},
    plotActivitiesFiltersChecked: {},
}

const plots = createModel<any>()({
    state: {...initialState},
    reducers: {
        resetPlotsState() {
            return {...initialState}
        },
        gotPlots(state: stateType, payload: any) {
            return {
                ...state,
                plots: payload.rows,
                // plot: state.plot,
                plotsTotalPages: payload.totalPages || 0,
                plotsCurrentPage: payload.currentPage || 1,
                totalItems: payload.totalItems
            };
        },
        currentFilterData(state: stateType, payload: any) {
            return {
                ...state,
                currentFilterData: payload
            };
        },
        singlePlot(state: stateType, payload: any) {
            return {
                ...state,
                plots: state.plots,
                plot: payload
            };
        },
        errors(state: stateType, payload: Array<{}>) {
            return {
                ...state,
                plots: state.plots,
                plot: state.plot,
                error: payload
            };
        },

        plotProject(state: stateType, payload: any) {
            return {
                ...state,
                plots: state.plots,
                plot: state.plot,
                plotProject: payload
            };
        },
        setIsFiltering(state: stateType, payload: any){
            return {
                ...state,
                plots: state.plots,
                plot: state.plot,
                isFiltering: payload,
            };
        },
        listOfLabels(state: stateType, payload: any) {
            return {
                ...state,
                plots: state.plots,
                plot: state.plot,
                listOfLabels: payload
            };
        },
        availablePlotChips(state: any, data: any) {
            return {
                ...state,
                availablePlotChips: data,
            }
        },
        plotChips(state: any, data: any) {
            return {
                ...state,
                plotChips: data,
            }
        },
        plotFilters(state: any, data: any) {
            return {
                ...state,
                plotFilters: data
            }
        },
        plotFiltersChecked(state: any, data: any) {
            return {
                ...state,
                plotFiltersChecked: data
            }
        },
        nearByPlots(state: any, data: any){
            return {
                ...state,
                nearByPlots: data,
            }
        },
        layerType(state: any, data: any) {
            return {
                ...state,
                layerType: data,
            }
        },
        pickerPlots(state: any, payload: any) {
            return {
                ...state,
                pickerPlots: payload
            };
        },
        plotActivities(state: any, payload: any) {
            return {
                ...state,
                activities: payload.rows,
                activitiesTotalPages: payload.totalPages,
            };
        },
        plotActivitiesAggregateData(state: any, data: any) {
            return {
                ...state,
                plotActivitiesAggregateData: data
            }
        },
        showTiles(state: any, data: any) {
            return {
                ...state,
                showTiles: data,
            }
        },
        tableData(state: any, data: any) {
            return {
                ...state,
                tableData: data
            }
        },
        mapPlotData(state: any, data: any) {
            return {
                ...state,
                mapPlotData: data
            }
        },
        mapCluseteredPlot(state: any, data: any){
            return {
                ...state,
                mapCluseteredPlot: data
            }
        },
        visibleMapSection(state: any, data: any){
            return {
                ...state,
                visibleMapSection: data
            }
        },
        plotSummary(state: any, data: any){
            return {
                ...state,
                plotSummary: data
            }
        },
        plotSummaryError(state: any, data: any){
            return {
                ...state,
                plotSummaryError: data
            }
        },
        setIsGettingClustered(state: any, data: any){
            return {
                ...state,
                isGettingClustered: data
            }
        },
        allPlotsIds(state: any, data: any) {
            return {
                ...state,
                allPlotsIds: data
            }
        },
        mapSelectedPlotData(state: any, data: any) {
            return {
                ...state,
                mapSelectedPlotData: data
            }
        },
        mapSelectedCluseteredPlot(state: any, data: any){
            return {
                ...state,
                mapSelectedCluseteredPlot: data
            }
        },
        plotsToUpate(state: any, data: any){
            return {
                ...state,
                plotsToUpate: data
            }
        },
        plotsUpatedSuccessfully(state: any, data: any){
            return {
                ...state,
                plotsUpatedSuccessfully: data
            }
        },
        plotsUpateErrors(state: any, data: any){
            return {
                ...state,
                plotsUpateErrors: data
            }
        },
        plotsUpated(state: any, data: any){
            return {
                ...state,
                plotsUpated: data
            }
        },
        isUpdating(state: any, data: any){
            return {
                ...state,
                isUpdating: data
            }
        },
        polygonColors(state: any, data: any){
            return {
                ...state,
                polygonColors: data
            }
        },
        changePolygonColors(state: any, data: any){
            return {
                ...state,
                changePolygonColors: data
            }
        },
        polygonBorderColors(state: any, data: any){
            return {
                ...state,
                polygonBorderColors: data
            }
        },
        polygonLabelColors(state: any, data: any){
            return {
                ...state,
                polygonLabelColors: data
            }
        },
        highlighted(state: any, data: any){
            return {
                ...state,
                highlighted: data
            }
        },
        plotActivitiesMeasurements(state: any, data: any){
            return {
                ...state,
                plotActivitiesMeasurements: data
            }
        },
        plotActivitiesMeasurementSummary(state: any, data: any){
            return {
                ...state,
                plotActivitiesMeasurementSummary: data
            }
        },
        totalPlotActivities(state: any, data: any){
            return {
                ...state,
                totalPlotActivities: data
            }
        },
        activitiesCurrentPage(state: any, data: any){
            return {
                ...state,
                activitiesCurrentPage: data
            }
        },
         /* Plot activities filters */
        availablePlotActivitiesChips(state: any, data: any) {
            return {
                ...state,
                availablePlotActivitiesChips: data,
            }
        },
        plotActivitiesChips(state: any, data: any) {
            return {
                ...state,
                plotActivitiesChips: data,
            }
        },
        plotActivitiesFilters(state: any, data: any) {
            return {
                ...state,
                plotActivitiesFilters: data
            }
        },
        plotActivitiesFiltersChecked(state: any, data: any) {
            return {
                ...state,
                plotActivitiesFiltersChecked: data
            }
        },
        /*End Plot activities filters */
    },
    effects: (dispatch) => ({
            //gql
            getAllPlots: async (data: any) => {
                await gql('graphql', data.query)
                    .then((res) => {
                        let result = res.data.data.getAllPlots.map(item => {
                            return item
                        })
                        data.onSuccess && data.onSuccess(result);
                    })
                    .catch((err: errorType) => {
                        if (err && err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });

            },
            getPlotsRestApi: async (data: any) => {
                await getRequest(`plots/all/available?lat=${data.lat}&lng=${data.lng}&distance=${data.distance}`)
                    .then((res) => {
                        let newData = res.data.rows
                        const index = newData.findIndex(obj => obj.id === +data.plotId);
                        if (index !== -1) {
                            newData.splice(index, 1);
                        }

                        dispatch.plots.nearByPlots(newData);
                        data.onSuccess && data.onSuccess(newData);
                    })
                    .catch((err: errorType) => {
                        if (err.response && err.response.data && err.response.data.statusCode === 401) {
                            dispatch.plots.nearByPlots([]);
                        }
                        if (err && err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                        if (err.message && err.message !== null) {
                            data.onError && data.onError(err.message);
                        }
                    });
            },
            filterPlots: async (data: any, store: any) => {
                if(data.data.projectId) {
                    dispatch.zones.getZones({ids: data.data.projectId});}
                else{
                    const projectIds = store.activities?.activityFilterOptionData?.projects
                    dispatch.zones.getZones({ids: projectIds.map(project => project.id).join(',')});
                }
                dispatch.zones.showGoNoGoZones(false);
                dispatch.plots.setIsFiltering(true);
                dispatch.plots.mapPlotData([]);
                dispatch.plots.mapCluseteredPlot([]);
                dispatch.plots.plotSummary({});
                dispatch.plots.plotSummaryError({});
                await createRequest(`plots/filter?page=${data.page}`, data.data)
                    .then((res) => {
                        dispatch.plots.gotPlots(res.data);
                        dispatch.plots.currentFilterData(data.data);
                        data.onSuccess && data.onSuccess(res.data.rows);
                        if (store.plots.tableData.length === 0) dispatch.plots.tableData(res.data.rows);
                        dispatch.plots.setIsFiltering(false);
                    })
                    .catch((err: errorType) => {
                        if (err?.response?.data && err?.response?.data.statusCode === 401) {
                            //TODO: 
                            dispatch.plots.gotPlots({ rows: [] });
                        }
                        if (err && err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                        dispatch.plots.setIsFiltering(false);
                    });

                // await createRequest(`plots/filter`, data.data)
                //     .then((res) => {
                //         dispatch.plots.allPlotsIds(res.data.rows);
                //         dispatch.plots.setIsFiltering(false);
                //     })
                //     .catch((err: errorType) => {
                //         data.onError && data.onError(err);
                //         dispatch.plots.setIsFiltering(false);
                //     });

            },
            filterClusteredPlots: async (data: any) => {
                //Map plots data clustered
                dispatch.plots.plotSummaryError({});
                dispatch.plots.setIsGettingClustered(true);
                await createRequest(`plots/filter/clustered?${data.plotFilterData}`, {selectedPlotIds: null})
                    .then((res) => {
                        if(data.plotFilterData.includes('getClustered=false')){
                            // Map plots data
                            dispatch.plots.mapPlotData([...res.data]);
                            dispatch.plots.mapCluseteredPlot([]);
                        }else{
                            dispatch.plots.mapPlotData([]);
                            dispatch.plots.mapCluseteredPlot([...res.data]);
                        }
                        dispatch.plots.setIsGettingClustered(false);
                        data.onSuccess && data.onSuccess(res);
                    })
                    .catch((err: errorType) => {
                        if (err?.response?.data && err?.response?.data?.statusCode === 401) {
                            // 
                        }
                        if (err && err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                        dispatch.plots.setIsGettingClustered(false);
                        data.onError && data.onError(err);
                        // dispatch.plots.setIsFiltering(false);
                    });
            },
            getSinglePlot: async (data: any) => {
                dispatch.plots.singlePlot({});
                dispatch.plots.plotSummary({});
                dispatch.plots.plotSummaryError({});
                await getRequest(`plots/${data.id}`)
                    .then((res) => {
                        dispatch.plots.singlePlot(res.data);
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: errorType) => {
                        dispatch.plots.singlePlot({});
                        dispatch.plots.plotSummary({});
                        data.onError && data.onError(err);
                    });
            },
            editPlot: async (data: any) => {
                await patchRequest(`plots/v2/${data.id}`, data.data)
                    .then((res) => {
                        dispatch.plots.singlePlot(res.data.data[0]);
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: any) => {
                        data.onError && data.onError(err);
                    });
            },
            createPlotProject: async (data: any) => {
                await createRequest(`plot-projects/create`, data.data)
                    .then((res) => {
                        dispatch.plots.plotProject(res.data);
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: errorType) => {
                        data.onError && data.onError(err);
                    });
            },
            updatePlotProject: async (data: any) => {
                await updateRequest(`plot-projects/update/${data.id}`, data.data)
                    .then((res) => {
                        dispatch.plots.plotProject(res.data.data[0]);
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: errorType) => {
                        data.onError && data.onError(err);
                    });
            },
            getPlotLabels: async (data: any) => {
                await getRequest(`plots/labels`)
                    .then((res) => {
                        dispatch.plots.listOfLabels(res.data.labels);
                        data.onSuccess && data.onSuccess(res.data.labels);
                    })
                    .catch((err: errorType) => {
                        if (err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });
            },
            getPlotsDetails: async (data: any) => {
                await getRequest(`plots/details?ids=${data.ids}`)
                    .then((res) => {
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: errorType) => {
                        if (err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });
            },
            setAvailablePlotChips: async (data: any) => {
                dispatch.plots.availablePlotChips(data.availableChips);
            },
            setPlotChips: async (data: any) => {
                try {
                    let result;
                    if (Object.keys(data.availableChips).length !== 0) {
                        result = Object.keys(data.availableChips).map((key) => ({ label: `${key}: ${data.availableChips[key]}` }));
                    }
                    else {
                        result = [];
                    }
                    dispatch.plots.plotChips(result);
                } catch (e) {
                    console.log(e);
                }
            },
            setPlotFilters: async (data: any) => {
                dispatch.plots.plotFilters(data.plotFilters);
            },
            setPlotFiltersChecked: async (data: any) => {
                dispatch.plots.plotFiltersChecked(data.plotFiltersChecked);
            },
            setLayerType: async (data: any) => {
                dispatch.plots.layerType(data.layerType);
            },
            plotPicker: async (data: any) => {
                await getRequest(`plots/picker/plots?${data.data}`)
                    .then((res) => {
                        dispatch.plots.pickerPlots(res.data.rows);
                    })
                    .catch((err: errorType) => {
                        if (err && err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });
            },
            getPlotActivities: async (data: any) => {
                await getRequest(`activities/all/filter?${data.data}`)
                    .then((res) => {
                        dispatch.plots.plotActivities(res.data);
                        dispatch.plots.plotActivitiesMeasurements({});
                        dispatch.table2.resetTable2();
                        dispatch.plots.totalPlotActivities(res.data.totalItems) 
                        dispatch.plots.activitiesCurrentPage(res.data.currentPage) 
                        data.onSuccess && data.onSuccess(res.data.rows);
                    })
                    .catch((err: errorType) => {
                        if (err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });
            },
            getPlotActivitiesAggregateData: async (data: any) => {
                await createRequest(`summary/activities`, data.data)
                    .then((res) => {
                        dispatch.plots.plotActivitiesAggregateData(res.data.data);
                        data.onSuccess && data.onSuccess(res.data);
                    })
                    .catch((err: errorType) => {
                        if (err.response && err.response.data) {
                            data.onError && data.onError(err.response.data.message);
                        }
                    });
            },
            reFreshPlot: () => {
                dispatch.plots.singlePlot({});
            },
            setShowTiles: async (data: any) => {
                dispatch.plots.showTiles(data.showTiles);
            },
            setLinkWithTableData: async (data: any) => {
                dispatch.plots.tableData(data.tableData);
            },
            setVisibleMapSection: async (data: any) => {
                dispatch.plots.visibleMapSection(data.visibleMapSection)
            },
            setPlotSummary: async (data: any) => {
                dispatch.plots.plotSummary({});
                dispatch.plots.plotSummaryError({});
                await getRequest(`plots/${data.plotId}`)
                    .then((res) => {
                        dispatch.plots.plotSummary(res.data);
                        data.onSuccess && data.onSuccess();
                    })
                    .catch((err: errorType) => {
                        dispatch.plots.plotSummary({});
                        dispatch.plots.plotSummaryError(err);
                        data.onError && data.onError(err);
                    });
            },
            restPlotSummary: async () => {
                dispatch.plots.plotSummary({});
            },
            setfilterBySelectedIds: async (data: any) => {
                dispatch.plots.plotSummaryError({});
                dispatch.plots.setIsGettingClustered(true);
                await createRequest(`plots/filter/clustered?${data.plotFilterData}`, {selectedPlotIds: data.ids})
                .then((res) => {
                    if(data.plotFilterData.includes('getClustered=false')){
                        dispatch.plots.mapSelectedPlotData([...res.data]);
                        dispatch.plots.mapSelectedCluseteredPlot([]);
                    }else{
                        dispatch.plots.mapSelectedPlotData([]);
                        dispatch.plots.mapSelectedCluseteredPlot([...res.data]);
                    }
                    dispatch.plots.setIsGettingClustered(false);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                    dispatch.plots.setIsGettingClustered(false);
                });
            },
            setPlotsToUpate: async (data: any) => {
                dispatch.plots.plotsToUpate(data.plotsToUpate);
            },
            updatePlots: async (data: any, _store: any) => {
            dispatch.plots.isUpdating(true)
            const res = [];
            const errors = [];
            if (_store.plots.plotsToUpate.features) {
                const promiseArray = _store.plots.plotsToUpate.features.map(async (feature) => {
                try {
                    const updatedPlot: any = await patchRequest(`plots/v2/${feature.properties.plotID}`, {
                    polygon: feature?.geometry?.coordinates,
                    });
                    updatedPlot.feature = feature
                    res.push(updatedPlot);
                } catch (e) {
                    e.feature = feature
                    errors.push(e);
                }
                });

                await Promise.all(promiseArray);
            }
                dispatch.plots.plotsUpatedSuccessfully(res);
                dispatch.plots.plotsUpated(true);
                const groupErrors = (errors) => {
                    let groupedError = {};
                    errors.map(error => {
                        let newError = []
                        if(error?.response) {
                            newError = [...groupedError[error?.response?.statusText]?groupedError[error?.response?.statusText]: []]
                        }
                        newError.push(error);
                        groupedError = {...groupedError, [error.response.statusText]: newError}
                    })
                    return groupedError;
                }
                groupErrors(errors);
                dispatch.plots.plotsUpateErrors(groupErrors(errors));
                dispatch.plots.isUpdating(false)
            },
            resetUpdatePlots: async () => {
                dispatch.plots.plotsToUpate({});
                dispatch.plots.plotsUpatedSuccessfully([]);
                dispatch.plots.plotsUpated(false);
                dispatch.plots.plotsUpateErrors({});
            },

            //
            getPlotsExportIds: async (data: any, _store: any) => {
            if(_store.table2.selectedIds.length !== 0) {
                data.onSuccess && data.onSuccess(_store.table2.selectedIds);
            }
            else{
            
            await createRequest(`plots/filter`, _store.plots.currentFilterData)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data.rows.map(item => item.id).filter(item2 => !_store.table2.notIn.includes(item2.toString())));
                })
                .catch((err: errorType) => {
                    data.onError && data.onError(err);
                });
            }
        },

        createShapeFile: async (data: any) => {
            const plotIds = {
                "plotIds": data.ids
            }
              
            await createRequest(`plots/export-shapefiles`, plotIds)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    data.onError && data.onError(err);
                });
        },
        getPlotActivitiesMeasurement: async (data: any, _store: any) => {
            let result = {..._store.plots.plotActivitiesMeasurements}

            for (let i = 0; i < data.ids.length; i++) {
                const activityId = data.ids[i];
                //TODO: Queries will be used for filtering
                const queries = ''
                const includeIgnored = true;
                // await getRequest(`measurements/activity/${activityId}/filter?${queries}&show_ignored_measurements=${includeIgnored}`)
                await getRequest(`activities/${activityId}`)
                // await getRequest(`measurements/activity/${data.activityId}/filter?${data.data}&show_ignored_measurements=${data.includeIgnored}`)
                .then((res) => {
                    result = {...result, [activityId]: res.data}
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
                
            }
            dispatch.plots.plotActivitiesMeasurements(result);        
        },
        })
});

export default plots;
