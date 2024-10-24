const messageService = require("../services/message.service");


async function enviarMensajeTexto(req, res){
    const datos = req.body;
    const nro = datos.nro_whastsapp;
    const msg = datos.mensaje;

    try {
        await messageService.sendMessageText(nro, msg);

        return res.send({mensaje: "Mensaje enviado"});
        
    } catch (error) {
        console.log(error);
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function enviarMensajeImagen(req, res){

    if(!req.file){
        return res.status(422).json({mensaje: "Se requiere imagen"});
    }
    const datos = req.body;
    const nro = datos.nro_whastsapp;
    // imagen
    datos.url_img = `${process.env.URL_BASE}/uploads/${req.file.filename}`;
    // datos.url_img = 'https://maformacion.es/club-marketing-automocion/wp-content/uploads/sites/3/2022/04/post-ventajas-chatbot-telegram.png'
    try {
        await sleep(500);

        console.log(datos);

        const resp = await messageService.sendMessageImage(nro, datos);
        console.log(resp.data);

        const resp2 = await messageService.sendMessageButton(nro, datos);

        return res.send({mensaje: "Mensaje Imagen enviado"});

        
    } catch (error) {
        console.log(error);
    }
}

function enviarMensajeDocumento(req, res){
    const datos = req.body;
    const nro = datos.nro_whastsapp;

    try {
        messageService.sendMessageDocument(nro, msg);
        
    } catch (error) {
        console.log(error);
    }
}

async function enviarMensajeLista(req, res){

    const datos = req.body;
   try {

        const resp = await messageService.sendMessageLista(nro, datos);
        console.log(resp.data);

        return res.send({mensaje: "Mensaje Lista Enviado"});

        
    } catch (error) {
        console.log(error);
    }
}

async function enviarMensajeButton(req, res){

    const datos = req.body;
    const nro = datos.nro_whastsapp;
   try {

        const resp = await messageService.sendMessageButton(nro, datos);
        console.log(resp.data);

        return res.send({mensaje: "Mensaje Lista Enviado"});

        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    enviarMensajeTexto,
    enviarMensajeImagen,
    enviarMensajeDocumento,
    enviarMensajeLista,
    enviarMensajeButton
}
