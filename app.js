// node no soporta fetch nativamente. Una alternativa es utilizar librerías, server side render.
// Es muy útil para React.js
const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/users";
fetch(url)
  .then((response) => response.json()) // el método json también es asincrono
  .then((users) => {
    users.forEach((user) => {
      console.log(` ${user.name}:${user.email}`);
    });
  });


  