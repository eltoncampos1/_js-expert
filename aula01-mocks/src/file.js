const { readFile } = require("fs/promises");
const { join } = require("path");

const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};
class File {
  static async cvsToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    return content;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);
    return (await readFile(fileName)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeaders] = csvString.split("\r\n");
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
  }
}

(async () => {
  // const result = await File.cvsToJson("../mocks/threeItems-valid.csv");
  // const result = await File.cvsToJson("../mocks/fourItems-invalid.csv");
  const result = await File.cvsToJson("../mocks/invalid-header.csv");
  console.log("result", result);
})();
