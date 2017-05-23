app.controller('safeMoneyCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'walletBalanceModel',
  'dataService',
  function ($scope, $stateParams, $state, walletBalanceModel, dataService) {
    var vm = $scope;
    // 质保金
    var safeMoney = function () {
      var params = { token: dataService.userData.token };
      var promise = walletBalanceModel.safeMoney(params);
      promise.then(function (val) {
        // console.log(val);
        vm.data = val;
      });
    };
    safeMoney();
  }
]);