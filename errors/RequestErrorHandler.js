
/*
  Función que regresa un estado de error cuando el usuario no llena algún campo o no se pasa un parámetro necesario
  Parámetros response; custom_message: String, el mensaje que se va a enviar
  Envía una respuesta en formato JSON
*/
const badRequestError = (res, custom_message) => {
  return res.status(400).json({
    status: 400,
    name: "Bad Request",
    message: "Empty Fields",
    customMessage: custom_message
  });
}

module.exports = {
  badRequestError
}