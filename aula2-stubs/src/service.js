const https = require('https');

class Service {
    // funcção para fazer uma chamada a uma api,
    // passando como parametro a url
    async makeRequest(url){
        // retorna uma promise
        return new Promise((resolve, reject) =>{
            // faz a requisição passando a url e retorna uma resposta
            https.get(url, response => {
                // se der certo, resolve os dados retornados
                response.on('data', data => resolve(JSON.parse(data)))
                // se der erro chama o reject
                response.on('error', reject)
            })
        })
    }

    //função para tratar o retorno da api
    async getPlanets(url) {

        // pegar o retorno da api
        const result = await this.makeRequest(url)

        // 'mapear' o retorno
        return {
            name: result.name,
            surfaceWater: result.surface_water,
            appearedIn: result.films.length
        }
    }
}
module.exports = Service