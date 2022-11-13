import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.116.16' });

export const ledOff = () => API.get('/ledOff');

export const ledOn = () => API.get('/ledOn');

export const ledStatus = () => API.get('/ledStatus');

export const getTempAndHumidity = () => API.get('/getTH');