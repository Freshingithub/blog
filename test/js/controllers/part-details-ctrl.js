app.controller('partDetailsCtrl', [
  '$scope',
  '$stateParams',
  'orderModel',
  'dataService',
  '$timeout',
  function ($scope, $stateParams, orderModel, dataService, $timeout) {
    var vm = $scope;
    //配件单ID
    var partId = $stateParams.partId;
    vm.tag_image = '';
    //配件申请状态
    vm.statusList = dataService.statusList;
    vm.formData = {};
    //获取配件单详情
    var getPartDetails = function (partId) {
      var params = {};
      var promise = orderModel.getPartDetails(params, partId);
      promise.then(function (value) {
        vm.tagImageStatus(value);
        vm.formData = value;
        vm.formData.acce_photos = JSON.parse(vm.formData.acce_photos ? vm.formData.acce_photos : '[]');
      });
    };
    //配件签收
    vm.signPart = function (partId) {
      var params = { token: dataService.userData.token };
      var promise = orderModel.partSign(params, partId);
      promise.then(function (value) {
        weui.toast('\u7b7e\u6536\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        $timeout(function () {
          getPartDetails(partId);
          $timeout.cancel(this);
        }, 1500);
      });
    };
    var tag_image_is_show = [
        '0',
        '0',
        '0',
        '1',
        '1',
        '1',
        '1',
        '1',
        '0',
        '0',
        '1'
      ];
    vm.tagImageStatus = function (data) {
      if (data && data.acce_status != undefined) {
        if (data.is_cancel == '1') {
          vm.tag_image = 'img/tab_b02.png';
          return;
        }
        if (tag_image_is_show[data.acce_status] !== '1') {
          return;
        }
        var str = '';
        if (data.is_giveup_sendback == '1') {
          str = 'c';
        } else {
          str = 'a';
        }
        vm.tag_image = 'img/tab_' + str + data.acce_status + '.png';
      }
    };
    getPartDetails(partId);
  }
]);