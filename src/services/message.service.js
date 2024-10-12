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
    
    return metaService().post("/messages", {
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
    return metaService().post("/messages", {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "image",
        "image": {
          // "id" : "<MEDIA_ID>", /* Only if using uploaded media */
          "link": img.url_img, /* Only if linking to your media */
          "caption": img.caption
        }
      })
}

const sendMessageLista = (to, img) => {
  return metaService().post("/messages", {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "interactive",
    "interactive": {
        "type": "list",
        "header": {
            "type": "text",
            "text": "Selecciona Tu Plato"
        },
        "body": {
            "text": "Seleccionar 1"
        },
        "footer": {
            "text": "mi empresa"
        },
        "action": {
            "button": "Seleccionar",
            "sections": [
                {
                    "title": "Entrada",
                    "rows": [
                        {
                            "id": "123",
                            "title": "Ensaladas",
                            "description": "este es una prueba"
                        },
                        {
                            "id": "<LIST_SECTION_1_ROW_2_ID>",
                            "title": "<SECTION_1_ROW_2_TITLE>",
                            "description": "<SECTION_1_ROW_2_DESC>"
                        }
                    ]
                },
                {
                    "title": "<LIST_SECTION_2_TITLE>",
                    "rows": [
                        {
                            "id": "<LIST_SECTION_2_ROW_1_ID>",
                            "title": "<SECTION_2_ROW_1_TITLE>",
                            "description": "<SECTION_2_ROW_1_DESC>"
                        },
                        {
                            "id": "<LIST_SECTION_2_ROW_2_ID>",
                            "title": "<SECTION_2_ROW_2_TITLE>",
                            "description": "<SECTION_2_ROW_2_DESC>"
                        }
                    ]
                }
            ]
        }
    }
  })
    
}


const sendMessageButton = (to, data) => {
  return metaService().post("/messages", {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "interactive",
    "interactive": {
        "type": "button",
        "body": {
            "text": "Seleccione una opción"
        },
        "action": {
            "buttons": [
                {
                    "type": "reply",
                    "reply": {
                        "id": "001",
                        "title": "Opción 1"
                    }
                },
                {
                    "type": "reply",
                    "reply": {
                        "id": "002",
                        "title": "Opcion 2"
                    }
                },
                {
                    "type": "reply",
                    "reply": {
                        "id": "003",
                        "title": "Opcion 3"
                    }
                }
            ]
        }
    }
})
    
}


module.exports = {
    sendMessageText,
    sendMessageTextRespuesta,
    sendMessageDocument,
    sendMessageImage,
    sendMessageLista,
    sendMessageButton
}