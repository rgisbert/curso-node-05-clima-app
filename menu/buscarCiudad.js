import colors from 'colors';

import {leerInput, listarLugares} from '../helpers/inquirer.js';
import Busqueda from '../models/busquedas.js';

const buscarCiudad = async () => {
  const busqueda = new Busqueda();

  // Mostrar mensaje
  const termino = await leerInput('Ciudad:');

  // Buscar los lugares
  const lugares = await busqueda.ciudad(termino);

  // Seleccionar el lugar
  const id = await listarLugares(lugares);
  if (id === '0') return; // Si cancela, volvemos a menú

  // Datos de la selección
  const {nombre, lng, lat} = lugares.find((lugar) => lugar.id === id);

  // Clima
  const {clima_desc, temp, temp_max, temp_min} = await busqueda.climaLugar(
    lat,
    lng
  );

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
};

export default buscarCiudad;
