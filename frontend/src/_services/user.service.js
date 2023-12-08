import axios from 'axios';
import config from '../config/config';


export const userService = {
    get,
    post,
    put,
    deleteVehicle
};

function get(apiEndpoint) {
    return axios.get(`${config.baseUrl}${apiEndpoint}`, getOptions());
}

function post(apiEndpoint, payload) {
    return axios.post(`${config.baseUrl}${apiEndpoint}`, payload, getOptions());
}

function put(apiEndpoint, payload) {
    return axios.put(`${config.baseUrl}${apiEndpoint}`, payload, getOptions());
}

function deleteVehicle(apiEndpoint) {
    return axios.delete(`${config.baseUrl}${apiEndpoint}`, getOptions());
}

function getOptions() {
    let options = {};

    if (localStorage.getItem('token')) {
        options.headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
    }

    return options;
}