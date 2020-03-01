import axios from 'axios';

let apiURL;
if (process.env.NODE_ENV === 'development') {
  apiURL = 'http://localhost:3000';
}

if (process.env.NODE_ENV === 'production') {
  apiURL = process.env.APP_URL;
}

const api = axios.create({
  baseURL: apiURL
});

export default api;
