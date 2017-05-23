app.controller('userMainCtl', [
  '$scope',
  '$state',
  '$location',
  'dataService',
  'workerModel',
  '$location',
  function ($scope, $state, $location, dataService, workerModel, $location) {
    var vm = $scope;
    dataService.check_crash_password = '';
    dataService.updateCardInfoType = undefined;
    dataService.verify_pre_url = '';
    vm.worker = dataService.workerInfo;
    vm.satisfy = {
      satisfy: 0,
      unsatisfy: 0
    };
    vm.myInfo = function () {
      var promise = workerModel.getInfo();
      promise.then(function (value) {
        if (value.worker_id) {
          vm.worker = dataService.workerInfo = value;
        } else {
          $state.go('app.my-info');  // $location.path('/app/my-info');
        }
      });
    };
    if (!vm.worker.worker_id) {
      vm.myInfo();
    } else if (dataService.userData.hash) {
      $state.go('app.my-info');  // $location.path('/app/my-info');
    }
    vm.updatePassword = function (url) {
      var promise = workerModel.getWorkerCardDetail();
      promise.then(function (value) {
        if (value.is_pay_password) {
          $state.go('app.change-password');
        } else {
          $state.go('app.setting-password', { type: 1 });
        }
      });
    };
    function getSatisFiesnum(argument) {
      var promise = workerModel.getSatisFiesnum();
      promise.then(function (value) {
        vm.satisfy.satisfy = value.satisfy ? value.satisfy : 0;
        vm.satisfy.unsatisfy = value.unsatisfy ? value.unsatisfy : 0;
      });
    }
    getSatisFiesnum();
  }
]);