app.controller('returnHistoryCtrl', [
  '$scope',
  'dataService',
  'workerModel',
  function ($scope, dataService, workerModel) {
    var vm = $scope;
    vm.counts = 0;
    var params = {
        page_no: 1,
        page_size: 10
      };
    vm.busy = false;
    vm.feedbacks = [];
    vm.feedbacks_type = dataService.workerFeedbacksType;
    //
    vm.getWorkerFeedbacks = function () {
      var promise = workerModel.getWorkerFeedbacks(params);
      promise.then(function (value) {
        vm.counts = value.count;
        if (Math.ceil(vm.counts / params.page_size) <= params.page_no) {
          vm.busy = true;
        }
        if (value && value.data_list) {
          vm.feedbacks = value.data_list;
          if (value.data_list == null) {
            vm.feedbacks = false;
          }
        }
      });
    };
    //下滑加载分页
    vm.loadMore = function () {
      vm.busy = true;
      // var num = params.page_no + 1;
      if (Math.ceil(vm.counts / params.page_size) <= params.page_no) {
        return false;
      }
      params.page_no += 1;
      var promise = workerModel.getWorkerFeedbacks(params);
      promise.then(function (val) {
        Array.prototype.push.apply(vm.feedbacks, val.data_list);
        vm.busy = false;
      });
    };
    vm.getWorkerFeedbacks();  // vm.loadMore();
  }
]);