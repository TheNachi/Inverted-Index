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
    expect(index.validateFile(invalidContent)).toBe('Invalid file');
    expect(index.validateFile(invalidKey)).toBe('Invalid file ');
  });
  it('Should not be an empty file', () => {
    expect(index.validateFile(emptyArray)).toBe('Empty file');
  });
  it('Should not be an invalid file', () => {
    expect(index.validateFile(invalidFile)).toBe('Invalid file');
    expect(index.validateFile(books)).toBe('Valid file');
    expect(index.validateFile(gotBooks)).toBe('Valid file');
  });
});

describe('Cleans up JSON file and return unique words in array', () => {
  const bookToCleanUp = [{ title: 'Alice , / ?', text: 'enters a a.' }];

  it('should return " array " for a valid json file input', () => {
    expect(typeof (index.tokenize(`${bookToCleanUp[0].title} ${bookToCleanUp[0].text}`))).toBe(typeof ([]));
  });

  it('should return "an array of books with filtered contents"', () => {
    expect(index.tokenize(`${bookToCleanUp[0].title} ${bookToCleanUp[0].text}`)).toEqual(
            ['alice', 'enters', 'a']
        );
  });
});
