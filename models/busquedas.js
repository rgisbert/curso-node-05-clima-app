class Busqueda {
  historial = ['Madrid', 'Londres'];

  constructor() {
    // TODO leer BD si existe
  }

  async ciudad(lugar = '') {
    // TODO petición http
    console.log({lugar});

    return []; // ? Devolverá los lugares
  }
}

export default Busqueda;
