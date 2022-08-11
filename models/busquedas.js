import axios from 'axios';

class Busqueda {
  historial = ['Madrid', 'Londres'];

  constructor() {
    // TODO leer BD si existe
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
}

export default Busqueda;
