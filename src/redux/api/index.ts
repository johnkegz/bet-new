import axios from 'axios';
import config from '../config';

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};
const _axios = axios.create({
    withCredentials: false
});

const withAuthHeader = {
    ..._axios.defaults.headers,
};

const getHeaders = () => {
    const token = localStorage.getItem('token')
    withAuthHeader.token =  token;
    withAuthHeader.Authorization = `Bearer ${token}`;
    return withAuthHeader
}

const get = (path: string) => {
    return _axios.get(`${config.appAPI()}/${path}`, {
        headers: getHeaders(),
    });
};

const getWithData = (path: string, access_Token:string) => {
    return _axios.get(`${config.appAPI()}/${path}?access_token=${access_Token}`, {
        headers: getHeaders(),
    });
};

const create = (path: string, data: {}) => {
    return _axios.post(
        `${config.appAPI()}/${path}`,
        { ...data },
        { headers: getHeaders() }
    );
};

const update = (path: string, data: {}) => {
    return _axios.put(
        `${config.appAPI()}/${path}`,
        { ...data },
        { headers: getHeaders() }
    );
};

const patch = (path: string, data: {}) => {
    return _axios.patch(
        `${config.appAPI()}/${path}`,
        { ...data },
        { headers: getHeaders() }
    );
};

const del = (path: string, data: {}) => {
    return _axios.delete(`${config.appAPI()}/${path}`, {
        data: { ...data },
        headers: getHeaders(),
    });
};

const gql = (path: string, query: {}) => {
    return _axios.post(`${config.appAPI()}/${path}`, query);
};

export default {
    getRequest: get,
    getRequestWithData: getWithData,
    createRequest: create,
    updateRequest: update,
    patchRequest: patch,
    deleteRequest: del,
    appAPI: config.appAPI(),
    appURL: config.appURL(),
    gql
};
