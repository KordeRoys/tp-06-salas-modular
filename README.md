# Trabajo práctico 06

## Proyecto de partida y cambios:
Reorganizacion y  estructuracion para un proyecto mas profesional y escalable

## Instalación y ejecución:
npm install express ejs express-ejs-layouts morgan

## Configuración del entorno:
Se necesita tener instalados Node.js y npm. Desde la carpeta del proyecto, instalar las dependencias declaradas en package.json


La aplicación se configura mediante estas variables de entorno:

| Variable  | Valor predeterminado 
|           |           
| PORT      | `3000`    | Puerto HTTP. Debe ser un número entero entre 1 y 65535. |
| NODE_ENV

El archivo .env.example documenta valores de ejemplo. 

## Mapa de módulos y dependencias:


src/
├── index.js                    # Punto de entrada: carga la configuración y crea el servicio y la aplicación
├── configuracion.js            # Lee y valida PORT; elige el formato de Morgan según NODE_ENV
├── app.js                      # Configura Express, middleware global y rutas principales
├── rutas/
│   └── reservas.js             # Define las rutas de reservas y conecta middleware con controladores
├── controladores/
│   └── reservas.js             # Prepara respuestas HTML o JSON usando el servicio
├── servicios/
│   └── reservas.js             # Lista, busca y crea reservas en memoria
└── middleware/
    ├── reservas.js             # Prepara datos de la sección y valida formularios
    └── solicitudes.js          # Identifica solicitudes y registra su duración

views/                           # Plantillas EJS renderizadas por los controladores
public/                          # Archivos estáticos, como CSS


La dependencia principal fluye desde el punto de entrada hacia la aplicación 


`index.js` entrega al servicio los datos iniciales y pasa el servicio a `crearApp`. La aplicación construye el controlador con ese servicio; el router define las URL y el middleware valida las solicitudes antes de que el controlador procese los datos. Las vistas EJS y los recursos de `public/` completan la interfaz.

## Pipeline y contrato de rutas

Flujo de una solicitud:
Solicitud HTTP
  → Morgan registra la solicitud
  → identificarSolicitud asigna un identificador
  → medirDuracion mide cuánto tarda la respuesta
  → Express procesa el cuerpo del formulario o JSON
  → router de reservas (en las rutas /reservas)
      → prepararAreaReservas agrega el nombre de la sección a res.locals
      → middleware de validación (solo al crear una reserva)
      → controlador
  → servicio consulta o modifica las reservas
  → respuesta HTML, JSON o redirección


Las rutas que no coinciden con ninguna definición terminan en el middleware final y reciben una página 404. Las respuestas de las páginas HTML usan las vistas EJS y el layout principal; los archivos de `public/` se sirven como contenido estático.

Contrato de rutas activo:

| Método |       Ruta        | Comportamiento y respuesta 
|        |                   | 
| `GET`  | `/`               | Muestra la página de inicio en HTML. 
| `GET`  | `/estado`         | Devuelve JSON con el estado del servicio, la cantidad de reservas  y los identificadores de solicitud. 
| `GET`  | `/reservas`       | Muestra el listado de reservas en HTML. 
| `GET`  | `/reservas/nueva` | Muestra el formulario HTML para crear una reserva. 
| `GET`  | `/reservas/estado`| Devuelve el estado del servicio en JSON. Esta ruta está declarada antes de `/:id` para que `estado` no se interprete como un identificador. 
| `GET`  | `/reservas/:id`   | Muestra el detalle HTML de la reserva; responde 404 si no existe. 
| `POST` | `/reservas`       | Valida los datos del formulario, crea la reserva y redirige al listado. 

## Matriz antes/después

## Formato y análisis estático

## Persistencia temporal y límites

# Respuestas:
## Por qué el servicio no usa res:
El servicio no usa res porque su responsabilidad es trabajar con los datos de las reservas. res pertenece a Express y se usa para responder al navegador, eso le corresponde al controlador.

## Qué hace el controlador: 
El controlador contiene todas las funciones que van a manejar las rutas de reservas

## Por qué el router declara caminos relativos:
## Dónde vive el único arreglo de reservas y qué ocurrirá con él al reiniciar:
## Indicar los comandosejecutados y sus resultados: