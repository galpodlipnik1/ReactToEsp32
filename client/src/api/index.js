import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.116.95' });

export const ledOff = () => API.get('/ledoff');

export const ledOn = () => API.get('/ledon');

export const ledStatus = () => API.get('/ledstatus');

export const getTempAndHumidity = () => API.get('/th');