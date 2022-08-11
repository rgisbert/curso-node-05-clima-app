import colors from 'colors';
import inquirer from 'inquirer';

const questions = [
  {
    type: 'list',
    name: 'menuOption',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad.`,
      },
      {
        value: 2,
        name: `${'2.'.green} Historial.`,
      },
      {
        value: 0,
        name: `${'0.'.green} Salir.\n`,
      },
    ],
  },
];

/**
 * Muestra las opciones de menú a realizar por el programa
 * @returns {string} opciones del programa
 */
const inquirerMenu = async () => {
  console.clear();

  console.log('*************************'.green);
  console.log(`${'*'.green} ${'Seleccione una opción'.white} ${'*'.green}`);
  console.log('*************************\n'.green);

  const {menuOption} = await inquirer.prompt(questions);

  return menuOption;
};

/**
 * Pausa antes de continuar con la ejecución
 */
const pausa = () => {
  console.log();

  return inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar.`,
    },
  ]);
};

/**
 * Función en la que, mandado un mensaje personalizado, se recoja lo escrito en pantalla por el usuario
 * @param {string} message Mensaje en pantalla para pedir un valor personalizado
 * @returns El input de respuesta introducido por el usuario
 */
const leerInput = async (message = 'Introduzca un valor:') => {
  console.log(`\n`);

  const question = [
    {
      type: 'input',
      name: 'descripcionTarea',
      message,
      validate(value) {
        if (value.length === 0) return `Por favor, introduzca un valor.`;

        return true;
      },
    },
  ];

  const {descripcionTarea} = await inquirer.prompt(question);

  return descripcionTarea;
};

/**
 * Recibir los lugares y devolver la elección del que conicide con el que el usuario buscaba
 * @param {lugares[]} lugares Array con toda la información de los lugares
 * @returns {string} Id de la tarea a borrar
 */
const listarLugares = async (lugares = []) => {
  const choices = lugares.map(({id, nombre}, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: id,
      name: `${idx} ${nombre}.`,
    };
  });

  // Añadir la opción de cancelar
  choices.push({value: '0', name: `${'0'.green}. Cancelar.`});

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccionar ubicación:',
      choices,
    },
  ];

  const {id} = await inquirer.prompt(questions);
  return id;
};

/**
 * Mostrar mensaje para preguntar al usuario y esperar su respuesta
 * @param {string} message Mensaje a mostrar
 * @returns {boolean} Respuesta del usuario
 */
const confirmar = async (message = '¿Desea continuar?') => {
  const {ok} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]);

  return ok;
};

/**
 * Seleccionar los ids que se desean actualizar.
 * @param {Tarea[]} tareas
 * @returns {id[]} id's de las opciones seleccionadas
 */
const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map(({id, desc, completadoEn}, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: id,
      name: `${idx} ${desc}.`,
      checked: completadoEn ? true : false,
    };
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones:',
      choices,
    },
  ];

  const {ids} = await inquirer.prompt(questions);
  return ids;
};

export {
  confirmar,
  inquirerMenu,
  leerInput,
  listarLugares,
  mostrarListadoChecklist,
  pausa,
};
