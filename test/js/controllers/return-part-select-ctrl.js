app.controller('returnPartSelectCtrl', [
  '$scope',
  'dataService',
  function ($scope, dataService) {
    var vm = $scope;
    vm.returnPartList = dataService.returnPartList;
    console.log(vm.returnPartList);
  }
]);