app.controller('dealFlowStatusCtrl', [
  '$scope',
  '$stateParams',
  'orderModel',
  'dataService',
  function ($scope, $stateParams, orderModel, dataService) {
    var vm = $scope;
    var costsId = $stateParams.costsId;
    vm.formData = {};
    //费用类型
    vm.costTypeList = dataService.costTypeList;
    //费用申请状态
    vm.costStatusList = dataService.costStatusList;
    //获取费用详情
    var getCostsDetails = function (costsId) {
      var params = {};
      var promise = orderModel.getCostsDetails(params, costsId);
      promise.then(function (value) {
        vm.formData = value;
        console.log(value);
      });
    };
    getCostsDetails(costsId);
  }
]);