import { zoneFeatureCollections } from '../../utilites/zones';
import api from '../api';
import { createModel } from '@rematch/core';

const { getRequest, createRequest } = api;

interface stateType {
    showGoNoGoZones: boolean;
    zones: Array<{}>;
    zonesForOneProject: Array<{}>;
    zoneIds: string[];
    zoneForOneProjectIds: string[];
    //TODO: put the right type
    zonesToUpload: {};
    zonesCreated: boolean;
    creatingZones:boolean;
    zonesImportErrors: string;
    zonesCreatedSuccessfully: Array<{}>;
    zonesCreateUnSuccessfully: {};
}

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
    showGoNoGoZones: false,
    zones: [],
    zonesForOneProject: [],
    zoneIds: [],
    zoneForOneProjectIds: [],
    zonesToUpload: {},
    zonesCreated: false,
    creatingZones: false,
    zonesImportErrors: '',
    zonesCreatedSuccessfully: [],
    zonesCreateUnSuccessfully: {},
};

const zones = createModel<any>()({
    state: { ...initialState },
    reducers: {
        showGoNoGoZones(state: stateType, data: any) {
            return {
                ...state,
                showGoNoGoZones: data,
            };
        },
        setZones(state: stateType, data: any) {
            return {
                ...state,
                zones: data,
            };
        },
        zonesForOneProject(state: stateType, data: any) {
            return {
                ...state,
                zonesForOneProject: data,
            };
        },
        zoneIds(state: stateType, data: any) {
            return {
                ...state,
                zoneIds: data,
            };
        },
        zoneForOneProjectIds(state: stateType, data: any) {
            return {
                ...state,
                zoneForOneProjectIds: data,
            };
        },
        zonesToUpload(state: stateType, data: any) {
            return {
                ...state,
                zonesToUpload: data,
            };
        },
        creatingZones(state: stateType, data: any) {
            return {
                ...state,
                creatingZones: data
            };
        },
        zonesCreated(state: stateType, data: any) {
            return {
                ...state,
                zonesCreated: data
            };
        },
        zonesImportErrors(state: stateType, data: any) {
            return {
                ...state,
                zonesImportErrors: data
            };
        },
        zonesCreatedSuccessfully(state: stateType, data: any) {
            return {
                ...state,
                zonesCreatedSuccessfully: data
            };
        },
        zonesCreateUnSuccessfully(state: stateType, data: any) {
            return {
                ...state,
                zonesCreateUnSuccessfully: data
            };
        },
    },
    effects: (dispatch) => ({
        createZones: async (data: any, _store: any) => {
            dispatch.zones.creatingZones(true);
            dispatch.zones.zonesImportErrors('');
            const zoneToUpload = _store.zones.zonesToUpload
            const finalData = {
                subType: data.zoneSubType,
                isActive: true,
                type: data.zoneType,
                projectID: data.projectId,
                polygon: zoneToUpload.features[0].geometry.coordinates,
            };
            await createRequest(`zones`, finalData)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                    dispatch.zones.creatingZones(false);
                    dispatch.zones.zonesCreated(true);
                    dispatch.zones.zonesImportErrors('');
                    dispatch.zones.zonesCreatedSuccessfully([{
                        feature: {geometry: res.data.polygon}
                    }])
                    dispatch.zones.zonesCreateUnSuccessfully({})
                    const projectIds = _store.activities?.activityFilterOptionData?.projects
                    dispatch.zones.getZones({ids: projectIds.map(project => project.id).join(',')});
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        const errMsg = err.response.data.message;
                        dispatch.zones.zonesImportErrors(`${errMsg.at(0).toUpperCase()}${errMsg.slice(1, errMsg.length)}`);
                        data.onError && data.onError(err.response.data.message);
                    }
                    dispatch.zones.creatingZones(false);
                    dispatch.zones.zonesCreated(false);
                    dispatch.zones.zonesCreateUnSuccessfully({'Exists': [{feature: zoneToUpload.features[0]}]})
                });
        },
        getZones: async (data: any) => {
            dispatch.zones.showGoNoGoZones(false);
            await getRequest(`zones?projectId=${data.ids}`)
                .then((res) => {
                    const featureCollections = zoneFeatureCollections(res.data.rows);
                    dispatch.zones.zoneIds(res.data.rows.map(i => i.id))
                    dispatch.zones.setZones(featureCollections);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getZonesForOneProject: async (data: any) => {
            dispatch.zones.showGoNoGoZones(false);
            await getRequest(`zones?projectId=${data.ids}`)
                .then((res) => {
                    const featureCollections = zoneFeatureCollections(res.data.rows);
                    dispatch.zones.zoneForOneProjectIds(res.data.rows.map(i => i.id))
                    dispatch.zones.zonesForOneProject(featureCollections);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        setShowGoNoGoZones: async (data: any) => {
            dispatch.zones.showGoNoGoZones(data.showGoNoGoZones);
        },
        setZonesToUpload: async (data: any) => {
            dispatch.zones.zonesImportErrors('');
            dispatch.zones.zonesToUpload(data.zonesToUpload);
        },
        resetUploadZones: async () => {
                dispatch.zones.zonesToUpload({});
                dispatch.zones.zonesCreatedSuccessfully([]);
                dispatch.zones.zonesCreateUnSuccessfully({});
                dispatch.zones.zonesCreated(false);
                dispatch.zones.zonesImportErrors('');
            },
    }),
});

export default zones;
