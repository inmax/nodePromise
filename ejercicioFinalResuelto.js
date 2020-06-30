// 1- Obtener los datos sobre las series de Batman usando la API de TVmaze
// 2-Guarda los datos en un archivo "series.batman.json"
// 3- Obtener los datos sobre las series de Superman usando la API de TVMaze
// 4- Guarda los datos en un archivo "series.superman.json".
// 5- Cuando finalizen ambos procesos, leer los datos y ordenarlos cronológicamente.
// 6- Cada 1 seg. mostrar los títulos y fechas de emsiosón en panatalla

const axios = require("axios");
const fs = require("fs");

//helpers
const setUrl = (paramsSearch = "") =>
  `https://api.tvmaze.com/search/shows?q=${paramsSearch}`;

const setNamingFile = (name = "name") => `series.${name}.json`;

//PASO 1.
const getSearching = async (param) => {
  return await axios.get(setUrl(param));
};

// 'Promiseamos' guardar archivo
const saveFile = (name, data) => {
  return new Promise((resolve, rejeted) => {
    fs.writeFile(name, data, "utf-8", (err) => {
      if (err) {
        rejeted("No se puede grabar", name);
      } else resolve("Listo", name);
    });
  });
};

//Para leer el archivo
const getFile = (name) => {
  return new Promise((resolve, rejeted) => {
    fs.readFile(name, "utf-8", (err, data) => {
      if (err) return rejeted("No se puede grabar", name);
      else return resolve(JSON.parse(data));
    });
  });
};

//Ordenar el archivo
const sortData = (arr) => {
  return arr.sort((a, b) => {
    return new Date(a.show.premiered) - new Date(b.show.premiered);
  });
};
//Para mostrar los datos del el archivo
const showData = (data) => {
  data.forEach((element, i) => {
    setTimeout(
      () => console.log(element.show.premiered, "Name:", element.show.name),
      1000 * i
    );
  });
};

(async () => {
  try {
    //Optimizar. Estas request se están produciendo en serie cuando en realidad no es necesario, podrían trabajar paralelo.
    //const batmanData = await getSearching("batman");
    //const supermanData = await getSearching("superman");

    const responses = await Promise.all([
      getSearching("batman"),
      getSearching("superman"),
    ]);

    await saveFile(setNamingFile("batman"), JSON.stringify(responses[0].data));
    await saveFile(
      setNamingFile("superman"),
      JSON.stringify(responses[1].data)
    );

    const fileBatman = await getFile("series.batman.json");
    const fileSuperman = await getFile("series.superman.json");
    const sortedData = sortData([...fileBatman, ...fileSuperman]);
    //showData se registra síncronamente, aunque luego llame al seTimeout
    showData(sortedData);
    console.log("FIN");
  } catch (error) {
    console.log(error, "Errorrrrrr");
  }
})();
