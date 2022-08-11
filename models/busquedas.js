import axios from 'axios';

class Busqueda {
  historial = ['Madrid', 'Londres'];

  constructor() {
    // TODO leer BD si existe
  }

  get paramsMapbox() {
    return {
      access_token:
        'pk.eyJ1Ijoicmdpc2JlcnQiLCJhIjoiY2w2b3U2M21yMGJieTNmcnJ5NnIwbzM4ZCJ9.CcFFlPJLbXb5pwy45Z9DAw',
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
