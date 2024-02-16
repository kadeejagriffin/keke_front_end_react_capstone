import axios from "axios";
import { RetreatFormDataType, TokenType, UserFormDataType, UserType } from "../types"
import { RetreatType } from "../types";

const baseURL: string = 'https://yoga-retreat.onrender.com';
const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';
const retreatsEndpoint: string = '/retreats';

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username: string, password: string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token: string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    error?: string | undefined;
    data?: T | undefined;
}

async function register(newUserData: UserFormDataType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = 'Something went wrong';
        }
    }
    return { error, data }
}

async function login(username: string, password: string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try {
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }

    return { error, data }
}

async function getMe(token: string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }

    return { error, data }
}

async function getRetreats(): Promise<APIResponse<RetreatType[]>> {
    try {
        const response = await apiClientNoAuth().get<RetreatType[]>(retreatsEndpoint);
        return { data: response.data };
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data.error || 'Something went wrong';
        } else {
            errorMessage = 'Something went wrong';
        }
        return { error: errorMessage };
    }
}

async function createRetreat(token: string, newRetreatData: RetreatType): Promise<APIResponse<RetreatType>> {
    try {
        const response = await apiClientTokenAuth(token).post(retreatsEndpoint, newRetreatData);
        return { data: response.data };
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data.error || 'Something went wrong';
        } else {
            errorMessage = 'Something went wrong';
        }
        return { error: errorMessage };
    }
}

async function getRetreatById(retreatId:string): Promise<APIResponse<RetreatType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().get(retreatsEndpoint + '/' + retreatId);
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }

    return { error, data }
}

async function editRetreatbyId(token:string, retreatId:string|number, editRetreatData:RetreatFormDataType): Promise<APIResponse<RetreatType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(retreatsEndpoint + '/' + retreatId, editRetreatData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data}
}

async function deleteRetreatbyId(token:string, retreatId:string|number, ): Promise<APIResponse<string>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).delete(retreatsEndpoint + '/' + retreatId);
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data}
}




export {
    register,
    login,
    getMe,
    getRetreats,
    createRetreat,
    getRetreatById,
    editRetreatbyId,
    deleteRetreatbyId
};





