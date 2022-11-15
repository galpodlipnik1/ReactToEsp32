import * as api from '../api/index';

export const getTempAndHumidity = async () => {
    try {
        const data = await api.getTempAndHumidity();

        return data;
    } catch (error) {
        console.log(error);   
    }
};

export const ledOff = async () => {
    try {
        await api.ledOff();
    } catch (error) {
        console.log(error);   
    }
};

export const ledOn = async () => {
    try {
        await api.ledOn();
    } catch (error) {
        console.log(error);   
    }
};

export const getLedStatus = async () => {
    try {
        const data = await api.ledStatus();

        return data;
    } catch (error) {
        console.log(error);   
    }
};