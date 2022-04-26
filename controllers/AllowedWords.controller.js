//Querys para administrar la base de datos
const allowedWordsData = require('../data/AllowedWords.data');

//Manejo de errores
//Debido a que los códigos de error mayormente usados fueron el 400 y el 404, se hicieron dos funciones que se encarguen de crear el mensaje de error correspondiente.
const {notFoundError} = require('../errors/DbErrorHandler');
const {badRequestError} = require('../errors/RequestErrorHandler');

/*
  Función que obtiene y envía todas las palabras que están activas.
  Parámetros: request, response
  Envía un arreglo con la lista de las palabras activas, cada una en formato JSON
*/
const getActiveWords = async (req, res) => {
  const activeWords = await allowedWordsData.getActiveWords();

  if (!activeWords) return notFoundError(res, "No hay palabras guardadas");

  res.status(200).json(activeWords);
}

/*
  Función que crea y envía una nueva palabra-
  Parámetros: request, response
  Envía un JSON con 
*/
const createNewWord = async (req, res) => {
  const {word, allow} = req.body;
  if (!word || allow === undefined) return badRequestError(res, "Debe especificar la palabra a guardar y si es permitida o no");

  let newWord = await allowedWordsData.createNewWord(req.body);

  //Se convierte en un JSON para poder quitar los campos que no son necesarios
  newWord = newWord.toJSON();
  delete newWord.status;
  delete newWord.dateDeleted;
  delete newWord.__v;

  res.status(201).json({
    _id: newWord._id,
    ...newWord
  });
}

/*
  Función que crea y envía una nueva palabra
  Parámetros: request, response
  Envía un JSON con la palabra nueva
*/
const getWordById = async (req, res) => {
  const {id} = req.params;
  if (!id) return badRequestError(res, "Debe seleccionar una palabra");

  const word = await allowedWordsData.getWordById(id);

  if (!word) return notFoundError(res, "No se encontró la palabra especificada");

    res.status(200).json(word);
}

/*
  Función que actualiza y envía una palabra
  Parámetros: request, response
  Envía un JSON con la palabra que se actualizó
*/
const updateWord = async (req, res) => {
  const {id} = req.params;
  const {word, allow} = req.body;

  if (!id || !word || allow === undefined) return badRequestError(res, "Debe llenar todos los campos");

  let updatedWord = await allowedWordsData.updateWord(req.params.id, req.body);

  if (!updatedWord) return notFoundError(res, "No se encontró la palabra especificada");

  //Se convierte en un JSON para poder quitar los campos que no son necesarios
  updatedWord = updatedWord.toJSON();
  delete updatedWord.status;
  delete updatedWord.dateDeleted;
  delete updatedWord.__v;

  res.status(201).json(updatedWord);
}

/*
  Función que elimina y envía una palabra
  Parámetros: request, response
  Envía un JSON con el mensaje `la palabra ${deletedWord.word} ha sido eliminada`
*/
const deleteWord = async (req, res) => {
  const {id} = req.params;
  if (!id) return badRequestError(res, "Debe seleccionar una palabra");

  const deletedWord = await allowedWordsData.deleteWord(id);

  if (!deletedWord) return notFoundError(res, "No se encontró la palabra especificada");

  console.log(deletedWord);

  res.status(200).json({
    status: 200,
    message: `word ${deletedWord.word} deleted`,
    customMessage: `la palabra ${deletedWord.word} ha sido eliminada`
  })
}

module.exports = {
  getActiveWords,
  createNewWord,
  getWordById,
  updateWord,
  deleteWord
}