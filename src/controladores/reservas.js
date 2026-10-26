//Esta funcion crearControladorReservas es la que se va a exportar a app.js y es la que contiene todas las funciones que van a manejar las rutas de reservas. Esta funcion recibe como parametro el servicio de reservas, que es el que contiene la logica de negocio de las reservas. Esto es una forma de inyeccion de dependencias, ya que el controlador no tiene que conocer como se implementa el servicio de reservas, solo tiene que conocer la interfaz del servicio. Esto permite cambiar la implementacion del servicio de reservas sin tener que cambiar el controlador.
function crearControladorReservas(servicioReservas) { //el parametro servicio es el que se va a inyectar desde app.js, y es el que contiene la logica de negocio de las reservas
    function listar(req, res) {
        res.status(200).render("reservas/lista", {
            titulo: "Reservas",
            reservas: servicioReservas.listar(), 
        });
    }
    function mostrarFormulario(req, res) {
        res.status(200).render("reservas/nueva", {
            titulo: "AGREGUE UNA NUEVA RESERVA",
            error: null,
            valores: {}, 
        });
    }
    function mostrarDetalle(req, res) {
        const id = Number(req.params.id); //Vamos a hacer un req(solicitud) donde params.id es el id que viene en la url, y lo convertimos a numero para poder compararlo con los ids de las reservas que son numeros
        const reserva = servicioReservas.obtenerPorId(id);
        if (!reserva) {
            return res.status(404).render("no-encontrado", {
                titulo: "No se encontro reserva",
                mensaje: "No existe reserva con ese identificador.",
            });
        }
        res.status(200).render("reservas/detalle", {
            titulo: reserva.estudiante,
            reserva,
        });
    }
    function crear(req, res) {
        servicioReservas.crear(req.reservaValidada);
        res.redirect("/reservas");
    }
    function listarApi(req, res) {
        res.json(servicioReservas.listar());
    }
    function verEstado(req, res) {
        res.status(200).json({
            servicio: "activo",
            reservas: servicioReservas.listar().length, //Esto muestra la cantidad de reservas guardadas en el array
            //le agregaremos codigos de reservas para ver los en /estado
            codigosReservas: servicioReservas
                .listar()
                .map((reserva) => `BIB-${String(reserva.id).padStart(4, "0")}`), //padStart(4, "0") sirve para que el id de la reserva tenga 4 digitos, agregando ceros a la izquierda si es necesario. Ej: BIB-0001, BIB-0002, BIB-0003
            solicitudId: res.locals.solicitudId, //Esta linea mmuestra la cantidad de solicitudes hechas y se suma en 1 por cada actualizacion
        });
    }

    return { listar, mostrarFormulario, mostrarDetalle, crear, listarApi, verEstado,};
}
module.exports = { crearControladorReservas }; //esto se exporta a app.js
