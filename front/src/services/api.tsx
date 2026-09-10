import axios from "axios";
import { data, redirect } from "react-router";

const api = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 500;
    switch (status) {
      case 401:
        const requestUrl = error.config.url;
        if(requestUrl === "/user" || requestUrl === "/login") {
          return Promise.reject(error);
        }
        throw redirect('/');
      case 403:
        throw data(null, { status: 403 });
      case 404:
        throw data(null, { status: 404 });
      case 422:
        return Promise.reject(error);
      default:
        throw data(null, { status: 500 });
    }
  },
);

export default api
