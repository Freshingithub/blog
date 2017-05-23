app.controller('settingPasswordCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'dataService',
  'workerModel',
  '$location',
  function ($scope, $state, $stateParams, dataService, workerModel, $location) {
    var vm = $scope;
    var url = dataService.verify_pre_url;
    // 1添加密码；2新旧密码修改；3重置密码；
    vm.type = $stateParams.type;
    var location_url = $location.search();
    vm.goNext = function () {
      dataService.verify_pre_url = '';
      if (vm.type == 1) {
        vm.addPayPassword(url);
      } else if (vm.type == 2) {
        vm.updatePayPassword(url);
      } else if (vm.type == 3) {
        vm.codePayPassword(url);
      } else if (vm.type == 4 && $stateParams.check != undefined && $stateParams.check) {
        vm.codePayPassword(url);
      } else if (vm.type == 4) {
        vm.addPayPassword(url);
      }
    };
    vm.isHadWorkerCardInfo = function () {
      if (dataService.bankCardInfo == undefined) {
        var promise = workerModel.getWorkerCardDetail();
        promise.then(function (value) {
          $state.go('app.card-details');
        });
      } else if (!dataService.bankCardInfo.credit_card) {
        $state.go('app.card-details');
      } else {
        $state.go('app.apply-crash');
      }
    };
    vm.stateGo = function (type) {
      weui.alert('\u64cd\u4f5c\u6210\u529f', function () {
        if (type == 'deleteWorkerCardInfo') {
          weui.confirm('\u60a8\u73b0\u5728\u6b63\u5728\u8fdb\u884c\u5220\u9664\u94f6\u884c\u5361\u4fe1\u606f\u64cd\u4f5c\uff0c\u662f\u5426\u7ee7\u7eed\uff1f', function () {
            var promise = workerModel.workerDeleteBanks(vm.password);
            promise.then(function (value) {
              weui.alert('\u5220\u9664\u6210\u529f', function () {
                $state.go('app.delete-card');
              });
            });
          }, function (argument) {
            $state.go('app.card-details');
          });
        } else if (type == 'updateWorkerCardInfo') {
          dataService.check_updatecard_password = vm.password;
          $state.go('app.card-details');
        } else if (type == 'applyCrash') {
          dataService.check_crash_password = vm.password;
          // vm.isHadWorkerCardInfo();
          $state.go('app.apply-crash');
        } else {
          $state.go('app.user-main');
        }
      });
    };
    vm.addPayPassword = function () {
      if (!vm.password || !vm.agin_password) {
        weui.alert('\u5c1a\u6709\u5bc6\u7801\u672a\u586b\u5199');
      } else if (vm.agin_password != vm.password) {
        weui.alert('\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002');
      } else {
        var post_data = {
            type: 1,
            pay_password: vm.password
          };
        var promise = workerModel.setPayPassword(post_data);
        promise.then(function (value) {
          dataService.bankCardInfo && (dataService.bankCardInfo.is_pay_password = true);
          vm.stateGo(url);
        });
      }
    };
    vm.updatePayPassword = function () {
      if (!vm.password || !vm.agin_password) {
        weui.alert('\u5c1a\u6709\u5bc6\u7801\u672a\u586b\u5199');
      } else if (vm.agin_password != vm.password) {
        weui.alert('\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002');
      } else {
        var post_data = {
            type: 2,
            old_password: $stateParams.check,
            pay_password: vm.password
          };
        var promise = workerModel.setPayPassword(post_data);
        promise.then(function (value) {
          vm.stateGo(url);
        });
      }
    };
    vm.codePayPassword = function () {
      if (!$stateParams.check) {
        weui.alert('CODE IS EMPTY');
      } else if (!vm.password || !vm.agin_password) {
        weui.alert('\u5c1a\u6709\u5bc6\u7801\u672a\u586b\u5199');
      } else if (vm.agin_password != vm.password) {
        weui.alert('\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002');
      } else {
        var post_data = {
            type: 3,
            code: $stateParams.check,
            pay_password: vm.password
          };
        var promise = workerModel.setPayPassword(post_data);
        promise.then(function (value) {
          vm.stateGo(url);
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
    vm.pswChangedS = function (v) {
      if (v) {
        v += '';
        //number类型转换字符串类型
        vm.len_2 = v.length;
      } else {
        vm.len_2 = 0;
      }
      // console.log(v);
      return;
    };
  }
]);