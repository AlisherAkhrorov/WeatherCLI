import {
    getKeyValue,
    TOKEN_DICTIONARY
} from "./storage.service.js";
import axios from 'axios';

// const getIcon = (icon) => {
    
// }

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте через команду -t [API_key]')
    }
    
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        },proxy:{
            protocol: 'http',
            host: '10.8.88.22',
            port:8080
        }
    })
    return data;
};

export {
    getWeather
}