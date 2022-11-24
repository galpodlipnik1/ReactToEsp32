import axios from 'axios';

const API = axios.create();

export const ledOff = () => API.get('/ledoff');

export const ledOn = () => API.get('/ledon');

export const ledStatus = () => API.get('/ledstatus');

export const getTempAndHumidity = () => API.get('/th');