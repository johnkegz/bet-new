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

const roles = createModel<any>()({
    state: {
        roles: []
    },
    reducers: {
        saveRoles(state: any, payload: any) {
            return {
                ...state,
                roles: payload
            };
        },
    },
    effects: (dispatch) => ({
        getRolesPerOrganization: async (data: any) => {
            await getRequest(`roles/organization/${data.id}`)
                .then((res) => {
                    dispatch.roles.saveRoles(res.data);
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        removeAssignedRole: async (data: any) => {
            await getRequest(`user-projects/delete/${data.data.id}`)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        }
    }),
});

export default roles;
