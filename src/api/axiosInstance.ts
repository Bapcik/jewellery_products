import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://api.valantis.store:40000',
});


