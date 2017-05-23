app.controller('uploadAppointmentCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'dataService',
  'popupOptionService',
  'scrollTimeService',
  'orderModel',
  '$filter',
  function ($scope, $state, $stateParams, dataService, popupOptionService, scrollTimeService, orderModel, $filter) {
    var vm = $scope;
    // console.log($stateParams.type,dataService.uploadAppointmentTime);
    vm.showView = true;
    //预约结果
    vm.typeContent = [
      {
        id: '0',
        text: ''
      },
      {
        id: '1',
        text: '\u5df2\u548c\u7528\u6237\u9884\u7ea6\u597d\u4e0a\u95e8\u65f6\u95f4'
      },
      {
        id: '2',
        text: '\u6682\u65f6\u8054\u7cfb\u4e0d\u4e0a\u7528\u6237\uff0c\u7533\u8bf7\u5ef6\u65f6'
      },
      {
        id: '3',
        text: '\u65e0\u6cd5\u6ee1\u8db3\u7528\u6237\u8981\u6c42\uff0c\u6211\u8981\u9000\u5355'
      },
      {
        id: '4',
        text: '\u4e0d\u4f1a\u7ef4\u4fee\u8be5\u4ea7\u54c1\uff0c\u6211\u8981\u9000\u5355'
      }
    ];
    //选择的预约结果
    vm.type = $stateParams.type;
    //订单Id
    var orderId = $stateParams.orderId;
    var options = [
        {
          id: '1',
          text: '\u5df2\u548c\u7528\u6237\u9884\u7ea6\u597d\u4e0a\u95e8\u65f6\u95f4'
        },
        {
          id: '2',
          text: '\u6682\u65f6\u8054\u7cfb\u4e0d\u4e0a\u7528\u6237\uff0c\u7533\u8bf7\u5ef6\u65f6'
        },
        {
          id: '3',
          text: '\u65e0\u6cd5\u6ee1\u8db3\u7528\u6237\u8981\u6c42\uff0c\u6211\u8981\u9000\u5355'
        },
        {
          id: '4',
          text: '\u4e0d\u4f1a\u7ef4\u4fee\u8be5\u4ea7\u54c1\uff0c\u6211\u8981\u9000\u5355'
        }
      ];
    //修改预约结果
    vm.updateClick = function () {
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        if (evt == 1) {
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
              // console.log(result);
              dataService.uploadAppointmentTime = result;
              vm.appointmentTime = result;
              vm.type = evt;
              vm.$apply();
            },
            id: 'multiPickerBtn'
          });
        } else {
          vm.type = evt;
        }
        vm.$apply();
      });
    };
    //修改时间
    vm.updateTime = function () {
      //多列选择器
      var dateNow = scrollTimeService.dateNow();
      console.log(dateNow);
      var timeList = scrollTimeService.showScrollTime();
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
    vm.appointmentTime = dataService.uploadAppointmentTime;
    //提交预约
    vm.submit = function () {
      if (vm.type == 1) {
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
        var params = {
            token: dataService.userData.token,
            appoint_time: appoint_time / 1000,
            remarks: vm.remarks
          };
        //预约上门
        var promise = orderModel.uploadAppointment(params, orderId);
        promise.then(function (value) {
          weui.toast('\u64cd\u4f5c\u6210\u529f', {
            duration: 1500,
            className: 'bears'
          });
          setTimeout(function () {
            $state.go('app.order-list', { type: 2 });
          }, 1500);
        });
      } else if (vm.type == 2) {
        //延长预约时间
        var params = {
            token: dataService.userData.token,
            remarks: vm.remarks
          };
        var promise = orderModel.delayAppointmentTime(params, orderId);
        promise.then(function (value) {
          weui.toast('\u64cd\u4f5c\u6210\u529f', {
            duration: 1500,
            className: 'bears'
          });
          setTimeout(function () {
            $state.go('app.order-list', { type: 1 });
          }, 1500);
        });
      } else {
        var params = {
            token: dataService.userData.token,
            remarks: vm.remarks
          };
        if (vm.type == 3) {
          params.type = '1';
        } else if (vm.type == 4) {
          params.type = '2';
        }
        //关闭工单
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
      }
    };
  }
]);