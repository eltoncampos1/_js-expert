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
                "name": "Erick Wendel",
                "id": 123,
                "profession": "Javascript Instructor",
                "birthday": 1996
            },
            {
                "name": "Xuxa da Silva",
                "id": 321,
                "profession": "Javascript Specialist",
                "birthday": 1941
            },
            {
                "name": "Joaozinho",
                "id": 231,
                "profession": "Java Developer",
                "birthday": 1991
            }
        ]


        // verifica se a promisse foi retornado ou rejeitada
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
