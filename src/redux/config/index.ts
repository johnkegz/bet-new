const API = import.meta.env.VITE_API || 'http://127.0.0.1:8000';
// const URL = import.meta.env.VITE_URL || 'https://yourappurl.com';

const appAPI = () => {
    return API;
};

const appURL = () => {
    return URL;
};

export default {
    appAPI,
    appURL,
};
