const textService = require("./../services/text.service")

async function preguntaTexto(req, res){

    const mensaje = req.body.mensaje;

    const {data} = await textService.enviarTexto(mensaje);

    res.status(200).json({respuesta: data.choices[0].message.content});
} 


module.exports = {
    preguntaTexto
}