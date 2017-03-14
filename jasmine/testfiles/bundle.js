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

const index = new InvertedIndex();

describe('Test to check if uploaded file is valid', () => {
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

describe(' ', () => {
  const createIndexObject = index.createIndex('books.json', books);
  it('should return true for object type ', () => {
    expect(typeof createIndexObject).toBe('object');
  });
  it('should return true for object type ', () => {
    expect(typeof createIndexObject).not.toBe('array');
  });
  it('should return true', () => {
    expect(createIndexObject.hasOwnProperty('alice')).toBe(true);
    expect(createIndexObject.hasOwnProperty('wonderland')).toBe(true);
  });
  it('should return false', () => {
    expect(createIndexObject.hasOwnProperty('eiie')).toBe(false);
    expect(createIndexObject.hasOwnProperty('justapose')).toBe(false);
  });
  it('should return', () => {
    expect(createIndexObject.alice).toBe[0];
    expect(createIndexObject.rabbit).toBe[0];
  });
  it('should return', () => {
    expect(createIndexObject.alliance).toBe[1];
    expect(createIndexObject.hobbit).toBe[1];
  });
  it('should return', () => {
    expect(createIndexObject.alanta).toBe(undefined);
    expect(createIndexObject.Honda).toBe(undefined);
  });
});

describe(' ', () => {
  const bookArray = [['a',
    'a',
    'alice',
    'alice',
    'and',
    'enters',
    'falls',
    'full',
    'hole',
    'imagination',
    'in',
    'into',
    'of',
    'rabbit',
    'wonderland',
    'world'],
  ['a',
    'alliance',
    'an',
    'and',
    'destroy',
    'dwarf',
    'elf',
    'fellowship',
    'hobbit',
    'lord',
    'man',
    'of',
    'of',
    'of',
    'powerful',
    'ring',
    'ring',
    'rings',
    'seek',
    'the',
    'the',
    'the',
    'the',
    'to',
    'unusual',
    'wizard']];
  const search = index.storeIndex(books, bookArray);
  it('should return', () => {
    expect(typeof search).toBe('object');
  });
  it('should return true for object type ', () => {
    expect(typeof search).not.toBe('string');
  });
  it('should return true', () => {
    expect(search.hasOwnProperty('falls')).toBe(true);
    expect(search.hasOwnProperty('hole')).toBe(true);
  });
  it('should return false', () => {
    expect(search.hasOwnProperty('minimal')).toBe(false);
    expect(search.hasOwnProperty('sucks')).toBe(false);
  });
  it('should return', () => {
    expect(search.into).toBe[0];
    expect(search.of).toBe[0];
  });
  it('should return', () => {
    expect(search.lord).toBe[1];
    expect(search.powerful).toBe[1];
  });
  it('should return', () => {
    expect(search.darklord).toBe(undefined);
    expect(search.nothing).toBe(undefined);
  });
});

describe(' ', () => {
  const get = index.getIndex(books);
  it('should return true for object type ', () => {
    expect(typeof get).toBe('object');
  });
  it('should return true for object type ', () => {
    expect(typeof get).not.toBe('integer');
  });
  it('should return true', () => {
    expect(get.hasOwnProperty('alice')).toBe(true);
    expect(get.hasOwnProperty('wonderland')).toBe(true);
  });
  it('should return false', () => {
    expect(get.hasOwnProperty('eiie')).toBe(false);
    expect(get.hasOwnProperty('justapose')).toBe(false);
  });
  it('should return', () => {
    expect(get.alice).toBe[0];
    expect(get.rabbit).toBe[0];
  });
  it('should return', () => {
    expect(get.alliance).toBe[1];
    expect(get.hobbit).toBe[1];
  });
  it('should return', () => {
    expect(get.alanta).toBe(undefined);
    expect(get.Honda).toBe(undefined);
  });
});

},{"../books.json":1,"../empty_book.json":2,"../got_books.json":3,"../invalid_book.json":4,"../invalid_content.json":5}]},{},[6]);
