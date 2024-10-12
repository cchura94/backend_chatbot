const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
var morgan = require('morgan')
const sequelize = require("./database/conexion")


require('dotenv').config() // process.env.PORT

// conexion con sql (postgresql)
async function testConexionPostgres(){
    try {
        await sequelize.authenticate();
        console.log('CONEXION CORRECTA CON POSTGRES.');
      } catch (error) {
        console.error('ERROR DE CONEXION CON POSTGRES:', error);
      }
}

testConexionPostgres();

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
app.use(morgan('dev'))

app.use(express.static('public'));

app.use(express.json()); // req.body (json)
// cors
app.use(cors())

// rutas
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Servidor Iniciado en : "+process.env.PORT);
})


