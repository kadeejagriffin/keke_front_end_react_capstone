import axios from "axios";
const baseURL = 'https://yoga-retreat.onrender.com';
const userEndpoint = '/users';
const tokenEndpoint = '/token';
const retreatsEndpoint = '/retreats';
const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
});
const apiClientBasicAuth = (username, password) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
});
const apiClientTokenAuth = (token) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
});
async function register(newUserData) {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
async function login(username, password) {
    let error;
    let data;
    try {
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
async function getMe(token) {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
async function getRetreats() {
    try {
        const response = await apiClientNoAuth().get(retreatsEndpoint);
        return { data: response.data };
    }
    catch (error) {
        let errorMessage;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data.error || 'Something went wrong';
        }
        else {
            errorMessage = 'Something went wrong';
        }
        return { error: errorMessage };
    }
}
async function createRetreat(token, newRetreatData) {
    try {
        const response = await apiClientTokenAuth(token).post(retreatsEndpoint, newRetreatData);
        return { data: response.data };
    }
    catch (error) {
        let errorMessage;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data.error || 'Something went wrong';
        }
        else {
            errorMessage = 'Something went wrong';
        }
        return { error: errorMessage };
    }
}
async function getRetreatById(retreatId) {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().get(retreatsEndpoint + '/' + retreatId);
        data = response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
async function editRetreatbyId(token, retreatId, editRetreatData) {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(retreatsEndpoint + '/' + retreatId, editRetreatData);
        data = response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
async function deleteRetreatbyId(token, retreatId) {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(retreatsEndpoint + '/' + retreatId);
        data = response.data.success;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        }
        else {
            error = 'Something went wrong';
        }
    }
    return { error, data };
}
export { register, login, getMe, getRetreats, createRetreat, getRetreatById, editRetreatbyId, deleteRetreatbyId };
