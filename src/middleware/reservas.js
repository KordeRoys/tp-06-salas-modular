function prepararAreaReservas(req, res, next) {
  //Esta funcion sirve setear la variable res.locals.seccion con el valor "Solicita reserva", que luego se va a usar en la vista para mostrar el titulo de la pagina.
  res.locals.seccion = "Solicita reserva"; //res.locals es un objeto que se puede usar para guardar variables que se van a usar en cualquier parte del codigo, ya que se guarda en el objeto res.locals. Y .seccion es una propiedad que se va a usar en la vista para mostrar el titulo de la pagina en listas.ejs
  console.log("Seccion: " + res.locals.seccion); //Y seccion sirve para mostrar el titulo de la pagina en la vista.
  next();
}

function validarDatosReserva(req, res, next) {
  const estudiante = req.body.estudiante?.trim(); //estudiante? el signo ? sirve para que si estudiante es undefined no tire error, y trim() sirve para quitar los espacios en blanco al principio y al final del string
  const email = req.body.email?.trim();
  const sala = req.body.sala?.trim();
  const fecha = req.body.fecha?.trim();
  const turno = req.body.turno?.trim();
  const personas = Number(req.body.personas);

  if (
    !estudiante ||
    !email.includes("@") ||
    !sala ||
    !fecha ||
    !turno ||
    !Number.isFinite(personas) ||
    (!personas >= 1 && !personas <= 6)
  ) {
    //!personas >= 1 && !personas <=6 significa que si personas es menor a 1 o mayor a 6, entonces es invalido
    return res.status(400).send("Datos ivalidados", {
      titulo: "nueva inscripcion",
      error: "revisa los cambios y elija entre 1 y 6 lugares.",
      valores: req.body,
    });
  }
  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas }; // Esta linea sirve para GUARDAR los datos validados en el objeto req, para que luego se puedan usar en la funcion crearInscripciones
  next(); //En el caso de que no haya casos invalidos continuamos el flujo con next
}

module.exports = { prepararAreaReservas, validarDatosReserva }; //Esto se exporta a /rutas/reservas
