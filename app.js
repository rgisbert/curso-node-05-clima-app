import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import {inquirerMenu, pausa} from './helpers/inquirer.js';
import buscarCiudad from './menu/buscarCiudad.js';

const main = async () => {
  let menuOpt;

  showMenu: do {
    menuOpt = await inquirerMenu();

    // Diferente forma. Si quiere salir, directamente salgo del bucle
    if (menuOpt === 0) break;

    // Menú
    switch (menuOpt) {
      case 1: // Buscar ciudad
        await buscarCiudad();
        break;

      case 2: // Historial
        break;
    }

    await pausa();
  } while (menuOpt !== 0);
};

main();
