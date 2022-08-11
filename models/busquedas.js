import fs from 'fs';

import colors from 'colors';
import axios from 'axios';

class Busqueda {
  #historial = [];
  #DBPath = './db/database.json';

  constructor() {
    this.#leerDB();
  }

  /**
   * Devuelve un objeto con los parámetros necesarios para la petición de datos
   * @returns {object} Configuración params para petición fetch
   */
  #paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  /**
   * Parámetros de configuración para la llamada a la API de OpenWeather
   */
  #paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: 'es',
      units: 'metric',
    };
  }

  /**
   * Consulta, en base al nombre del lugar, posibles opciones que coincidan
   * @param {string} lugar Nombre del mundo a consultar
   * @returns {{id: string, nombre: string, lng: number, lat: number}[]} Devuelve la información de la ciudad seleccionada, más de una en caso coincidente
   */
  async ciudad(lugar = '') {
    try {
      // Petición HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.#paramsMapbox(),
      });

      const {data} = await instance.get();

      return data.features.map(({id, place_name, center}) => ({
        id,
        nombre: place_name,
        lng: center[0],
        lat: center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // instancia de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.#paramsOpenWeather(), lat, lon},
      });

      const {weather, main} = (await instance.get()).data;

      return {
        clima_desc: weather[0].description,
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
      };
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Guarda las búsquedas, colocando la más reciente, delante
   * @param {string} lugar Localidad con la ubicación tal cual lo muestra la API
   */
  agregarHistorial(lugar = '') {
    // Evitar grabar si ya existe
    if (this.#historial.includes(lugar.toLowerCase())) return;

    // Limito unidades
    this.#historial = this.#historial.splice(0, 5);

    this.#historial.unshift(lugar.toLowerCase());

    // Guardar en JSON
    this.#guardarDB();
  }

  /**
   * Guardar historial en archivo json
   */
  #guardarDB() {
    const payload = {
      historial: this.#historial,
    };

    fs.writeFileSync(this.#DBPath, JSON.stringify(payload));
  }

  /**
   * Recupera la información del archivo json
   */
  async #leerDB() {
    if (fs.existsSync(this.#DBPath)) {
      const info = fs.readFileSync(this.#DBPath, {encoding: 'utf-8'});
      const data = JSON.parse(info);

      this.#historial = data.historial;
    }
  }

  /**
   * Muestra listado de las últimas búsquedas.
   */
  get imprimirHistorialCapitalizado() {
    return this.#historial.map((lugar, i) => {
      const idx = `${i + 1}.`.green;

      let palabras = lugar.split(' ');
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      palabras = palabras.join(' ');

      console.log(`${idx} ${palabras}.`);
    });
  }
}

export default Busqueda;
