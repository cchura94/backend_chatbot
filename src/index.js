const express = require("express");


require('dotenv').config() // process.env.PORT
const router = require("./routes")

const app = express();
app.use(express.json()); // req.body (json)

// rutas
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Servidor Iniciado en : "+process.env.PORT);
})


