const axios = require("axios")

const urlBase = "https://api.openai.com/v1/chat/completions";

const httpOpenAi = () => {

    const api = axios.create({
        baseURL: urlBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ process.env.OPENAI_API_KEY
        }
    });

    api.interceptors.request.use(
        (config) => {
            console.log("!!! INTERCEPTOR de SOLICITUD OPENAI ACTIVADO");
            return config;
        },
        (error) => {
            console.log("!!! ERROR OPENAI en AXIOS");

            if(error.response.status ===401){
                console.log("ERROR 401")
            }
            return Promise.reject(error);

        }
    );
    
    return api;
}

module.exports = httpOpenAi;