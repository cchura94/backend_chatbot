const express = require("express");
const multer = require("multer");
const path = require("path");

const webhookController = require("./../controllers/webhook.controller");
const mensajeController = require("../controllers/message.controller");

const router = express.Router();

// configurar para carga de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});


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
router.post("/mensaje/imagen", upload.single('imagen'), mensajeController.enviarMensajeImagen);
router.post("/mensaje/documento", mensajeController.enviarMensajeDocumento);



module.exports = router;
