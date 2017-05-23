app.controller('detailsOfChargesCtrl', [
  '$scope',
  'orderModel',
  '$stateParams',
  function ($scope, orderModel, $stateParams) {
    var vm = $scope;
    vm.is_show_BZ = false;
    vm.order_status_arr = {
      1: '\u5f85\u5ba1\u6838',
      2: '\u5df2\u7ed3\u7b97'
    };
    vm.coust_type_status = 0;
    vm.homefee_model = 0;
    vm.product_cate_name = 0;
    vm.homefee_model_arr = {
      0: '\u672a\u8bbe\u7f6e\u8ba1\u8d39\u6a21\u5f0f',
      1: '\u7b2c\u4e00\u6b21\u514d\u57fa\u672c\u91cc\u7a0b\u8d39',
      2: '\u7b2c\u4e8c\u6b21\u514d\u57fa\u672c\u91cc\u7a0b\u8d39'
    };
    vm.service = [];
    // 维修费用
    vm.signin = [];
    // 上门费
    vm.acce = [];
    // 配件返还费
    vm.cost = [];
    // 技工申请的费用单
    vm.area = [];
    // 地区补贴
    vm.cscost = [];
    // 工单补贴
    vm.insurance_cost = [];
    vm.count_price = 0;
    //订单ID
    var orderId = $stateParams.orderId;
    var getCostsDetails = function () {
      var params = {};
      var promise = orderModel.getOrderCostes(params, orderId);
      promise.then(function (value) {
        vm.coust_type_status = value.coust_type_status;
        vm.homefee_model = value.homefee_model;
        vm.product_cate_name = value.product_cate_name;
        vm.had_return_acce = value.had_return_acce;
        vm.service_type = value.type;
        // vm.typproduct_cate_id = value.product_cate_id;
        angular.forEach(value.costs, function (v, k) {
          vm.count_price += parseFloat(v.price_modify);
          if (v.type == 1) {
            if (v.price != v.price_modify) {
              vm.is_show_BZ = true;
            }
            vm.service.push(v);
          } else if (v.type == 2) {
            if (v.price != v.price_modify) {
              vm.is_show_BZ = true;
            }
            vm.signin.push(v);
          } else if (v.type == 3) {
            vm.cost.push(v);  // vm.acce.push(v);
          } else if (v.type == 4) {
            vm.cost.push(v);
          } else if (v.type == 5) {
            if (v.price != v.price_modify) {
              vm.is_show_BZ = true;
            }
            vm.area.push(v);
          } else if (v.type == 6) {
            vm.cscost.push(v);
          } else if (v.type == 7) {
            vm.insurance_cost.push(v);
          }
        });
      });
    };
    getCostsDetails();
  }
]);