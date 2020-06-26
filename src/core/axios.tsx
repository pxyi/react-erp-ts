import axios from 'axios';
import Qs from 'qs';


axios.interceptors.request.use(

  config => { 
    config.withCredentials = true;
    if (!config.url?.startsWith('http')) {
      config.url = `${process.env.REACT_APP_DOMAIN}${config.url}`;
    }
    if (config.method === 'post') { config.data = Qs.stringify(config.data); }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    
    return config;
  },

  error => {
    Promise.reject(error);
  },

);

axios.interceptors.response.use(

  response => response.data,
  error => Promise.reject(error),

);



export default axios;