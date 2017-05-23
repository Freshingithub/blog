app.controller('walletBalanceCtrl', [
  '$scope',
  '$stateParams',
  'walletBalanceModel',
  'dataService',
  'workerModel',
  '$state',
  function ($scope, $stateParams, walletBalanceModel, dataService, workerModel, $state) {
    var vm = $scope;
    var orderId = $stateParams.orderId;
    dataService.check_crash_password = '';
    dataService.updateCardInfoType = undefined;
    dataService.verify_pre_url = '';
    // 技工账户余额
    var accountBalance = function () {
      var params = { token: dataService.userData.token };
      var promise = walletBalanceModel.accountBalance(params);
      promise.then(function (val) {
        vm.money = val.money;
        vm.incomed = val.incomed;
        vm.extracting = val.extracting;
        vm.order_num = val.order_num;
      });
    };
    vm.goApplyCrash = function () {
      if (dataService.bankCardInfo == undefined) {
        dataService.verify_pre_url = 'applyCrash';
        var promise = workerModel.getWorkerCardDetail();
        promise.then(function (value) {
          if (value.is_pay_password) {
            $state.go('app.verify-password', { type: 5 });
          } else {
            weui.confirm('\u4f60\u672a\u8bbe\u7f6e\u63d0\u73b0\u5bc6\u7801\uff0c\u662f\u5426\u524d\u5f80\u8bbe\u7f6e\uff1f', function () {
              // dataService.verify_pre_url = 'applyCrash';
              $state.go('app.setting-password', { type: 1 });
            }, function () {
            }, { title: '\u63d0\u793a' });
          }
        });
      } else {
        if (dataService.bankCardInfo.is_pay_password) {
          dataService.verify_pre_url = 'applyCrash';
          $state.go('app.verify-password', { type: 5 });
        } else {
          weui.confirm('\u4f60\u672a\u8bbe\u7f6e\u63d0\u73b0\u5bc6\u7801\uff0c\u662f\u5426\u524d\u5f80\u8bbe\u7f6e\uff1f', function () {
            // dataService.verify_pre_url = 'applyCrash';
            $state.go('app.setting-password', { type: 1 });
          }, function () {
          }, { title: '\u63d0\u793a' });
        }
      }
    };
    vm.goOrderListFour = function () {
      $state.go('app.order-list', { type: 4 });
    };
    accountBalance();
  }
]);