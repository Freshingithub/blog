app.controller('safeMoneyDetailsCtrl', [
  '$scope',
  'walletBalanceModel',
  'dataService',
  function ($scope, walletBalanceModel, dataService) {
    var vm = $scope;
    vm.datalist = [];
    // 技工账户余额
    var balanceClear = function () {
      var promise = walletBalanceModel.balanceClear({
          token: dataService.userData.token,
          type: 4
        });
      promise.then(function (val) {
        vm.data = val;
        vm.datalist = val.data_list;
      });
    };
    balanceClear();
  }
]);