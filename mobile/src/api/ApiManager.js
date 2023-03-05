import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://169.254.176.137:3303/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
