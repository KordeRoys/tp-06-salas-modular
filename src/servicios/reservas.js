function crearServicioReservas(datosIniciales) {
  const reservas = [...datosIniciales];

  function listar() {
    return [...reservas];
  }

  function obtenerPorId(id) {
    return reservas.find((reserva) => reserva.id === id) ?? null; //Lo que antes estaba en index.js ahora pasa al servicio
  }

  function crear(datosValidados) {
    const ultimoId = reservas.reduce(
      (mayor, reserva) => Math.max(mayor, reserva.id),
      0,
    );
    const nuevo = { id: ultimoId + 1, ...datosValidados };
    reservas.push(nuevo);
    return nuevo;
  }
  return { listar, obtenerPorId, crear };
}

module.exports = { crearServicioReservas };
