app.controller('verifyPasswordCtrl', [
  '$scope',
  '$state',
  '$location',
  'dataService',
  'workerModel',
  '$stateParams',
  function ($scope, $state, $location, dataService, workerModel, $stateParams) {
    var vm = $scope;
    vm.verify_type = $stateParams.type;
    vm.goNext = function () {
      var type = $stateParams.type;
      var post_data = {
          type: type,
          pay_password: vm.password
        };
      if (!vm.password) {
        weui.alert('\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a');
      } else if (type == 4) {
        var promise = workerModel.workerDeleteBanks(vm.password);
        promise.then(function (value) {
          dataService.check_updatecard_password = vm.password;
          $state.go('app.delete-card');
        });
      } else {
        var promise = workerModel.chackPayPassword(post_data);
        promise.then(function (value) {
          if (type == 2) {
            dataService.check_updatecard_password = vm.password;
            $state.go('app.card-details');
          } else if (type == 5) {
            dataService.check_crash_password = vm.password;
            $state.go('app.apply-crash');
          } else {
            history.back(-1);
          }
        });
      }
    };
    vm.pswChanged = function (v) {
      if (v) {
        v += '';
        //number类型转换字符串类型
        vm.len = v.length;
      } else {
        vm.len = 0;
      }
      // console.log(v);
      return;
    };
    vm.$watch('password', function (n, o) {
      alert(n);
      vm.pswChanged(n);
    });
    function notCardInfoGoDetail() {
    }
    vm.isHadWorkerCardInfo = function () {
      if (dataService.bankCardInfo == undefined) {
        var promise = workerModel.getWorkerCardDetail();
        promise.then(function (value) {
          if (!value.is_pay_password) {
            // weui.alert('前往设置密码', function () {
            // dataService.verify_pre_url = 'applyCrash';
            $state.go('app.setting-password', { type: 1 });  // });
          } else if (!value.credit_card) {
            notCardInfoGoDetail();
          }
        });
      } else if (!dataService.bankCardInfo.credit_card) {
        notCardInfoGoDetail();
      }
    };
    vm.card_info = dataService.bankCardInfo;
    if ($stateParams.type == 5) {
      dataService.verify_pre_url = 'applyCrash';
      if (vm.card_info == undefined) {
        vm.isHadWorkerCardInfo();
      } else if (!vm.card_info.is_pay_password) {
        // weui.alert('前往设置密码', function () {
        $state.go('app.setting-password', { type: 1 });  // });
      } else if (!vm.card_info.credit_card) {
        notCardInfoGoDetail();
      }
    }
  }
]);