const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require('assert');

;
(async () => {
    { 
        // pegar o arquivo de mock
        const filePath = "./mocks/emptyFile-invalid.csv";

        // retorno do erro
        const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        // resultado
        const result = File.cvsToJson(filePath)

        // verifica se a promisse foi retornado ou rejeitada
        await rejects(result, rejection)
    }

    {
        const filePath = "./mocks/fourItems-invalid.csv"
         // retorno do erro
         const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
         // resultado
         const result = File.cvsToJson(filePath)
 
         // verifica se a promisse foi retornado ou rejeitada
         await rejects(result, rejection)
    }

    {
        const filePath = "./mocks/threeItems-valid.csv"

        // resultado
        const result = await File.cvsToJson(filePath)

        const expected = [
            {
              "id": 123,
              "name": "Erick Wendel",
              "profession": "Javascript Instructor",
              "age": 25
            },
            {
              "id": 321,
              "name": "Xuxa da Silva",
              "profession": "Javascript Specialist",
              "age": 80
            },
            {
              "id": 231,
              "name": "Joaozinho",
              "profession": "Java Developer",
              "age": 30
            }
          ]

        
        // verifica se a promisse foi retornado ou rejeitada
       deepStrictEqual(result, expected)
    }
})()
