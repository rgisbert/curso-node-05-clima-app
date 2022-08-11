import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import colors from 'colors';

import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from './helpers/inquirer.js';
import Busqueda from './models/busquedas.js';

const main = async () => {
  const busqueda = new Busqueda();
  let menuOpt;

  showMenu: do {
    menuOpt = await inquirerMenu();

    // Diferente forma. Si quiere salir, directamente salgo del bucle
    if (menuOpt === 0) break;

    // Menú
    switch (menuOpt) {
      case 1: // Buscar ciudad
        // Mostrar mensaje
        const termino = await leerInput('Ciudad:');

        // Buscar los lugares
        const lugares = await busqueda.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === '0') continue showMenu; // Si cancela, volvemos a menú

        // Datos de la selección
        const {nombre, lng, lat} = lugares.find((lugar) => lugar.id === id);

        // Clima
        const {clima_desc, temp, temp_max, temp_min} =
          await busqueda.climaLugar(lat, lng);

        // Mostrar resultados

        console.log('\n\nInformación de la ciudad'.green);
        console.log('========================'.green);
        console.log('Ciudad:', `${nombre}`.green);
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('Clima:', `${clima_desc}`.green);
        console.log('Temperatura:', temp);
        console.log('Mínima:', temp_min);
        console.log('Máxima:', temp_max);
        break;

      case 2: // Historial
        break;
    }

    await pausa();
  } while (menuOpt !== 0);
};

main();
