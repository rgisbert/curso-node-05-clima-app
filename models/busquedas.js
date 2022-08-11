import axios from 'axios';

class Busqueda {
  historial = ['Madrid', 'Londres'];

  constructor() {
    // TODO leer BD si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  async ciudad(lugar = '') {
    try {
      // Petición HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const {data} = await instance.get();
      console.log(data);

      return []; // ? Devolverá los lugares
    } catch (error) {
      return [];
    }
  }
}

export default Busqueda;
