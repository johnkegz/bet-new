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

type OrganizationType = {
    activeFrom: string | null;
    activeTo: string | null;
    code: string | null;
    country: string;
    id: number;
    name: string;
    status: string;
    }

const organizations = createModel<any>()({
    state: {
        organizations: []
    },
    reducers: {
        requestGetOrganizations(state: any) {
            return {
                ...state,
                organizations: []
            }
        },
        saveOrganizations(state: any, payload: any) {
            return {
                ...state,
                organizations: payload
            };
        },
        saveOrganization(state: any) {
            return {
                ...state
            }
        },
        selectedOrganization(state: any, payload: OrganizationType) {
            return {
                ...state,
                selectedOrganization: payload
            }
        }
    },
    effects: (dispatch) => ({
        getOrganizations: async (data: any) => {
            dispatch.organizations.requestGetOrganizations();
            await getRequest('organization')
                .then((res) => {
                    dispatch.organizations.saveOrganizations(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getOrganizationById: async (data: any) => {
            const organizationID = data.organization.id
            await getRequest('organization/' + organizationID)
                .then((res) => {
                    dispatch.organizations.saveOrganization(res.data);
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

export default organizations;
