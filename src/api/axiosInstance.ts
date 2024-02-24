import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.valantis.store:41000",
});
