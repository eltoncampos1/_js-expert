const Service = require('./service')
const sinon = require('sinon')

const { deepStrictEqual } = require('assert')

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
    tatooine: require('./mocks/tattoine.json'),
    alderaan: require('./mocks/alderaan.json')
}

;
(async () => {
//  {
//      // desse modo precisa de internet para testar
//      //criando a instancia de service
//      const service = new Service();
//     // criadno sem stub
//      const withoutStub = await service.makeRequest(BASE_URL_2);
//      console.log(JSON.stringify(withoutStub));
//  }

    const service = new Service();

    // verificar toda vez q chamar a função makeRequest retornas os dados fixos
    const stub = sinon.stub(service, service.makeRequest.name)


    // toda vez que chamar esa função com essa url, vai resolver com o mock
    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    {
        // anotando o esperado do retorno para testar
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            appearedIn: 5
        }

        // gravando o resultado do retorno em uma constante
        const result = await service.getPlanets(BASE_URL_1)
        // verificando se o retorno foi igual ao esperado
        deepStrictEqual(result, expected)
    }
    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            appearedIn: 2
        }

            // gravando o resultado do retorno em uma constante
            const result = await service.getPlanets(BASE_URL_2)
            // verificando se o retorno foi igual ao esperado
            deepStrictEqual(result, expected)
    }
})()