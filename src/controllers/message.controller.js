const menssageService = require("../services/message.service");


async function enviarMensajeTexto(req, res){
    const datos = req.body;
    const nro = datos.nro_whastsapp;
    const msg = datos.mensaje;

    try {
        await menssageService.sendMessageText(nro, msg);

        return res.send({mensaje: "Mensaje enviado"});
        
    } catch (error) {
        console.log(error);
    }

}

function enviarMensajeImagen(req, res){
    const datos = req.body;
    const nro = datos.nro_whastsapp;
    // imagen
    const msg = datos.mensaje;

    try {
        menssageService.sendMessageImage(nro, msg);
        
    } catch (error) {
        console.log(error);
    }
}

function enviarMensajeDocumento(req, res){
    const datos = req.body;
    const nro = datos.nro_whastsapp;
    const msg = datos.mensaje;

    try {
        menssageService.sendMessageDocument(nro, msg);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    enviarMensajeTexto,
    enviarMensajeImagen,
    enviarMensajeDocumento
}
