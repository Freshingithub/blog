app.controller('productSelectCtrl', [
  '$scope',
  '$state',
  'dataService',
  function ($scope, $state, dataService) {
    var vm = $scope;
    vm.productsData = dataService.productsData;
    //选择产品
    vm.select = function (items) {
      console.log(items);
      dataService.productsInfo = items;
      $state.go('app.upload-report');
    };
  }
]);