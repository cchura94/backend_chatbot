const axios = require("axios");
const messageService = require("./../services/message.service");
const statusService = require("./../services/status.service");

const funNotificacion = async (req, res) => {
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    let nombre =
      req.body.entry?.[0]?.changes[0]?.value?.contacts[0]?.profile?.name;
    let mensaje = message.text.body;
    
    if(["Hola", "ola", "hola"].includes(mensaje)){
      messageService.sendMessageText(
        message.from,
        "Hola " + nombre + ", en que te puedo ayudar"
      );
    }else{
      messageService.sendMessageTextRespuesta(message.from, `Hola ${nombre}, \n Te ofrecemos estos servicios:\n *A*: Soporte Computadoras\n *B*: Hablar con un asesor`, message.id)
    }

    statusService.sendMessageStatus(message, "read");
  } else if (message?.type === "image") {
    messageService.sendMessageText(message.from, "Me Mandaste una imagen");
  } else if (message?.type === "audio") {
    messageService.sendMessageText(message.from, "Me Mandaste un audio");
  }

  res.sendStatus(200);
};

const funVerificacion = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

module.exports = {
  funNotificacion,
  funVerificacion,
};
