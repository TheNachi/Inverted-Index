/**
 *
 *
 * @class InvertedIndex
 */
class InvertedIndex {

/**
 * Creates an instance of InvertedIndex.
 *
 * @memberOf InvertedIndex
 */
  constructor() {
    this.index = {};
  }

/**
 *
 *
 * @param {any} indexes
 * @returns
 *
 * @memberOf InvertedIndex
 */
  tokenize(indexes) {
    return indexes.map(word => word.toLowerCase()
      .replace(/[^A-Za-z]/g, '')).sort();
  }

/**
 *
 *
 * @param {any} fileName
 * @param {any} fileContent
 *
 * @memberOf InvertedIndex
 */
  createIndex(fileName, fileContent) {
    const completeIndex = [];
    for (const value of fileContent) {
      const title = value.title;
      const text = value.text;
      const mergeWords = `${title} ${text}`;
      completeIndex.push(this.tokenize(mergeWords.split(' ')));
    }
    this.storeIndex(fileName, completeIndex);
  }

  /**
   * Stores the File Index
   *
   * @param {String} fileName
   * @param {String} fileContents
   */
  storeIndex(fileName, completeIndex) {
    const wordIndex = {};
    for (const pos in completeIndex) {
      const posToInt = parseInt(pos);
      completeIndex[pos].forEach((word) => {
        if (wordIndex[word]) {
          if (wordIndex[word].indexOf(posToInt) === -1) {
            wordIndex[word].push(posToInt);
          }
        } else {
          wordIndex[word] = [posToInt];
        }
      });
    }
    this.index[fileName] = wordIndex;
  }

  /**
   * Get File Index
   *
   * @param {String} fileName
   * @return {Object} returns file contents
   */
  getIndex(fileName) {
    return this.index[fileName];
  }

  /**
   * Search a File
   *
   * @param {String} fileName
   * @param {String} terms
   * @return {Object} returns search results
   */
  searchaFile(fileName, terms) {
    const searchResult = {};
    const tokenizeQuery = this.tokenize(terms);
    const allFiles = this.index;

    searchResult[fileName] = {};
    tokenizeQuery.forEach((term) => {
      if (allFiles[fileName][term]) {
        searchResult[fileName][term] = allFiles[fileName][term];
      } else {
        searchResult[fileName][term] = [];
      }
    });
    return searchResult;
  }

  /**
   * Search Index for 1 or multiple files
   *
   * @param {String} fileName
   * @param {String} terms
   * @return {Array} returns search results
   */
  searchIndex(fileName, terms) {
    const searchResult = [];
    const allFiles = this.index;
    let query = [];

    for (let i = 1; i < arguments.length; i += 1) {
      if (Array.isArray(arguments[i])) {
        query = query.concat(arguments[i]);
      } else {
        query.push(arguments[i]);
      }
    }
    if (fileName === 'all') {
      for (const file in allFiles) {
        const search = this.searchaFile(file, query);
        searchResult.push(search);
      }
    } else {
      const search = this.searchaFile(fileName, query);
      searchResult.push(search);
    }
    return searchResult;
  }
}
