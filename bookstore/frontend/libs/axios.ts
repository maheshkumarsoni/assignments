import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.75:3001",
});

export default axiosInstance;
