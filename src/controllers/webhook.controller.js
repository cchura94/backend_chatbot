const axios = require("axios");
const messageService = require("./../services/message.service");
const statusService = require("./../services/status.service");
const Cliente = require("../models/cliente.model");
const flujo = require("./../data/flujo1.json")

const procesarFlujo = async (to, currentStep, msg) => {
  const stepData = flujo.flujoInicial.find(f => f.step === currentStep);
  
  if(!stepData) {
    console.log("Flujo completado o no existe el paso actual");
  }

  if(stepData.type === 'text'){
    messageService.sendMessageText(to, stepData.content);
  }else if(stepData.type === 'menu') {
    const menuOptions = stepData.content.options.map(option => `${option.option}: ${option.text}`).join('\n')
    messageService.sendMessageText(to, `Por favor selecciona una opcion:\n ${menuOptions}`);

  }

  if(stepData.nextStep) {
    console.log("termino");
  }
}

const funNotificacion = async (req, res) => {
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    let nombre =
      req.body.entry?.[0]?.changes[0]?.value?.contacts[0]?.profile?.name;
    let mensaje = message.text.body;
    // ----------------------------
    // if(mensaje === "Hola"){
    //   await procesarFlujo(message.from, 1, mensaje)
    // }

    // ----------------------------
   
    if(["Hola", "ola", "hola"].includes(mensaje)){
      messageService.sendMessageText(
        message.from,
        `Hola ${nombre}, ¿En que te puedo ayudar?\n\n *Opciones:*\n*A*: Consultar saldo pendiente\n*B*: Hablar un asesor`
      );
    }else if(mensaje.toUpperCase() === "A"){
      messageService.sendMessageText(message.from, "Por favor envia tu número de identificación para verificar tu saldo pendiente")

    }else if(/^\d+$/.test(mensaje)){
      messageService.sendMessageText(message.from, "Estamos verificando, por favor espera un momento...");

      try {
        let cliente = await Cliente.findOne({nro_identificaion: mensaje})
        console.log(cliente);
        
        if(cliente){
          messageService.sendMessageText(message.from, `Hola ${cliente.nombres}, tu saldo pendiente es de $${cliente.saldo}`)
        }else{
          messageService.sendMessageText(message.from, "No tenemos registrado ningun cliente con el número de identificación");

        }
      } catch (error) {
        messageService.sendMessageText(message.from, "Hubo un error al copnsultar tu saldo, Por favor intenta de nuevo más tarde");

      }
    }else if(mensaje.toUpperCase() === "B"){
      messageService.sendMessageText(message.from, "Gracias, uno de nuestros asesores te contactará en un momento o escribe al 59173277937")

      messageService.sendMessageText(59160572737, "Hola raul, hay una solicitud de un cliente: "+message.from)

    }else{
      messageService.sendMessageTextRespuesta(message.from, `No entiendo tu mensaje ${nombre}. \n Por favor seleccionar una opción del menú:\n *A*: Consultar saldo\n *B*: Hablar con un asesor`, message.id)
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
