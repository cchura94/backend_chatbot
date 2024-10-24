const openAiService = require("./openai.service.js");

const enviarTexto = (pregunta) => {
  const prompt = `
    REQUISITOS PARA OBTENER N.I.T.
CONSULTOR EN LINEA / PRODUCTO

 1. Carnet de Identidad original del consultor

2. Factura de luz vigente del domicilio particular del consultor

3. Correo electrónico habilitado

4. Contrato de la entidad pública (original y fotocopia simple)

5. Croquis del domicilio particular del consultor

EMPRESA UNIPERSONAL

 1. Carnet de Identidad original del propietario

2. Actividad económica a la que se va dedicar

3. Factura de luz vigente del domicilio fiscal

4. Factura de luz vigente del domicilio particular del propietario

5. Correo electrónico habilitado

6. Croquis del domicilio fiscal

7. Croquis del domicilio particular del propietario

SOCIEDADES RESPONSABILIDAD LIMITADA

 1. Carnet de identidad del represente legal original

2. Fotocopia de carnet de identidad de los socios

3. Testimonio de Constitución (original y copia legalizada)

4. Testimonio de Poder Representante Legal (original y copia legalizada

5. Actividad económica a la que se va dedicar

6. Factura de luz vigente del domicilio fiscal

7. Factura de luz vigente del domicilio particular del representante legal

8. Correo electrónico habilitado

9. Croquis del domicilio fiscal

10.       Croquis del domicilio particular del representante legal
    `;

  return openAiService().post("", {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Responde cualquier consulta de manera amigable a los usuarios indicando solamente estos requisitos en no más de 25 palabras. Solo responder a estas consultas y no de otros temas." +
          prompt,
      }, //
      {
        role: "user",
        content: pregunta,
      },
    ],
  });
};



module.exports = {
  enviarTexto,
};
