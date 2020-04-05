import axios from 'axios';

const localServer = 'http://192.168.0.16:3333';

const api = axios.create({
  baseURL: localServer,
});

export default api;
