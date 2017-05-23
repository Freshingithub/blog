app.controller('tealRecordCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'walletBalanceModel',
  'dataService',
  function ($scope, $stateParams, $state, walletBalanceModel, dataService) {
    var vm = $scope;
    vm.counts = 0;
    vm.busy = false;
    vm.type_other_2 = {
      0: '\u5f85\u5904\u7406',
      1: '\u63d0\u73b0\u6210\u529f',
      2: '\u63d0\u73b0\u5931\u8d25',
      4: '\u63d0\u73b0\u4e2d'
    };
    vm.type_other_1 = {
      1: '\u7ef4\u4fee',
      2: '\u5b89\u88c5',
      3: '\u7ef4\u62a4',
      4: '\u9001\u4fee'
    };
    vm.typeOneCoolr = {
      1: 'color-1',
      2: 'color-2',
      3: 'color-1',
      4: 'color-3'
    };
    vm.orderStatus = $stateParams.type;
    if (!vm.orderStatus) {
      vm.orderStatus = 0;
    }
    var params = {
        page_no: 1,
        page_size: 10,
        type: vm.orderStatus,
        token: dataService.userData.token
      };
    if (!vm.orderStatus) {
      params = {
        page_no: 1,
        page_size: 10,
        token: dataService.userData.token
      };
    }
    // 技工账户余额
    var balanceClear = function () {
      var promise = walletBalanceModel.balanceClear(params);
      promise.then(function (val) {
        vm.counts = val.count;
        if (Math.ceil(vm.counts / params.page_size) <= params.page_no) {
          vm.busy = true;
        }
        if (val && val.data_list) {
          vm.datalist = val.data_list;
        }
        vm.data = val;
        vm.datalist = val.data_list;
      });
    };
    //切换列表
    vm.selectTab = function (type) {
      vm.orderStatus = type;
      // balanceClear(type);
      $state.go('app.teal-record', { type: type });
    };
    vm.mathFloor = function (number) {
      var returns = Math.abs(number).toFixed(2);
      return returns > 0 ? '+' + returns : '-' + returns;
    };
    //下滑加载分页
    vm.loadMore = function () {
      vm.busy = true;
      // var num = params.page_no + 1;
      if (Math.ceil(vm.counts / params.page_size) <= params.page_no) {
        return false;
      }
      params.page_no += 1;
      var promise = walletBalanceModel.balanceClear(params);
      promise.then(function (val) {
        Array.prototype.push.apply(vm.datalist, val.data_list);
        vm.busy = false;
      });
    };
    balanceClear();
  }
]);