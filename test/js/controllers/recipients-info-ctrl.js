app.controller('recipientsInfoCtrl', [
  '$scope',
  '$state',
  'dataService',
  'areaModel',
  'scrollAreasService',
  function ($scope, $state, dataService, areaModel, scrollAreasService) {
    var vm = $scope;
    vm.type = 2;
    vm.showView = true;
    vm.showAddress = {};
    //切换地址
    vm.selectTab = function (type) {
      vm.type = type;
      vm.getAddress(type);
    };
    //获取地址
    vm.getAddress = function (type) {
      if (type != 1) {
        vm.showAddress = vm.addressDataObject.user_address;
      } else {
        vm.showAddress = vm.addressDataObject.worker_address;
      }
      vm.showAddress.area = '';
      if (vm.showAddress.area_desc) {
        var area_desc = vm.showAddress.area_desc.split(',');
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
        console.log(dataService.areasData);
      });
    };
    //保存
    vm.submit = function () {
      vm.$emit('address', vm.showAddress);
      history.back();
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
          var returnAreas = scrollAreasService.returnAreas(result);
          vm.showAddress.area = returnAreas;
          vm.showAddress.area_full = result.join(',');
          vm.$apply();
        },
        id: 'doubleLinePicker'
      });
    };
    vm.getAddress(vm.type);
    getAreas();
  }
]);