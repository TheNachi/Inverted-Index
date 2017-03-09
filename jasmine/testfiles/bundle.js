(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[]
},{}],3:[function(require,module,exports){
module.exports=[
  {
    "title": "Lord Snow",
    "text": "First of His Name, King of the Andals and the First Men, Lord of the Seven Kingdoms, and Protector of the Realm."
  },

  {
    "title": "The Nights Watch Vow.",
    "text": "Night gathers, and now my watch begins. It shall not end until my death." 
  }
]
},{}],4:[function(require,module,exports){
module.exports=[
  {
    "title": "I am ME",
    "text": "And so it began in the land of the merkies"
  },
  {
    "title": "I am ME",
    "takenis": "And so it began in the land of the merkies"
  }
]

},{}],5:[function(require,module,exports){
module.exports=[
  {
    "title": "I am ME",
    "text": "And so it began in the land of the merkies"
  },
  {
    "title": "I am ME",
    "text": 47382
  }
]
},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
const books = require('../books.json');
const gotBooks = require('../got_books.json');
const emptyArray = require('../empty_book.json');
const invalidContent = require('../invalid_content.json');
const invalidFile = require('../invalid_file.css');
const invalidKey = require('../invalid_book.json');


const index = new InvertedIndex();

index.createIndex(books, 'books.json');
index.createIndex(gotBooks, 'got_books.json');

describe('Test for validation of file', () => {
  it('Should have keys named \'title\' and \'text\' with string for values', () => {
    expect(index.fileValidation(invalidContent)).toBe('Invalid file');
    expect(index.fileValidation(invalidKey)).toBe('Invalid file ');
  });
  it('Should not be an empty file', () => {
    expect(index.fileValidation(emptyArray)).toBe('Empty file');
  });
  it('Should not be an invalid file', () => {
    expect(index.fileValidation(invalidFile)).toBe('Invalid file');
    expect(index.fileValidation(books)).toBe('Valid file');
    expect(index.fileValidation(gotBooks)).toBe('Valid file');
  });
});

describe('Cleans up JSON file and return unique words in array', () => {
  const bookToCleanUp = [{ title: 'Alice , / ?', text: 'enters a a.' }];

  it('should return " array " for a valid json file input', () => {
    expect(typeof (index.cleanup(`${bookToCleanUp[0].title} ${bookToCleanUp[0].text}`))).toBe(typeof ([]));
  });

  it('should return "an array of books with filtered contents"', () => {
    expect(index.removeDoubleWords(`${bookToCleanUp[0].title} ${bookToCleanUp[0].text}`)).toEqual(
            ['alice', 'enters', 'a']
        );
  });
});

},{"../books.json":1,"../empty_book.json":2,"../got_books.json":3,"../invalid_book.json":4,"../invalid_content.json":5,"../invalid_file.css":6}]},{},[7]);
