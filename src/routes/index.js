const express = require("express");
const webhookController = require("./../controllers/webhook.controller");
const mensajeController = require("../controllers/message.controller");

const router = express.Router();

// recibit notificación
router.post("/webhook", webhookController.funNotificacion);

// verificar (webhook)
router.get("/webhook", webhookController.funVerificacion);

// test
router.get("/", (req, res) => {
    res.send(`<pre>OK</pre>`);
});

// API Rest

router.post("/mensaje/texto", mensajeController.enviarMensajeTexto);
router.post("/mensaje/imagen", mensajeController.enviarMensajeImagen);
router.post("/mensaje/documento", mensajeController.enviarMensajeDocumento);



module.exports = router;
