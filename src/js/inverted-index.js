
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
    if (this.validateFile(fileContent)) {
      for (const value of fileContent) {
        const title = value.title;
        const text = value.text;
        const mergeWords = `${title} ${text}`;
        completeIndex.push(this.tokenize(mergeWords.split(' ')));
      }
    }
    return this.storeIndex(fileName, completeIndex);
  }

  storeIndex(fileName, completeIndex) {
    const wordIndex = {};
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
    return this.index[fileName] = wordIndex;
    

  }

  getIndex(fileName) {
    return this.index[fileName];
  }

  search(fileName, terms) {
    const searchResult = {};
    const allFiles = this.index;
    terms = terms.toLowerCase().replace(/[^A-Za-z]/g, '');

    searchResult[fileName] = {};
      if (allFiles[fileName][terms]) {
        searchResult[fileName][terms] = allFiles[fileName][terms];
      } else {
        searchResult[fileName][terms] = [];
      }

    return searchResult;
  }

  searchIndex(fileName, terms) {
    const searchResult = [];
    const allFiles = this.index;

    if (fileName === 'all') {
      for (const file in allFiles) {
        const search = this.search(file, terms);
        searchResult.push(search);
      }
    } else {
      const search = this.search(fileName, terms);
      searchResult.push(search);
    }
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
