const mongoose = require("mongoose");

module.exports = async () => {
  try {
    //Coneión con mongodb a través de Mongoose
    //La url puede ser tomada de una variable de entorno
    const uri = process.env.ME_CONFIG_MONGODB_URL || 'mongodb://mongo/allowed_words'

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Conexión a BD establecida"); //Log
  } catch (err) {
    console.log(err); //Log
  }

}