import {
    getArgs
} from "./helpers/args.js";
import {
    getWeather
} from "./services/api.service.js";
import {
    printHelp,
    printSuccess,
    printError,
    printWeather
} from "./services/log.service.js";
import {
    getKeyValue,
    saveKeyValue,
    TOKEN_DICTIONARY
} from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('not token')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Saved token')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан city');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Saved City')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue('city')
        const weather = await getWeather(city)
        printWeather(weather, '');
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Не верно указан город')
        } else if (e?.response?.status == 401) {
            printError('Не верно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
       return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    getForcast()
};

initCLI();