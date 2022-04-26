// Modelo de la colección words
const Word = require('./Words.model');


/*
  Función que obtiene y regresa todas las palabras que están activas
  Obtiene los datos id, word, allow, dateCreated y lastUpdated de cada palabra
  Parámetros ninguno
  Regresa un arreglo con las palabras activas
*/
const getActiveWords = () => {
  const activeWords = Word.find({status: 'active'}, {_id: 1, word: 1, allow: 1, dateCreated: 1, lastDateUpdated: 1});

  return activeWords;
}

/*
  Función que crea y regresa una palabra
  Obtiene todos los campos de la base de datos 
  Parámetros word: String, palabra nueva; allow: Boolean, si es una palabra permitida o no
  Regresa un objeto de la nueva palabra
*/
const createNewWord = async ({word, allow}) => {
  const newWord = new Word({
    word,
    allow
  });

  await newWord.save();

  return newWord;
}

/*
  Función que busca y regresa una palabra usando su id
  Obtiene los campos id, word, allow, dateCreater y lastDateUpdated
  Parámetros id: String, identificador de la palabra a buscar
  Regresa un objeto de la palabra encontrada
*/
const getWordById = (id) => {
  const word = Word.findById(id, {_id: 1, word: 1, allow: 1, dateCreated: 1, lastDateUpdated: 1});

  return word;
}

/*
  Función que actualiza y regresa una palabra usando su id
  Obtiene todos los campos de la base de datos 
  Parámetros id: String, identificador de la palabra a actualizar; word: String, palabra nueva; allow: Boolean, si es una palabra permitida o no
  Regresa un objeto de la palabra actualizada
*/
const updateWord = (id, {word, allow}) => {
  const updated = Word.findOneAndUpdate({_id: id}, {
    word: word,
    allow: allow,
    lastDateUpdated: new Date()
  });

  return updated;
}

/*
  Función que elimina y regresa una palabra. No hace una eliminación literal, sólo modifica el campo status de una palabra a 'deleted' y actualiza la fecha en la que fue eliminado
  Parámetros id: String, identificador de la palabra a eliminar
  Regresa un objeto con la palabra eliminada
*/
const deleteWord = (id) => {
  const deleted = Word.findOneAndUpdate({_id: id}, {
    status: 'deleted',
    dateDeleted: new Date()
  })

  return deleted;
}

module.exports = {
  getActiveWords,
  createNewWord,
  getWordById,
  updateWord,
  deleteWord
}