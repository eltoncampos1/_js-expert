const { readFile } = require("fs/promises");
const User = require("./user")
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};
class File {
  static async cvsToJson(filePath) {
    // pega o conteudo do arquivo
    const content = await File.getFileContent(filePath);
    // faz a verificação do arquivo
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    // chamando a função para converter csv to Json 
    const users = File.parseCSVToJSON(content)
    return users
  }
  // funçãp que recebe um path para o arquivo a ser retornado
  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  // função para validação, recebe o conteudo a ser testado e as opções para testar
  
  static isValid(csvString, options = DEFAULT_OPTIONS) {
    //pegando o header do arquivo csv e separando do resto do conteudo
    const [header, ...fileWithoutHeader] = csvString.split("\n");

    //verificando se o header é valido 
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    // veficando se o arquivo tem mais ou = as opções de teste (3 linas no caso) excluindo o header
    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGHT_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  // função para transformar csv em json
  static parseCSVToJSON(csvString) {
    // separa linhas por quenra de linhas
    const lines = csvString.split('\n');

    // remove o pimeiro item e joga na variavel
    const firstLine = lines.shift();

    // pega todos os elementos do header separados por virgula
    const header = firstLine.split(',')

    const users = lines.map(line => {
      // separar as colunas pelas virgulas
      const columns = line.split(',');
      let user = {}

      for (const index in columns) {
        //passar o valor do header que está no index, para a coluna no index
        // ex header na posição 0 = id, coluna na posição 0 = 123
        user[header[index]] =columns[index]
      }

      return new User(user);
    })

    return users
  }
}


module.exports = File