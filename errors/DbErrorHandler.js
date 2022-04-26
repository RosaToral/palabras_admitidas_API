
/*
  Función que regresa un estado de error cuando en la base de datos no se encuentra el documento que coíncida con la búsqueda
  Parámetros response; custom_message: String, el mensaje que se va a enviar
  Envía una respuesta en formato JSON
*/
const notFoundError = (res, custom_message) => {
  return res.status(404).json({
    status: 404,
    name: "Not found",
    message: "Word Not Found",
    customMessage: custom_message
  });
}

module.exports = {
  notFoundError
}