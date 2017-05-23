app.controller('checkExpressCtrl', [
  '$scope',
  '$stateParams',
  'orderModel',
  'dataService',
  function ($scope, $stateParams, orderModel, dataService) {
    var vm = $scope;
    vm.formData = { content: [] };
    //快递单id
    var expressId = $stateParams.expressId;
    //获取快递记录
    var getExpressTracking = function (expressId) {
      var params = {
          type: 1,
          search: expressId,
          identity: '1'
        };
      var promise = orderModel.getExpressTracking(params);
      promise.then(function (value) {
        vm.formData = value;
        if (vm.formData.tracking) {
          var content_text = vm.formData.tracking.content ? vm.formData.tracking.content : '[]';
          vm.formData.tracking.content = JSON.parse(content_text);
        }
        console.log(vm.formData);
      });
    };
    vm.openTell = function (tell) {
      window.open('tel:' + tell);
    };
    getExpressTracking(expressId);
  }
]);