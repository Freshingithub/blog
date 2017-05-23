app.controller('deleteCardCtrl', [
  '$scope',
  '$state',
  'dataService',
  function ($scope, $state, dataService) {
    var vm = $scope;
    var check_updatecard_password = dataService.check_updatecard_password;
    dataService.check_updatecard_password = undefined;
    vm.goNext = function () {
      dataService.check_updatecard_password = check_updatecard_password;
      $state.go('app.card-details');
    };
  }
]);