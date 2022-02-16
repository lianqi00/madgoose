"use strict";

import Vue from 'vue';
// import VueRouter from 'vue-router';
import Router from '../router/index'
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// console.log(Router);
const baseURL = window.location.origin + '/api'
console.log(baseURL);
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // baseURL: 'http://localhost:3002/api',
  baseURL,
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = 'bearer ' + sessionStorage.token
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    Vue.prototype.$message({
      message: error.response.data.message,
      type: 'error'
    })
    console.log(error.response.status);
    if (error.response.status === 401) {
      // console.log(Vue.prototype.$router);
      // Vue.prototype.$router.push('/login')
      Router.push('/login')
    }
    // console.log(error.response.data.code !== 0);
    // console.log(this);
    // return Promise.reject(error);
  }
);



Vue.prototype.$http = _axios
