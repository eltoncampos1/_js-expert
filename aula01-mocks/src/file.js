class File {
  static async cvsToJson(filePath) {
    return "heloo";
  }
}

(async () => {
  const result = await File.cvsToJson("./../mocks/theeitems-valid.csv");
  console.log("result", result);
})();
