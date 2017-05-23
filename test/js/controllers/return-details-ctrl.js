app.controller('returnDetailsCtrl', [
  '$scope',
  'dataService',
  'workerModel',
  '$stateParams',
  function ($scope, dataService, workerModel, $stateParams) {
    var vm = $scope;
    vm.v = {};
    vm.feedbacks_type = dataService.workerFeedbacksType;
    // 
    vm.getWorkerFeedbacksDetail = function () {
      var promise = workerModel.getWorkerFeedbacksDetail({}, $stateParams.id);
      promise.then(function (value) {
        vm.v = value;
      });
    };
    vm.getWorkerFeedbacksDetail();
  }
]);