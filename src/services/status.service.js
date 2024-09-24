const metaService = require("./../services/meta.service")

const sendMessageStatus = (message, status="read") => {
    
    metaService().post("/messages", {
        messaging_product: "whatsapp",
        status: status,
        message_id: message.id,
      })
}

module.exports = {
    sendMessageStatus
}