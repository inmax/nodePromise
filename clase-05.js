//CLASE 05--USO DE LIBRERÍAS

// node no soporta fetch nativamente. Una alternativa es utilizar librerías, server side render.
// Es muy útil para React.js
//HTTP es un librería nativa que trabaja con callbacks
const https = require("https");
const request = require("request"); //
const axios=require('axios');

// Solicitar resultados a un servicio externo guardarlos en nuestro filesystem

const url = "https://jsonplaceholder.typicode.com/users";


/*
https.get(url,resp=>{
  const {status} = resp;
  let rawData ='';
  //Acumulamos enb rawData cada chunk, y cuando la conexión con el servicio se produce lo guardamo todo en el JSON final
  resp.on('data', chunk =>{
  console.log(chunk, 'CHUNK'); //los chunk son módulos de la response , que poco a poco van llegando.
    rawData += chunk;
  });

  resp.on('end',()=>{
    const jsonFinal = JSON.parse(rawData);
    console.log('Finalización de la conexión',jsonFinal);
  });
});*/


// También utiliza una estrategia de callbacks
/*request(url,(error,response,body)=>{
  if(error){
    console.log("",error);
    return;
  }
  console.log('Request',body);
});*/


//directamente devuelve un json. Funciona en servidor y cliente
// Caso 1

// axios.get(url)
//   .then(res=>console.log('AXIOS',res))
//   .catch(error=>console.log('Axios error',error));


// Caso 2 --Axios con módulo autoejecutado.
// (async ()=>{
//   const resultado = await axios.get(url)
//   console.log(resultado.data)
// })();

//Caso 3 --Axios + gestion de error con cath

try {
  (async ()=>{
    const resultado = await axios.get(url)
    console.log(resultado.data)
  })();
}catch(error){
  console.log(error);
} //Si se produce el error , no llegaremos al catch, no sera capturada. El try y el catch van dentro del módulo, porque este es como un agujero negro. En este caso desde try perdemos el contextos y por eso no llegamos a capturar el error

//Caso 3.b --Axios + gestion de error con catch
(async ()=>{
  try{
    const resultado = await axios.get(url)
    console.log(resultado.data)
  } catch (error){
    console.log('Error 3.b',error)
  }
})();