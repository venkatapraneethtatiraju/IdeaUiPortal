import axios from 'axios';
import { getToken } from '../Auth/Auth';
const baseURl = 'https://cors-anywhere.herokuapp.com/http://iportal.herokuapp.com/innovation-portal/api/v1';
const token = getToken();
//const headers = { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` }
const instance = axios.create({ baseURL: baseURl});

//instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
// instance.interceptors.request...
export default instance;