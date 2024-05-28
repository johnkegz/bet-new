import api from '../api';
import { createModel } from '@rematch/core';
import {
    switchTabsForestry,
    switchTabsForestryForTreeoUsers,
    switchTabsPeople,
    switchTabsPeopleForTreeoUsers,
} from '../../utilites/permissionSwitchTabs';
import { restructureUserOrganizationAndProjects } from '../../utilites/restructureUserOrganizationAndProjects';
import { isAuthorized } from '../../utilites/permissionCheck';
import { pagePermissions } from '../../constants';
import { uniqueById } from '../../utilites/uniqueBy';

const {
    createRequest,
    getRequestWithData,
    updateRequest,
    getRequest,
    patchRequest,
    gql,
} = api;

interface stateType {
    auth: {
        loggedIn: boolean;
        token: null;
        currentUser: null;
        // username:""
    };
    profile: {};
    data: {
        message: string;
    };
    users: any;
    user: any;
    forestryTabRoutes: Array<string>;
    peopleTabRoutes: Array<string>;
    isGettingUser: boolean;
    userProjects: Array<{}>;
    filteredUsers: Array<{}>;
}

interface dataType {
    user: '';
    onSuccess: any;
    onError: any;
    params: '' | null;
}

interface errorType {
    response: {
        data: {
            message: string;
        };
        message?: string;
    };
}

const initialState = {
    auth: {
        loggedIn: false,
        token: null,
        currentUser: null,
    },
    profile: {},
    data: {
        message: '',
    },
    users: [],
    user: {},
    forestryTabRoutes: [],
    peopleTabRoutes: [],
    isGettingUser: false,
    userProjects: [],
    filteredUsers: [],
};

const createUserAuthDetails = (res) => {
    const userToken = res.data.data.token;
    return {
        loggedIn: true,
        userToken,
        currentUser: {
            id: res.data.data.id,
            username: res.data.data.username,
            email: res.data.data.email,
        },
    };
};

const users = createModel<any>()({
    state: { ...initialState },
    reducers: {
        resetUsersState() {
            return { ...initialState };
        },
        created(state: stateType, payload: any) {
            return {
                ...state,
                profile: payload,
                data: state.data,
            };
        },
        unauthorizedUser(state: stateType, payload: any) {
            localStorage.removeItem('token');
            return {
                ...state,
                auth: {
                    loggedIn: false,
                    token: null,
                    currentUser: null,
                },
                profile: {},
                data: payload,
            };
        },
        authenticateUser(state: stateType, payload: any) {
            localStorage.setItem('token', payload.userToken);
            return {
                ...state,
                auth: {
                    ...state.auth,
                    ...payload,
                },
                data: state.data,
            };
        },
        saveUsers(state: any, payload: any) {
            return {
                ...state,
                users: payload,
            };
        },
        pickerUsers(state: any, payload: any) {
            return {
                ...state,
                pickerUsers: payload,
            };
        },
        authStatus(state: stateType, payload: any) {
            return {
                ...state,
                auth: {
                    loggedIn: payload.loggedIn,
                    token: null,
                    currentUser: null,
                },
                profile: {},
                data: payload,
            };
        },
        saveUser(state: any, payload: any) {
            return {
                ...state,
                user: { ...state.user, ...payload },
            };
        },
        saveForestryTabRoutes(state: any, payload: any) {
            return {
                ...state,
                forestryTabRoutes: payload,
            };
        },
        savePeopleTabRoutes(state: any, payload: any) {
            return {
                ...state,
                peopleTabRoutes: payload,
            };
        },
        setIsGettingUser(state: any, payload: any) {
            return {
                ...state,
                isGettingUser: payload,
            };
        },
        saveOrganizationsAndProjects(state: any, payload: any) {
            return {
                ...state,
                user: { ...state.user, organizationsAndProjects: payload },
            };
        },
        userProjects(state: any, payload: any) {
            return {
                ...state,
                userProjects: payload,
            };
        },
        filteredUsers(state: any, payload: any) {
            return {
                ...state,
                filteredUsers: payload,
            };
        },
    },
    effects: (dispatch) => ({
        registerUser: async (data: any) => {
            await createRequest('users', data.user)
                .then((res) => {
                    dispatch.users.created(res.data);
                    data.onSuccess && data.onSuccess(res.statusText);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },
        loginUser: async (data: any) => {
            await createRequest('auth/login', data.user)
                .then((res) => {
                    dispatch.users.authenticateUser(createUserAuthDetails(res));
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },
        facebook: async (data: any) => {
            const ps = data.user.params;
            await getRequestWithData('auth/facebook', ps)
                .then((res) => {
                    const userToken = res.data.token;
                    dispatch.users.authenticateUser({
                        loggedIn: true,
                        userToken,
                    });
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess && data.onError(err.response.data);
                    }
                });
        },
        google: async (data: dataType) => {
            await createRequest('auth/google', data.user)
                .then((res) => {
                    const userToken = res.data.token;
                    dispatch.users.authenticateUser({
                        loggedIn: true,
                        userToken,
                    });
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data.message) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },
        logoutUser: async (data: any) => {
            await getRequest('auth/logout')
                .then((res) => {
                    dispatch.users.unauthorizedUser({
                        loggedIn: false,
                        userToken: null,
                        currentUser: {
                            id: null,
                            username: null,
                            email: null,
                        },
                    });
                    dispatch.activities.resetActivitiesState();
                    dispatch.users.resetUsersState();
                    dispatch.plots.resetPlotsState();
                    dispatch.plannedActivities.resetPlannedActivitiesState();
                    dispatch.general.resetGeneralState();
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err: errorType) => {
                    if (err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },
        getUsers: async (data: any) => {
            await getRequest(`v2/users?page=${data.page}`)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        getUser: async (data: any, store: any) => {
            dispatch.users.setIsGettingUser(true);
            // let ff = await fetch('http://127.0.0.1:8000/sets/1/');
            
            await fetch('http://127.0.0.1:8000/sets/1/')
                .then((res) => {
                    return res.json()
                    
                }
            ).then(res => {
               console.log('ffffff +++++>>>>>>', res)
            })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                    dispatch.users.setIsGettingUser(false);
                });
        },
        getSingleUser: async (data: any) => {
            const userID = data.user.id;
            await getRequest('users/userId/' + userID)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        updateUserDetail: async (data: any) => {
            const userID = data.user.username;
            const userData = data.user.editedDetails;
            await patchRequest('users/' + userID, userData)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        updateUserDetailV2: async (data: any) => {
            const userID = data.user.username;
            const userData = data.user.editedDetails;
            await patchRequest('v2/users/' + userID, userData)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        updateUserRole: async (data: any) => {
            const userID = data.edit.projectID;
            const userData = data.edit.details;
            await updateRequest('user-projects/update/' + userID, userData)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        assignUserRole: async (data: any) => {
            const userData = data.edit.details;
            await createRequest(data.url, userData)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        verifyEmail: async (data: any) => {
            const userID = data.user.id;
            await getRequest('users/confirm/' + userID)
                .then((res) => {
                    const userToken = res.data.token;
                    dispatch.users.authenticateUser({
                        loggedIn: true,
                        userToken,
                    });
                    data.onSuccess && data.onSuccess(res.data.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess && data.onError(err.response.data);
                    }
                });
        },
        adminResetUserPassowrd: async (data: any) => {
            await getRequest(`users/password/reset/${data.email}`)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data.message);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },

        getAllCoordinates: async (data: any) => {
            // const userID = data.data.userId
            await getRequest('plots/user/all/plots')
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },

        createPolygonCoordinates: async (data: any) => {
            // const userID = data.data.userId
            await createRequest('plots/v2/create/polygon', data.data)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onSuccess &&
                            data.onError(err.response.data.message);
                    }
                });
        },

        setAuthStatus: async (data: {
            email: string;
            exp: number;
            iat: number;
            id: number;
            username: string;
            status: Boolean;
        }) => {
            dispatch.users.authStatus({
                loggedIn: data.status,
                userToken: null,
                currentUser: {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                },
            });
        },
        unSetAuthStatus: async () => {
            dispatch.users.unauthorizedUser({
                loggedIn: false,
                userToken: null,
                currentUser: {
                    id: null,
                    username: null,
                    email: null,
                },
            });
        },
        //gql
        filterUsers: async (data: any) => {
            await gql('graphql', data.query)
                .then((res) => {
                    let result = res.data.data.filterUsers.map((item) => {
                        return item;
                    });
                    let newdata: any = {
                        rows: result,
                    };
                    dispatch.users.saveUsers(newdata);
                    data.onSuccess && data.onSuccess(newdata);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        //gql
        searchUsers: async (data: any) => {
            await gql('graphql', data.query)
                .then((res) => {
                    let result = res.data.data.searchUsers.map((item) => {
                        return item;
                    });
                    let newdata: any = {
                        rows: result,
                    };
                    dispatch.users.saveUsers(newdata);
                    data.onSuccess && data.onSuccess(newdata);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        approvedFarmerStatus: async (data: any) => {
            const projectID = data.user.projectID;
            const object = {
                status: data.user.statusValue,
            };
            await patchRequest(
                'user-projects/approve/project/' + projectID,
                object
            )
                .then((res) => {
                    console.log(res);
                })
                .catch((err: errorType) => {
                    console.log(err);
                });
        },
        filterUsersREST: async (data: any) => {
            await getRequest(`users/all/filter?${data.data}`)
                .then((res) => {
                    dispatch.users.saveUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        userPicker: async (data: any) => {
            await getRequest(`users/all/picker?${data.data}`)
                .then((res) => {
                    dispatch.users.pickerUsers(res.data);
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        verifyOTP: async (data: any) => {
            await createRequest(`auth/verify-otp`, data.data)
                .then((res) => {
                    dispatch.users.authenticateUser(createUserAuthDetails(res));
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data);
                    }
                });
        },
        requestOTP: async (data: any) => {
            await createRequest(`auth/request-otp`, data.data)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data);
                    }
                });
        },
        updateUserPassword: async (data: any) => {
            await createRequest(
                `users/password/update/${data.email}`,
                data.data
            )
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        seracUserByemail: async (data: any) => {
            await createRequest('users/search', data.data)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },
        filterUsersByProject: async (data: any) => {
            try {
                const res = await getRequest(
                    `users/filterByProject?${data.data}`
                );
                const { data: responseData } = res;
                dispatch.users.filteredUsers(responseData);
                data.onSuccess?.(responseData);
                return responseData;
            } catch (err) {
                if (err && err.response && err.response.data) {
                    data.onError && data.onError(err.response.data.message);
                }
                throw err;
            }
        },
        forgotPassword: async (data: any) => {
            await getRequest(`users/forgot-password/${data.email}`)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },

        checkResetPasswordLink: async (data: any) => {
            await getRequest(`users/reset-password-link/${data.userId}`)
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },

        resetPassword: async (data: any) => {
            await createRequest(
                `users/reset-password/${data.userId}`,
                data.data
            )
                .then((res) => {
                    data.onSuccess && data.onSuccess(res.data.rows);
                })
                .catch((err: errorType) => {
                    if (err && err.response && err.response.data) {
                        data.onError && data.onError(err.response.data.message);
                    }
                });
        },

        importUsers: async (data: any) => {
            await createRequest(`sheets/users`, data.data)
                .then((res) => {
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

export default users;
