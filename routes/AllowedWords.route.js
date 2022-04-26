const express = require('express');
const router = express.Router();

//Controlador
const {
  getActiveWords,
  createNewWord,
  getWordById,
  updateWord,
  deleteWord
} = require('../controllers/AllowedWords.controller');

//Rutas que pueden ser utilizadas en la API
router.get('/', getActiveWords); //Obtener las palabras que estén activas
router.post('/', createNewWord); //Crea una nueva palabra
router.get('/:id', getWordById); //Obtiene una palabra a través de una id
router.put('/:id', updateWord); //Actualiza una palabra
router.delete('/:id', deleteWord); //Elimina (lógicamente hablando) una palabra

module.exports = router;