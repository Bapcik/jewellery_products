import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://api.valantis.store:40000`,
});