const { readFile } = require("fs/promises");
const { join } = require("path");

class File {
  static async cvsToJson(filePath) {
    const content = await File.getFileContent(filePath);
    return content;
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath);
    return (await readFile(fileName)).toString("utf8");
  }
}

(async () => {
  // const result = await File.cvsToJson("../mocks/threeItems-valid.csv");
  const result = await File.cvsToJson("../mocks/fourItems-invalid.csv");
  console.log("result", result);
})();
