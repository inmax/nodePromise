// 1- Obtener los datos sobre las series de Batman usando la API de TVmaze
// 2-Guarda los datos en un archivo "series.batman.json"
// 3- Obtener los datos sobre las series de Superman usando la API de TVMaze
// 4- Guarda los datos en un archivo "series.superman.json".
// 5- Cuando finalizen ambos procesos, leer los datos y ordenarlos cronológicamente.
// 6- Cada 1 seg. mostrar los títulos y fechas de emsiosón en panatalla

const axios = require("axios");
const fs = require("fs");

const setUrl = (paramsSearch = "") =>
  `https://api.tvmaze.com/search/shows?q=${paramsSearch}`;
const setNamingFile = (name = "name") => `series.${name}.json`;

//PASO 1.
const getSearching = async (param) => {
  try {
    const resultado = await axios.get(setUrl(param));
    if (resultado.status !== 200) {
      throw new Error();
    }
    return resultado;
  } catch (error) {
    console.log("Error Searching:", param, error);
  }
};

// 'Promiseamos' guardar archivo
const saveFile = (name,datos) => {
  return new Promise((resolve, rejeted) => {
    fs.writeFile(setNamingFile(name), JSON.stringify(datos), "utf-8", (err) => {
      if (err) {
        rejeted("No se puede grabar");
      } else resolve("Listo");
    });
  });
};

getSearching("batman")
  .then(data => saveFile( "batman",data));

getSearching("superman")
  .then(data => saveFile ("superman",data));