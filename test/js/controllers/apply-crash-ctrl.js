app.controller('applyCrashCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'walletBalanceModel',
  'dataService',
  'workerModel',
  function ($scope, $state, $stateParams, walletBalanceModel, dataService, workerModel) {
    var vm = $scope;
    var check_crash_password = dataService.check_crash_password;
    dataService.check_crash_password = undefined;
    vm.card_info = dataService.bankCardInfo;
    vm.crash = '';
    vm.crashTemp = '';
    vm.dialog = false;
    vm.getCardDetails = function () {
      var promise = workerModel.getWorkerCardDetail();
      promise.then(function (value) {
        vm.card_info = dataService.bankCardInfo;
      });
    };
    function notCardInfoGoDetail() {
      weui.confirm('\u6682\u65e0\u94f6\u884c\u5361\u4fe1\u606f\uff0c\u524d\u5f80\u8bbe\u7f6e\u94f6\u884c\u5361\u4fe1\u606f', function () {
        dataService.check_crash_password = check_crash_password;
        dataService.check_updatecard_password = check_crash_password;
        $state.go('app.card-details');
      }, function () {
        $state.go('app.wallet-balance');
      });
    }
    vm.isHadWorkerCardInfo = function () {
      if (dataService.bankCardInfo == undefined) {
        var promise = workerModel.getWorkerCardDetail();
        promise.then(function (value) {
          if (!value.is_pay_password) {
            // weui.alert('前往设置密码', function () {
            dataService.verify_pre_url = 'applyCrash';
            $state.go('app.setting-password', { type: 1 });  // });
          } else if (!value.credit_card) {
            notCardInfoGoDetail();
          } else if (!check_crash_password) {
            weui.confirm('\u672a\u9a8c\u8bc1\u5bc6\u7801,\u662f\u5426\u7ee7\u7eed\uff1f', function () {
              $state.go('app.verify-password', { type: '5' });
            }, function () {
              $state.go('app.wallet-balance');
            });  // weui.alert('请重新验证密码', function () {
                 //     $state.go('app.verify-password', {type: '5'});
                 // });
          }
        });
      } else if (!dataService.bankCardInfo.credit_card) {
        notCardInfoGoDetail();
      }
    };
    vm.crashInput = function () {
      if (!vm.crashTemp) {
        vm.crash = '';
      } else {
        vm.crash = vm.crashTemp + '';
      }
    };
    // 申请提现
    vm.extractCash = function () {
      if (vm.crash.length > 0) {
        var params = {
            'token': dataService.userData.token,
            'money': vm.crash,
            'pay_password': check_crash_password
          };
        var promise = walletBalanceModel.extractCash(params);
        promise.then(function (val) {
          dataService.verify_pre_url == 'applyCrash' && (dataService.verify_pre_url = '');
          $state.go('app.apply-crash-success');  // weui.alert('申请成功', function () {
                                                 //     $state.go('app.teal-record', {type: 2});
                                                 // });
        });
      } else {
        vm.dialog = true;
      }
    };
    vm.dialogHide = function () {
      vm.dialog = false;
    };
    vm.onFocus = function () {
      document.getElementById('input').focus();
    };
    if (vm.card_info == undefined) {
      vm.isHadWorkerCardInfo();
    } else if (!vm.card_info.is_pay_password) {
      // weui.alert('前往设置密码', function () {
      dataService.verify_pre_url = 'applyCrash';
      $state.go('app.setting-password', { type: 1 });  // });
    } else if (!vm.card_info.credit_card) {
      notCardInfoGoDetail();
    } else if (!check_crash_password) {
      // $state.go('app.verify-password', {type: '5'});
      weui.confirm('\u672a\u9a8c\u8bc1\u5bc6\u7801,\u662f\u5426\u7ee7\u7eed\uff1f', function () {
        $state.go('app.verify-password', { type: '5' });
      }, function () {
        $state.go('app.wallet-balance');
      });  // weui.alert('请重新验证密码', function () {
           //     $state.go('app.verify-password', {type: '5'});
           // });
    }
  }
]);