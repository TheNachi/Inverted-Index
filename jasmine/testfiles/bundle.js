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
const gotBooks = require('../gotBooks.json');
const emptyBook = require('../emptyBook.json');
const invalidContent = require('../invalidContent.json');
const invalidBook = require('../invalidBook.json');

const index = new InvertedIndex();
const property = Object.prototype.hasOwnProperty;

describe('Validate File', () => {
  it('checks to ensure validity of JSON file', () => {
    expect(InvertedIndex.validateFile(invalidContent)).toBe(false);
    expect(InvertedIndex.validateFile(invalidBook)).toBe(false);
    expect(InvertedIndex.validateFile(emptyBook)).toBe(false);
    expect(InvertedIndex.validateFile(books)).toBe(true);
    expect(InvertedIndex.validateFile(gotBooks)).toBe(true);
  });
});

describe('Tokenize', () => {
  it('should return "an array of words all lowercase and sorted"', () => {
    expect(InvertedIndex.tokenize(['Alice', 'In', 'Wonderland', 'What', 'is', 'she', 'Looking', 'for', 'There'])).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
  it('should return "an array of words only and sorted"', () => {
    expect(InvertedIndex.tokenize(['Ali2ce', 'In', 'Won%de#rland', 'Wh%at', 'i@s', 'she', 'Lo%oking', 'for', 'The$re'])).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
});

// // bad
// console.log(object.hasOwnProperty(key));

// // good
// console.log(Object.prototype.hasOwnProperty.call(object, key));

// // best
// const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
// /* or */
// import has from 'has';
// // ...
// console.log(has.call(object, key));

describe('createIndex ', () => {
  const createIndexObject = index.createIndex('books.json', books);
  it('should return "object" for type of createIndex', () => {
    expect(typeof createIndexObject).toBe('object');
  });
  it('should not be an array', () => {
    expect(typeof createIndexObject).not.toBe('array');
  });
  it('should return true for hasOwnProperty "alice and wonderland"', () => {
    expect(property.call(createIndexObject,'alice')).toBe(true);
    expect(createIndexObject.hasOwnProperty('wonderland')).toBe(true);
  });
  it('should return false for hasOwnProperty "elie and justapose"', () => {
    expect(createIndexObject.hasOwnProperty('eiie')).toBe(false);
    expect(createIndexObject.hasOwnProperty('justapose')).toBe(false);
  });
  it('should return 0 for createIndexObject.(alice and rabbit)', () => {
    expect(createIndexObject.alice).toBe[0];
    expect(createIndexObject.rabbit).toBe[0];
  });
  it('should return 1 for createIndexObject.(alliance and hobbit)', () => {
    expect(createIndexObject.alliance).toBe[1];
    expect(createIndexObject.hobbit).toBe[1];
  });
  it('should return undefined for createIndexObject.(alanta and Honda)', () => {
    expect(createIndexObject.alanta).toBe(undefined);
    expect(createIndexObject.Honda).toBe(undefined);
  });
});

describe('storeIndex', () => {
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
  it('should return "object" for type of storeIndex', () => {
    expect(typeof search).toBe('object');
  });
  it('should not return true for object string', () => {
    expect(typeof search).not.toBe('string');
  });
  it('should return true for hasOwnProperty "falls and hole"', () => {
    expect(search.hasOwnProperty('falls')).toBe(true);
    expect(search.hasOwnProperty('hole')).toBe(true);
  });
  it('should return false for hasOwnProperty "minimal and sucks"', () => {
    expect(search.hasOwnProperty('minimal')).toBe(false);
    expect(search.hasOwnProperty('sucks')).toBe(false);
  });
  it('should return 0 for createIndexObject.(into and of)', () => {
    expect(search.into).toBe[0];
    expect(search.of).toBe[0];
  });
  it('should return 1 for createIndexObject.(lord and powerful)', () => {
    expect(search.lord).toBe[1];
    expect(search.powerful).toBe[1];
  });
  it('should return undefined for createIndexObject.(darklord and nothing)', () => {
    expect(search.darklord).toBe(undefined);
    expect(search.nothing).toBe(undefined);
  });
});

describe('getIndex', () => {
  const get = index.getIndex(books);
  it('should return true for object type ', () => {
    expect(typeof get).toBe('object');
  });
  it('should not return true for integer type ', () => {
    expect(typeof get).not.toBe('integer');
  });
  it('should return true for hasOwnProperty "alice and wonderland"', () => {
    expect(get.hasOwnProperty('alice')).toBe(true);
    expect(get.hasOwnProperty('wonderland')).toBe(true);
  });
  it('should return false for hasOwnProperty "eiie and justapose"', () => {
    expect(get.hasOwnProperty('eiie')).toBe(false);
    expect(get.hasOwnProperty('justapose')).toBe(false);
  });
  it('should return 0 for createIndexObject.(alice and rabbit)', () => {
    expect(get.alice).toBe[0];
    expect(get.rabbit).toBe[0];
  });
  it('should return 1 for createIndexObject.(alliance and hobbit)', () => {
    expect(get.alliance).toBe[1];
    expect(get.hobbit).toBe[1];
  });
  it('should return undefined for createIndexObject.(alanta and honda)', () => {
    expect(get.alanta).toBe(undefined);
    expect(get.Honda).toBe(undefined);
  });
});

describe('searchIndex', () => {
  index.getIndex(books);
  index.getIndex(gotBooks);
  const search = index.searchIndex(books, 'alice');
  const search2 = index.searchIndex(books, 'anja');
  const search3 = index.searchIndex('all', 'hole');
  const search4 = index.searchIndex('all', 'debby');
  it('should expect typeof to be array', () => {
    expect(Array.isArray(search)).toBe(true);
  });
  it('should expect typeof to be array', () => {
    expect(Array.isArray(search3)).toBe(true);
  });
  it('should expect "alice" to be in books', () => {
    expect(search[0].alice).toBe[1];
  });
  it('should expect "anja" not to be in books ', () => {
    expect(search2[0].anja).toBe(undefined);
  });
  it('should expect "search for hole in all" to return [0]', () => {
    console.log('here', search3[0]['books.json']);
    expect(search3[0]['books.json']).toBe[{ hole: [0] }];
  });
  it('should expect "search for debby in all" to return undefined', () => {
    expect(search4.debby).toBe(undefined);
  });
});

},{"../books.json":1,"../emptyBook.json":2,"../gotBooks.json":3,"../invalidBook.json":4,"../invalidContent.json":5}]},{},[6]);
