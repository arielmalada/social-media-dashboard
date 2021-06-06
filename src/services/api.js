import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const get = async (endpoint) => axios.get(`${BASE_URL}/${endpoint}`);

export const post = async (endpoint, data) => axios.post(`${BASE_URL}/${endpoint}`, data);

export const put = async (endpoint, data) => axios.put(`${BASE_URL}/${endpoint}`, data);

export const patch = async (endpoint, data) => axios.patch(`${BASE_URL}/${endpoint}`, data);

export const deleteData = async (endpoint) => axios.delete(`${BASE_URL}/${endpoint}`);

