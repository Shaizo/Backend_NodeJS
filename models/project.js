'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//La clase Project y los atributos que tiene definidos
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

//module.exports hace que la clase Project se pueda utilizar en todos los archivos
module.exports = mongoose.model('Project', ProjectSchema);
// projects --> guarda los documentos en la colección