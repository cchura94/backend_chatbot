const express = require("express");
const webhookController = require("./../controllers/webhook.controller")

const router = express.Router();

// recibit notificación
router.post("/webhook", webhookController.funNotificacion);

// verificar (webhook)
router.get("/webhook", webhookController.funVerificacion);

// test
router.get("/", (req, res) => {
    res.send(`<pre>OK</pre>`);
});

module.exports = router;
