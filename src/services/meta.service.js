const axios = require("axios")

const urlBase = "https://graph.facebook.com/v20.0/388467921024360";

const httpMeta = () => {

    const api = axios.create({
        baseURL: urlBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+process.env.GRAPH_API_TOKEN
        }
    });

    api.interceptors.request.use(
        (config) => {
            console.log("!!! INTERCEPTOR de SOLICITUD ACTIVADO");
            return config;
        },
        (error) => {
            console.log("!!! ERROR en AXIOS");

            if(error.response.status ===401){
                console.log("ERROR 401")
            }
            return Promise.reject(error);

        }
    );

    return api;
}

module.exports = httpMeta;
