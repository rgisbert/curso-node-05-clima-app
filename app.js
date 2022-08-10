import {inquirerMenu, pausa} from './helpers/inquirer.js';

const main = async () => {
  let menuOpt;

  do {
    menuOpt = await inquirerMenu();

    if (menuOpt !== 0) await pausa();
  } while (menuOpt !== 0);
};

main();
