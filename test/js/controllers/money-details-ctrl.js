app.controller('moneyChangeDetailsCtrl', [
  '$scope',
  '$stateParams',
  'walletBalanceModel',
  'dataService',
  '$state',
  function ($scope, $stateParams, walletBalanceModel, dataService, $state) {
    var vm = $scope;
    var orderId = $stateParams.orderId;
    //获取费用详情
    var balanceDetails = function (orderId) {
      var params = {};
      var promise = walletBalanceModel.balanceDetails(params, orderId);
      promise.then(function (value) {
        vm.data = value;
      });
    };
    vm.checkOrderId = function () {
      if (vm.data.other) {
        $state.go('app.order-details', { orderId: vm.data.other });
      } else if (vm.data.orno) {
        weui.alert('\u60a8\u6ca1\u6709\u8be5\u8ba2\u5355\uff0c\u8bf7\u4e0e\u5de5\u4f5c\u4eba\u8054\u7cfb\u67e5\u8be2');
      }
    };
    balanceDetails(orderId);
  }
]);