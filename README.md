[![Build Status](https://travis-ci.org/andela-mugorji/Inverted-Index.svg?branch=master)](https://travis-ci.org/andela-mugorji/Inverted-Index)
[![Coverage Status](https://coveralls.io/repos/github/andela-mugorji/Inverted-Index/badge.svg?branch=invertedindex-01-workbranch)](https://coveralls.io/github/andela-mugorji/Inverted-Index?branch=invertedindex-01-workbranch)
[![Code Climate](https://codeclimate.com/github/andela-mugorji/Inverted-Index/badges/gpa.svg)](https://codeclimate.com/github/andela-mugorji/Inverted-Index)

# INVERTED INDEX

## Introduction
An application that builds an index from a JSON array of text objects books in a file and allows you search through the file for words in that array

## Features
1. Uploads JSON file of the below format

```
[
    {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    },

    {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
]
```

2. You can upload multiple files
3. Creates index of the words in the uploaded file(s)
4. Searchs indexed files for selected words


## Why the project is useful
This project enables you perform quick searches on json file of the above format

## How to get started with the project

### Requirements
* Gulp 
* Karma 
* Jasmine 
* Travis CI 
* Coveralls 
* Hound 
* AngularJs 
* Bootstrap 

### Setting up the project 
#### On the web
You can access the app on heroku at
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://m-invertedindex-staging.herokuapp.com/)

#### Locally
* Clone the repository
* Install the dependencies using  `npm install`
* Run `npm start` to start the application.
* The app will start on your local server.
* Run tests with: `npm test`


## Limitations of the project
1. You can only upload json files of the above format

## Contributing to the project
* Fork this repository to your account.
* Clone your repository: git clone git@github.com:your-username/inverted-index.git
* Create your feature branch: git checkout -b new-feature
* Commit your changes: git commit -m "did something"
* Push to the remote branch: git push origin new-feature
* Open a pull request.

## Troubleshooting & FAQ


## License
Internet Systems Consortium (ISC)

