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
const books = require('../books.json');
const gotBooks = require('../got_books.json');
const emptyArray = require('../empty_book.json');
const invalidContent = require('../invalid_content.json');
const invalidKey = require('../invalid_book.json');

const sampleBook = [{ title: 'Alice In Wonderland', text: 'What is she Looking for There' }];
const sampleBook2 = [{ title: 'Al@#ice 4 @# In Wonderland', text: 'Wh#at is she Lo#$oking for Th!@ere' }];

const index = new InvertedIndex();



describe('Test to check if uploaded file is valid', () => {
  const createIndexObject = index.createIndex('books.json', books);  
  console.log(createIndexObject);

  it('should return true for object type ', () => {
    expect(createIndexObject instanceof Object).toBeTruthy();
  });

  it('should match result with alice: { 0: true }', () => {
    expect(createIndexObject).not.toEqual(jasmine.objectContaining({
      alice: { 0: 0 }
    }));
  });

  it('Should have keys named \'title\' and \'text\' with string for values', () => {
    expect(index.validateFile(invalidContent)).toBe(false);
    expect(index.validateFile(invalidKey)).toBe(false);
  });
  it('Should not be an empty file', () => {
    expect(index.validateFile(emptyArray)).toBe(false);
  });
  it('Should not be an Invalid file', () => {
    expect(index.validateFile(books)).toBe(true);
    expect(index.validateFile(gotBooks)).toBe(true);
  });
});

describe('Cleans up index and returns unique words in an array all lowercase', () => {
  it('should return "an array of words all lowercase and sorted"', () => {
    expect(index.tokenize(['Alice', 'In', 'Wonderland', 'What', 'is', 'she', 'Looking', 'for', 'There'])).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
  it('should return "an array of words only and sorted"', () => {
    expect(index.tokenize(['Ali2ce', 'In', 'Won%de#rland', 'Wh%at', 'i@s', 'she', 'Lo%oking', 'for', 'The$re'])).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
});

// describe('Accepts File and Filecontent, converts filecontent to array and calls storeIndex on it', () => {
  
//   it('should return "File name and a sorted tokenized array of file contents"', () => {
//     expect(index.createIndex(books)).toBe(
//       index.storeIndex(sampleBook, ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland'])
//     );
//   });
//   it('should return "Invalid file"', () => {
//     expect(index.createIndex(invalidContent)).toBe('Invalid file');
//     expect(index.createIndex(invalidKey)).toBe('Invalid file ');
//   });
// });

// describe('Accepts file name and array of words and returns index of words', () => {
//   it('should return""', () => {
//     index.storeIndex(sampleBook, ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']).toBe();
//   });
// });

},{"../books.json":1,"../empty_book.json":2,"../got_books.json":3,"../invalid_book.json":4,"../invalid_content.json":5}]},{},[6]);
