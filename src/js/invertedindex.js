

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
}
