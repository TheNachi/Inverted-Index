
class InvertedIndex {

  constructor() {
    this.index = {};
  }

  tokenize(indexes) {
    return indexes.map(word => word.toLowerCase()
      .replace(/[^A-Za-z]/g, '')).sort();
  }

  createIndex(fileName, fileContent) {
    const completeIndex = [];
    const wordIndex = {};
    if (this.validateFile(fileContent)) {
      fileContent.forEach((value) => {
        const title = value.title;
        const text = value.text;
        const mergeWords = `${title} ${text}`;
        completeIndex.push(this.tokenize(mergeWords.split(' ')));
      });
    }
    for (const index in completeIndex) {
      const indexToInt = parseInt(index, 10);
      completeIndex[index].forEach((word) => {
        if (wordIndex[word]) {
          if (wordIndex[word].indexOf(indexToInt) === -1) {
            wordIndex[word].push(indexToInt);
          }
        } else {
          wordIndex[word] = [indexToInt];
        }
      });
    }
    this.index[fileName] = wordIndex;
  }

  getIndex(fileName) {
    return this.index[fileName];
  }

  searchIndex(fileName, terms) {
    const searchResult = [];
    const search = {};
    search[fileName] = {};
    fileName = fileName || Object.keys(this.index);
    if (this.index[fileName][terms]) {
      search[fileName][terms] = this.index[fileName][terms];
    }
    searchResult.push(search);
    return searchResult;
  }

  validateFile(file) {
    this.file = file;
    let check = true;
    try {
      const jsonFile = JSON.parse(JSON.stringify(this.file));
      if (jsonFile.length === 0) {
        check = false;
      }
      jsonFile.forEach((key) => {
        if (typeof key.title !== 'string' || typeof key.text !== 'string') {
          check = false;
        }
      });
    } catch (error) {
      check = false;
    }
    return check;
  }
}
