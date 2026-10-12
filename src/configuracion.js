function leerConfiguracion(entorno = process.env) {
  const puerto = Number(entorno.PORT ?? 3000); //?? Operador de coalescencia o fusion nula. Devuelve el operando del lado derecho cuando el operando del lado izquierdo es null o undefined, de lo contrario devuelve el operando del lado izquierdo.
  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error("PORT debe ser un entero entre 1 y 65535");
  }
  const formatoRegistro = //formatoRegistro va a cambiar la forma en que se registran las solicitudes HTTP en la consola.
    entorno.NODE_ENV === "production" ? "combined" : "dev";
  return { puerto, formatoRegistro };
}
module.exports = { leerConfiguracion };
