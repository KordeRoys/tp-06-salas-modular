const path = require("node:path");
const { leerConfiguracion } = require("./configuracion"); //* configuracion.js
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

const reservas = [
  {
    id: 1,
    estudiante: "Juan",
    email: "juan@hotmail.com",
    sala: "Sala Norte",
    fecha: "27/10/26",
    turno: "Mañana",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "Pedro",
    email: "jpedro@hotmail.com",
    sala: "Sala Sur",
    fecha: "28/10/26",
    turno: "Tarde",
    personas: 1,
  },
  {
    id: 3,
    estudiante: "Eugenia",
    email: "eugeniao@hotmail.com",
    sala: "Sala Multimedia",
    fecha: "28/10/26",
    turno: "Tarde",
    personas: 1,
  },
  {
    id: 4,
    estudiante: "Carina",
    email: "carina@hotmail.com",
    sala: "Sala Norte",
    fecha: "28/10/26",
    turno: "Tarde",
    personas: 1,
  },
];

const { puerto, formatoRegistro } = leerConfiguracion(); //* configuracion.js 
const servicioReservas = crearServicioReservas(reservas); // *servicios/reservas.js
const app = crearApp({ servicioReservas, formatoRegistro }); //crearApp contiene dentro de si todas las rutas y controladores, y recibe como parametro el servicioReservas que contiene la logica de negocio de las reservas

app.listen(puerto, () => {
  console.log(`Aplicación disponible en http://localhost:${puerto}`);
});
