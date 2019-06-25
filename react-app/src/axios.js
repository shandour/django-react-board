import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  headers: {
    accept: "application/json"
  }
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default axios;
