app.controller('changePasswordCtrl', [
  '$scope',
  '$state',
  'workerModel',
  function ($scope, $state, workerModel) {
    var vm = $scope;
    vm.len = 0;
    //重置密码长度
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
    vm.goNext = function () {
      var post_data = { pay_password: vm.password };
      if (!vm.password) {
        weui.alert('\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a');
      } else {
        var promise = workerModel.chackPayPassword(post_data);
        promise.then(function (value) {
          $state.go('app.setting-password', {
            type: 2,
            check: vm.password
          });
        });
      }
    };
  }
]);