// node no soporta fetch nativamente. Una alternativa es utilizar librerías, server side render.
// Es muy útil para React.js
const fetch = require("node-fetch");
const fs = require("fs"); // FileSystem Es standar no es necesirio instalar nada

// Solicitar resultados a un servicio externo guardarlos en nuestro filesystem

const url = "https://api.tvmaze.com/search/showss?q=batman";
const urlError = "https://jsonplaceholder.typicode.com/otroendpoint";

//CASO-01

// fetch(url)
//   .then((response) => response.json()) // el método json también es asincrono
//   .then((list) => {
//       console.log(list);
//   });


const getList = async ()=>{
  const res =  await fetch(url); //fetch y json() son promesas! por eso esperamos a que se resuelvan
  if(res.status !==200) throw new Error();
  const list = await res.json();
  return list;
}

// 'Promiseamos' guardar archivo
const saveFile = (datos)=>{
  return new Promise((resolve,rejeted)=>{
    fs.writeFile("datos.txt",JSON.stringify(datos),'utf-8', (err)=>{
      if(err){
        rejeted('No se puede grabar');
      } else 
        resolve('Listo');
    });

  })
}

/* A
getList()
  .then(list=>saveFile(list))
  .then(()=>{console.log('listo')})
 ;
*/

// B
(async ()=>{
  try{
    const list = await getList();
    const response = await saveFile(list);
    console.log(response);
  } catch(error){
    console.log("Error",error.status)
  }

})();

  