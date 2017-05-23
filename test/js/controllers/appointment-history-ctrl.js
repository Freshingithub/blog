app.controller('appointmentHistoryCtrl', [
  '$scope',
  '$stateParams',
  'orderModel',
  function ($scope, $stateParams, orderModel) {
    var vm = $scope;
    vm.returns = {
      0: '----',
      1: '\u5df2\u548c\u7528\u6237\u9884\u7ea6\u597d\u4e0a\u95e8\u65f6\u95f4',
      2: '\u6682\u65f6\u8054\u7cfb\u4e0d\u4e0a\u7528\u6237\uff0c\u7533\u8bf7\u5ef6\u65f6',
      3: '\u65e0\u6cd5\u6ee1\u8db3\u7528\u6237\u8981\u6c42\uff0c\u6211\u8981\u9000\u5355',
      4: '\u4e0d\u4f1a\u7ef4\u4fee\u8be5\u4ea7\u54c1\uff0c\u6211\u8981\u9000\u5355'
    };
    vm.updates = {
      0: '----',
      1: '\u7528\u6237\u4e0d\u5728\u5bb6',
      2: '\u6211\u4e34\u65f6\u6709\u4e8b',
      3: '\u7528\u6237\u6ca1\u6536\u5230\u4ea7\u54c1',
      4: '\u6536\u5230\u4ea7\u54c1\u6709\u95ee\u9898',
      5: '\u6536\u5230\u7684\u914d\u4ef6\u6709\u95ee\u9898',
      6: '\u5176\u4ed6'
    };
    vm.app_type = {
      WB: '\u5ef6\u957f\u9884\u7ea6',
      WA: '\u9884\u7ea6\u4e0a\u95e8',
      WC: '\u4fee\u6539\u9884\u7ea6',
      WCE: '\u9000\u56de\u5de5\u5355',
      WF: '\u518d\u6b21\u9884\u7ea6'
    };
    //订单号
    var orderId = $stateParams.orderId;
    //预约历史
    var getHistory = function () {
      var params = {};
      var promise = orderModel.appointsHistory(params, orderId);
      promise.then(function (value) {
        angular.forEach(value, function (v, k) {
          if (v.ope_type == 'WC' || v.ope_type == 'WCE') {
            var data = JSON.parse(v.desc ? v.desc : '{}');
            angular.forEach(data, function (s, d) {
              value[k][d] = s;
            });
          }
        });
        console.log(value);
        vm.historyList = value;
      });
    };
    getHistory();
  }
]);