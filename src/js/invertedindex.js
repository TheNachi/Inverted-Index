

class InvertedIndex {

  constructor() {
    this.index = {};
  }

  cleanup(words) {
    return words.trim().replace(/-/g, '')
      .replace(/[.,/#!$%^&@*;:'{}=_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
  }

  removeDoubleWords(words) {
    const clean = InvertedIndex.cleanup(words);
    return clean.filter((item, index) => clean.indexOf(item) === index);
  }

  fileValidation(file) {
    const jsonFile = file;
    let check = {
      status: true,
      msg: 'Valid File'
    };

    try {
      if (typeof file !== 'object' || file.length === 0) {
        check = {
          status: false,
          msg: 'Invalid File'
        };
      }
      jsonFile.forEach((key) => {
        if (key.title === undefined || key.text === undefined) {
          check = {
            status: false,
            msg: 'Invalid File'
          };
        }
      });
    } catch (error) {
      check = {
        status: false,
        msg: 'Invalid File'
      };
    }
    return check;
  }

  createIndex(file, fileContent) {
    const allWords = [];
    for (const word of fileContent) {
      const title = word.title;
      const text = word.text;
      const joinwords = title + ' ' + text;
      allWords.push(this.removeDoubleWords(joinwords.split(' ')));
    }
    this.storeIndex(file, allWords);
  }

  storeIndex(file, allWords) {
    const wordIndex = {};
    for (const item in allWords) {
      let itemToInt = parseInt(item);
      allWords[item].forEach((word) => {
        if (wordIndex[word]) {
          if (wordIndex[word].indexOf(itemToInt) === -1) {
            wordIndex[word].push(itemToInt);
          }
        } else {
          wordIndex[word] = [itemToInt];
        }
      });
    }
    this.index[file] = wordIndex;
  }

  getIndex(file) {
    return this.index[file];
  }

  search(fileName, word) {
    const searchResult = {};
    const cleanUpWord = this.cleanup(word);
    const files = this.index;

    searchResult[fileName] = {};
    cleanUpWord.forEach(() => {
      if (files[fileName][word]) {
        searchResult[fileName][word] = files[fileName][word];
      } else {
        searchResult[fileName][word] = [];
      }
    });
    return searchResult;
  }



}
