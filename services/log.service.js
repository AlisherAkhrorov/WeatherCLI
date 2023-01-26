import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success') + ' ' + message);
}

const printHelp = () => {
    console.log(dedent`${chalk.bgCyan('Help')}
    Без параметров - вывод погоды
    -s [City] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `);
}

export {
    printError,
    printSuccess,
    printHelp
}
