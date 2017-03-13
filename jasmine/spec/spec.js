const books = require('../books.json');
const gotBooks = require('../got_books.json');
const emptyArray = require('../empty_book.json');
const invalidFile = require('../invalid_file.json');
const invalidContent = require('../invalid_content.json');
const invalidKey = require('../invalid_book.json');

const sampleBook = [{ title: 'Alice In Wonderland', text: 'What is she Looking for There' }];
const sampleBook2 = [{ title: 'Al@#ice 4 @# In Wonderland', text: 'Wh#at is she Lo#$oking for Th!@ere' }];

const index = new InvertedIndex();

index.createIndex(books, 'books.json');
index.createIndex(gotBooks, 'got_books.json');

describe('Test to check if uploaded file is valid', () => {
  it('Should have keys named \'title\' and \'text\' with string for values', () => {
    expect(index.validateFile(invalidContent)).toBe('Invalid file');
    expect(index.validateFile(invalidKey)).toBe('Invalid file ');
  });
  it('Should not be an empty file', () => {
    expect(index.validateFile(emptyArray)).toBe('Inavlid file');
  });
  it('Should contain an object', () => {
    expect(index.validateFile(invalidFile)).toBe('Invalid file');
  });
  it('Should not be an Invalid file', () => {
    expect(index.validateFile(books)).toBe('Valid file');
    expect(index.validateFile(gotBooks)).toBe('Valid file');
  });
});

describe('Cleans up index and returns unique words in an array all lowercase', () => {
  it('should return "an array of words all lowercase and sorted"', () => {
    expect(index.tokenize(`${sampleBook[0].title} ${sampleBook[0].text}`)).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
  it('should return "an array of words only and sorted"', () => {
    expect(index.tokenize(`${sampleBook2[0].title} ${sampleBook2[0].text}`)).toEqual(
            ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']
        );
  });
});

describe('Accepts File and Filecontent, converts filecontent to array and calls storeIndex on it', () => {
  it('should return "File name and a sorted tokenized array of file contents"', () => {
    expect(index.createIndex(sampleBook)).toBe(
      index.storeIndex(sampleBook, ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland'])
    );
  });
  it('should return "Invalid file"', () => {
    expect(index.createIndex(invalidContent)).toBe('Invalid file');
    expect(index.createIndex(invalidKey)).toBe('Invalid file ');
  });
});

describe('Accepts file name and array of words and returns index of words', () => {
  it('should return""', () => {
    index.storeIndex(sampleBook, ['alice', 'for', 'in', 'is', 'looking', 'she', 'there', 'what', 'wonderland']).toBe(

    );
  });
});
