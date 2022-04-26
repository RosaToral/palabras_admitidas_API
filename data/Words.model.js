const {Schema, model} = require('mongoose');

/*
  Esquema de cómo se verá la información en la base de datos
  > word y allow son del tipo String y son campos obligatorios
  > status puede tener sólo dos valores: active o deleted
  > dateCreated es la fecha en que se creó
  > lastDateUpdates es la última fecha en la que se modificó
  > dateDeleted es la fecha en la que se "eliminó" la palabra
*/
const WordSchema = new Schema({
  word: {
    type: String,
    required: true
  },
  allow: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active'
  },
  dateCreated: {
    type: Date,
    default: new Date()
  },
  lastDateUpdated: {
    type: Date,
    default: new Date()
  },
  dateDeleted: {
    type: Date,
    default: undefined
  }
});

//Se crea un modelo con el esquema para la colección words
module.exports = new model('Word', WordSchema);