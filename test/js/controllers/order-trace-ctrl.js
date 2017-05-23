app.controller('orderTraceCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'orderModel',
  'dataService',
  function ($scope, $stateParams, $state, orderModel, dataService) {
    var vm = $scope;
    var orderId = $stateParams.orderId;
    vm.type = $stateParams.type;
    vm.formData = {};
    //配件申请状态
    vm.statusList = dataService.statusList;
    //费用类型
    vm.costTypeList = dataService.costTypeList;
    //费用申请状态
    vm.costStatusList = dataService.costStatusList;
    //工单操作状态
    vm.operationData = dataService.operationData;
    //获取配件列表
    var getPartList = function (orderId) {
      var params = {};
      var promise = orderModel.getPartList(params, orderId);
      promise.then(function (value) {
        vm.formData = value;
        if (!vm.formData.data_list) {
          vm.defaultList = true;
        } else {
          vm.defaultList = false;
        }
      });
    };
    //获取工单记录
    var getOrderHistory = function (orderId) {
      var params = { type: 6 };
      var promise = orderModel.getOrderLogs(params, orderId);
      promise.then(function (value) {
        vm.formData = value;
      });
    };
    //获取费用单列表
    var getCostsList = function (orderId) {
      var params = {};
      var promise = orderModel.getCostsList(params, orderId);
      promise.then(function (value) {
        vm.formData = value;
        if (!vm.formData.data_list) {
          vm.defaultList = true;
        } else {
          vm.defaultList = false;
        }
      });
    };
    //类型判断 type:1 工单记录 type:2 配件单  type:3  费用单
    if (vm.type == 1) {
      getOrderHistory(orderId);
    } else if (vm.type == 2) {
      getPartList(orderId);
    } else {
      getCostsList(orderId);
    }
    //选择菜单
    vm.selectTab = function (type) {
      $state.go('app.order-trace', {
        type: type,
        orderId: orderId
      });
    };
  }
]);