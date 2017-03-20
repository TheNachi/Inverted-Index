/* eslint-disable no-undef */
const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
  const index = new InvertedIndex();

  $scope.showTable = false;
  $scope.searchResults = false;
  $scope.titles = [];
  $scope.docCount = {};

  /**
   *
   *
   * @param {any} msg
   * @returns {error} msg
   */
  function status(msg) {
    $scope.message = msg;
    $('#myModal').modal();
    $scope.$apply();
  }

  $scope.uploadFile = (fileName, fileContent) => {
    if (fileName.toLowerCase().match(/\.json$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          $scope.content = JSON.parse(e.target.result);
          if (!($scope.content[0] && $scope.content[0].title)) {
            status('Invalid JSON file');
            return;
          }
          $scope.$apply(() => {
            $scope.titles.push(fileName);
          });
        } catch (exception) {
          status('Invalid JSON file');
        }
      };
      reader.readAsText(fileContent);
    }
  };

  $scope.createIndex = () => {
    $scope.showTable = true;
    $scope.searchResults = false;
    const fileSearch = $scope.selectedFile;

    if (fileSearch === 'all') {
      $scope.filedata = '';
      status('Select a file to generate index');
      return;
    }
    if (fileSearch === undefined) {
      status('Error! No file selected');
      return;
    }

    $scope.filedata = index.index[fileSearch];

    if ($scope.filedata === undefined) {
      index.createIndex(fileSearch, $scope.content);
      $scope.filedata = index.getIndex(fileSearch);
      $scope.docCount[fileSearch] = [];
      for (let fileNo = 0; fileNo < $scope.content.length; fileNo += 1) {
        $scope.docCount[fileSearch].push(fileNo);
      }
    } else {
      $scope.filedata = index.getIndex(fileSearch);
    }
  };

  $scope.search = () => {
    $scope.showTable = false;
    $scope.searchResults = true;
    const searchValue = $scope.terms;
    const fileSearch = $scope.searchFile;

    if (searchValue === '' || searchValue === undefined) {
      status('Enter at least a term');
    }
    const result = index.searchIndex(fileSearch, searchValue);
    delete result[0].all;
    $scope.searchResult = result;
  };
});


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('uploadJSON')
    .addEventListener('change', (e) => {
      Object.keys(e.target.files).forEach((file) => {
        const fileName = e.target.files[file].name;
        angular.element(document.getElementById('uploadJSON'))
          .scope().uploadFile(fileName, e.target.files[file]);
      });
    });
});
