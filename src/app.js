const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const { identificarSolicitud, medirDuracion } = require("./middleware/solicitudes"); // middleware/solicitudes.js
const { crearControladorReservas } = require("./controladores/reservas");// controladores/reservas.js
const { crearRouterReservas } = require("./rutas/reservas"); // rutas/reservas.js

function crearApp({ servicioReservas, formatoRegistro }) {
  const app = express();
  const controladorReservas = crearControladorReservas(servicioReservas);
  const reservasRouter = crearRouterReservas(controladorReservas);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");
  app.use(morgan(formatoRegistro));
  app.use(identificarSolicitud);
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).render("inicio", {
      titulo: "Consulta tus reservas",
    });
  });

  app.get("/estado", controladorReservas.verEstado);

  //app.get("/api/reservas", controladorReservas.listarApi);//Esto es para que se pueda acceder a la lista de reservas en formato JSON desde la ruta /api/reservas

  app.use("/reservas", reservasRouter); // /reservas es la ruta base para todas las rutas de reservas, y reservasRouter es el router que contiene todas las rutas de reservas. 
  app.use((req, res) => { //Esto es un middleware que se va a ejecutar cuando no se encuentre ninguna ruta, y va a renderizar la vista no-encontrado.ejs con el mensaje de error 404. Y se va a usar para mostrar un mensaje de error cuando el usuario ingrese una ruta que no exista.
    res.status(404).render("no-encontrado", {
      //Mensaje 404 al final del pipeline
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });
  return app;
}

module.exports = { crearApp }; //Esto se va a exportar a index.js
