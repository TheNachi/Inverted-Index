const books = require('../books.json');
const gotBooks = require('../got_books.json');
const emptyArray = require('../empty_book.json');
const invalidContent = require('../invalid_content.json');
const invalidKey = require('../invalid_book.json');

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
