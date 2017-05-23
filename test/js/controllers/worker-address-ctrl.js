app.controller('workerAddressCtrl', [
  '$scope',
  '$state',
  'dataService',
  'areaModel',
  'scrollAreasService',
  'workerModel',
  function ($scope, $state, dataService, areaModel, scrollAreasService, workerModel) {
    var vm = $scope;
    vm.type = 1;
    vm.showView = true;
    vm.showAddress = {};
    //获取地址
    vm.getAddress = function () {
      // vm.showAddress.area = '';
      if (vm.showAddress.area_ids_desc) {
        var area_desc = vm.showAddress.area_ids_desc.split('-');
        for (var i = 0; i < area_desc.length; i++) {
          if (i == 0) {
            vm.showAddress.area += area_desc[i] + '\u7701';
          } else {
            vm.showAddress.area += area_desc[i];
          }
        }
      }
    };
    //获取区域
    var getAreas = function () {
      var promise = areaModel.getAreas();
      promise.then(function (value) {
        dataService.areasData = value;
      });
    };
    //保存
    vm.submit = function () {
      vm.$emit('address', vm.showAddress);
      var params = {
          area_ids: vm.showAddress.area_ids,
          detail_address: vm.showAddress.detail_address,
          addressee: vm.showAddress.addressee,
          phone: vm.showAddress.phone,
          postcodes: vm.showAddress.postcodes
        };
      var promise = workerModel.editWorkerAcceAddress(params);
      promise.then(function (value) {
        weui.alert('\u64cd\u4f5c\u6210\u529f', function () {
          history.back();
        });
      });
    };
    //选择地区
    vm.selectAreas = function () {
      //多列选择器
      weui.picker(dataService.areasData, {
        defaultValue: [
          '110000',
          '110100',
          '110101'
        ],
        onChange: function (result) {
        },
        onConfirm: function (result) {
          var returnAreas = scrollAreasService.returnAreas(result, '-');
          vm.showAddress.area_ids_desc = returnAreas;
          vm.showAddress.area_ids = result.join(',');
          vm.$apply();
        },
        id: 'doubleLinePicker'
      });
    };
    vm.getWorkerAcceAddress = function () {
      var promise = workerModel.getWorkerAcceAddress();
      promise.then(function (value) {
        vm.showAddress = value;
      });
      vm.getAddress(1);
    };
    vm.getWorkerAcceAddress();
    getAreas();
  }
]);