import colors from 'colors';

import {inquirerMenu, leerInput, pausa} from './helpers/inquirer.js';
import Busqueda from './models/busquedas.js';

const main = async () => {
  const busqueda = new Busqueda();
  let menuOpt;

  do {
    menuOpt = await inquirerMenu();

    // Diferente forma. Si quiere salir, directamente salgo del bucle
    if (menuOpt === 0) break;

    // Menú
    switch (menuOpt) {
      case 1: // Buscar ciudad
        // Mostrar mensaje
        const lugar = await leerInput('Ciudad:');
        await busqueda.ciudad(lugar);

        // Buscar los lugares

        // Seleccionar el lugar

        // Clima

        // Mostrar resultados
        console.log('\nInformación de la ciudad.\n'.green);
        console.log('Ciudad:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');
        break;

      case 2: // Historial
        break;
    }

    await pausa();
  } while (menuOpt !== 0);
};

main();
