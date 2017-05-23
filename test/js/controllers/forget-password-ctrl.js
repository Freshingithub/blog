app.controller('forgetPasswordCtrl', [
  '$scope',
  '$state',
  '$location',
  'dataService',
  'workerModel',
  '$stateParams',
  '$timeout',
  'commonModel',
  function ($scope, $state, $location, dataService, workerModel, $stateParams, $timeout, commonModel) {
    var vm = $scope;
    vm.phone = '';
    vm.code = '';
    vm.miao = 60;
    function timeoutGetCode() {
      vm.miao -= 1;
      if (vm.miao > 0) {
        $timeout(timeoutGetCode, 1000);
      } else {
        vm.miao = 60;
      }
    }
    vm.getCode = function () {
      var promise = workerModel.getPayPasswordCode({
          phone: vm.phone,
          token: dataService.userData.token
        });
      // , is_return: 1
      promise.then(function (value) {
        timeoutGetCode();
        if (value.verification_code) {
          vm.code = value.verification_code;
        }
      });
    };
    if (!dataService.workerInfo.worker_id) {
      var promise = workerModel.getInfo();
      promise.then(function (value) {
        dataService.workerInfo = value;
        vm.phone = value.worker_telephone;
      });
    } else {
      vm.phone = dataService.workerInfo.worker_telephone;
    }
    vm.goNext = function () {
      var promise = commonModel.ckeckPhoneCode(vm.code, vm.phone, 11);
      promise.then(function (value) {
        $state.go('app.setting-password', {
          type: $stateParams.type,
          check: vm.code
        });
      });
    };
  }
]);