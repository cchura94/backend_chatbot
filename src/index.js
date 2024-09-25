const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config() // process.env.PORT

// conexion con BD
mongoose.connect(process.env.MONGODB_URI, /*{
    useNewUrlParser: true,
    useUnifiedTopology: true
}*/).then(() => {
    console.log('Conexion a MONGODB Exitosa')
}).catch((err) => {
    console.log('Error de Conexion a MONGODB', err)
})

const router = require("./routes")

const app = express();
app.use(express.json()); // req.body (json)

// rutas
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Servidor Iniciado en : "+process.env.PORT);
})


