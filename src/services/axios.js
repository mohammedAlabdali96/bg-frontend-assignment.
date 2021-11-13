import axios from "axios";
import LocalStorageService from "./localstorage.service";

import {SERVER_URL} from "../config.json";

// Add a request interceptor
axios.interceptors.request.use(
   config => {
       const token = LocalStorageService.getAccessToken();
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });

//Add a response interceptor
axios.interceptors.response.use(response => {
   return response
}, error => {
   const originalRequest = error.config;
   if (error.response.status === 401 && originalRequest.url === 
    `${SERVER_URL}/auth/refresh-token`) {
           return Promise.reject(error);
       }
   if (error.response.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true;
       const refreshToken = LocalStorageService.getRefreshToken();
       const {email} = LocalStorageService.getUser();
       return axios.post(`${SERVER_URL}/auth/refresh-token`,
           {
               email,
               refreshToken
           })
           .then(res => {
               if (res.status === 201) {
                   LocalStorageService.setToken(res.data);
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
                   return axios(originalRequest);
               }
           })
   }
   return Promise.reject(error);
});

export default axios;