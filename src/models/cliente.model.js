const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    nro_identificaion: {type: String, required: true},
    saldo: {type: Number, required: true}
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente
