const express = require("express");
const {prepararAreaReservas, validarDatosReserva } = require("../middleware/reservas");

function crearRouterReservas(reservaControlador) {
  const router = express.Router();
  router.use(prepararAreaReservas); //

  router.get("/", reservaControlador.listar); //listar, mostratFormulario, mostrarDetalle, crear, listarApi, verEstado no vienen de ./controlador/reservas, sino que es solo el parametro que se le pasa a la funcion crearRouterReservas, y van a usar los endpoints
  router.get("/nueva", reservaControlador.mostrarFormulario);
  router.get("/estado", reservaControlador.verEstado);
  router.get("/:id", reservaControlador.mostrarDetalle);
  router.post("/", validarDatosReserva, reservaControlador.crear); //ValidarProducto es lo que primero se llama, si esto sale bien recien llama al Next que entra al controladorProducto
  return router; 
}
module.exports = { crearRouterReservas }; //estos modulos se exportan aapp.js
