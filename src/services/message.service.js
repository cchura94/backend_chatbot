const metaService = require("./../services/meta.service")

// mensaje de Texto
const sendMessageText = (to, msg) => {
    
    metaService().post("/messages", {
        messaging_product: "whatsapp",
        to: to,
        text: { body: msg },
        // context: {
        //   message_id: message.id, // shows the message as a reply to the original user message
        // },
      })
}

// respuesta a un mensaje
const sendMessageTextRespuesta = (to, msg, id_respuesta) => {
    
    metaService().post("/messages", {
        messaging_product: "whatsapp",
        to: to,
        text: { body: msg },
        context: {
          message_id: id_respuesta, // shows the message as a reply to the original user message
        },
      })
}

const sendMessageDocument = (to, doc) => {
    metaService().post("/messages", {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "document",
        "document": {
          // "id" : "<MEDIA_ID>", /* Only if using uploaded media */
          "link": doc.url, /* Only if linking to your media */
          "caption": doc.caption,
          "filename": doc.filename
        }
      })
}

const sendMessageImage = (to, img) => {
    metaService().post("/messages", {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "image",
        "image": {
          // "id" : "<MEDIA_ID>", /* Only if using uploaded media */
          "link": img.url, /* Only if linking to your media */
          "caption": img.caption
        }
      })
}



module.exports = {
    sendMessageText,
    sendMessageTextRespuesta,
    sendMessageDocument,
    sendMessageImage
}