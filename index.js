require('dotenv').config();

const express = require('express');
const path = require('path');

//Puerto por donde se lanza la aplicación
//Se pueden asignar variables de entorno a la API
const PORT = process.env.PORT || 3500;

//Configuración de la API para leer objetos JSON y urls
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('', require('./routes/AllowedWords.route'));

app.listen(PORT, async () => {
  require('./connectionDB')(); //Conexión a la base de datos con Moongose
  console.log(`Application running on port: ${PORT}`); //Log
});