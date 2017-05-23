app.controller('updateAppointmentCtrl', [
  '$scope',
  '$state',
  'orderModel',
  '$stateParams',
  'scrollTimeService',
  'popupOptionService',
  'dataService',
  function ($scope, $state, orderModel, $stateParams, scrollTimeService, popupOptionService, dataService) {
    var vm = $scope;
    vm.showView = true;
    //操作状态 1：修改预约， 2:关闭工单
    var status = $stateParams.status;
    vm.status = status;
    //订单号
    var orderId = $stateParams.orderId;
    var appointId = $stateParams.appointId;
    vm.type = 0;
    //原因结果
    vm.typeContent = [
      {
        id: '0',
        text: '\u8bf7\u9009\u62e9'
      },
      {
        id: '1',
        text: '\u7528\u6237\u4e0d\u5728\u5bb6'
      },
      {
        id: '2',
        text: '\u6211\u4e34\u65f6\u6709\u4e8b'
      },
      {
        id: '3',
        text: '\u7528\u6237\u6ca1\u6536\u5230\u4ea7\u54c1'
      },
      {
        id: '4',
        text: '\u6536\u5230\u7684\u4ea7\u54c1\u6709\u95ee\u9898'
      },
      {
        id: '5',
        text: '\u6536\u5230\u7684\u914d\u4ef6\u6709\u95ee\u9898'
      },
      {
        id: '6',
        text: '\u5176\u4ed6'
      }
    ];
    //选择项
    var options = [
        {
          id: '1',
          text: '\u7528\u6237\u4e0d\u5728\u5bb6'
        },
        {
          id: '2',
          text: '\u6211\u4e34\u65f6\u6709\u4e8b'
        },
        {
          id: '3',
          text: '\u7528\u6237\u6ca1\u6536\u5230\u4ea7\u54c1'
        },
        {
          id: '4',
          text: '\u6536\u5230\u7684\u4ea7\u54c1\u6709\u95ee\u9898'
        },
        {
          id: '5',
          text: '\u6536\u5230\u7684\u914d\u4ef6\u6709\u95ee\u9898'
        },
        {
          id: '6',
          text: '\u5176\u4ed6'
        }
      ];
    //关闭工单
    var coloseOrder = function () {
      var params = {
          token: dataService.userData.token,
          type: 3,
          remarks: vm.remarks
        };
      var promise = orderModel.closeOrder(params, orderId);
      promise.then(function (value) {
        weui.toast('\u64cd\u4f5c\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        setTimeout(function () {
          $state.go('app.order-list', { type: 1 });
        }, 1500);
      });
    };
    //修改工单
    var updateOrder = function () {
      var time = '';
      if (vm.appointmentTime.length) {
        time = vm.appointmentTime[0] + ' ' + vm.appointmentTime[1].toString() + ':' + vm.appointmentTime[2].toString();
      }
      var appoint_time = new Date(time).getTime();
      var dateNow = new Date().getTime();
      if (appoint_time < dateNow) {
        weui.alert('\u9884\u7ea6\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4');
        return false;
      }
      if (vm.type == 0) {
        weui.alert('\u8bf7\u9009\u62e9\u539f\u56e0');
        return false;
      }
      var params = {
          token: dataService.userData.token,
          appoint_time: appoint_time / 1000,
          remarks: vm.remarks,
          update_reason: vm.type
        };
      var promise = orderModel.updateOrder(params, appointId);
      promise.then(function (value) {
        weui.toast('\u64cd\u4f5c\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        setTimeout(function () {
          $state.go('app.order-details', { orderId: dataService.orderId });
        }, 1500);
      });
    };
    //修改时间
    vm.updateTime = function () {
      //多列选择器
      var timeList = scrollTimeService.showScrollTime();
      var dateNow = scrollTimeService.dateNow();
      weui.picker(timeList[0], timeList[1], timeList[2], {
        className: 'custom-classname',
        defaultValue: [
          dateNow.day,
          dateNow.hour,
          dateNow.minute
        ],
        onChange: function (result) {
        },
        onConfirm: function (result) {
          //选择时间成功
          dataService.uploadAppointmentTime = result;
          vm.appointmentTime = result;
          vm.$apply();
        },
        id: 'multiPickerBtn'
      });
    };
    //选择原因
    vm.selectCause = function () {
      popupOptionService.popupList(options, function (evt) {
        vm.type = evt;
        vm.$apply();
      });
    };
    vm.appointmentTime = dataService.uploadAppointmentTime;
    //提交
    vm.submit = function () {
      if (status == 1) {
        updateOrder();
      } else {
        coloseOrder();
      }
    };
  }
]);