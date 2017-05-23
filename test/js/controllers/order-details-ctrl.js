app.controller('orderDetailsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'orderModel',
  'dataService',
  'popupOptionService',
  'scrollTimeService',
  '$timeout',
  function ($scope, $state, $stateParams, orderModel, dataService, popupOptionService, scrollTimeService, $timeout) {
    var vm = $scope;
    //工单Id
    var orderId = $stateParams.orderId;
    //is android or iphone
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      vm.isIphone = true;
    } else if (/android/.test(ua)) {
      vm.isIphone = false;
    }
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
    //修改预约
    var updateOptions = [
        {
          id: '1',
          text: '\u4fee\u6539\u9884\u7ea6'
        },
        {
          id: '2',
          text: '\u9000\u56de\u5de5\u5355'
        }
      ];
    //工单状态
    vm.orderStatus = [
      '',
      '\u5f85\u9884\u7ea6',
      '\u5f85\u670d\u52a1',
      '\u670d\u52a1\u4e2d',
      '\u5f85\u7ed3\u7b97',
      '\u5df2\u7ed3\u7b97',
      '\u5df2\u53d6\u6d88',
      '\u5176\u4ed6'
    ];
    var orderType = [
        '',
        '\u4e0a\u95e8\u7ef4\u4fee',
        '\u4e0a\u95e8\u5b89\u88c5',
        '\u4e0a\u95e8\u7ef4\u62a4',
        '\u7528\u6237\u9001\u4fee'
      ];
    vm.orderType = orderType;
    //获取工单详情
    vm.getOrderDeatail = function () {
      var params = {
          member_id: dataService.userData.id,
          member_type: dataService.userData.type
        };
      var promise = orderModel.getOrderDeatail(params, orderId);
      promise.then(function (value) {
        vm.orderDetailsData = value;
        //短信转发内容
        vm.smsContent = orderType[vm.orderDetailsData.order_type] + '\u5de5\u5355\uff1a' + vm.orderDetailsData.orno;
        vm.smsContent += '\u7528\u6237\u4fe1\u606f\uff1a' + vm.orderDetailsData.full_name + ' ' + vm.orderDetailsData.tell + ' ' + vm.orderDetailsData.area_desc.split('-')[2] + vm.orderDetailsData.address;
        if (vm.orderDetailsData.details) {
          for (var i = 0; i < vm.orderDetailsData.details.length; i++) {
            vm.smsContent += '\u4ea7\u54c1\uff1a' + vm.orderDetailsData.details[i].servicebrand_desc + vm.orderDetailsData.details[i].product_xinghao + vm.orderDetailsData.details[i].product_cate_name;
            if (vm.orderDetailsData.description) {
              vm.smsContent += '\u5907\u6ce8\uff1a' + vm.orderDetailsData.description;
            }
          }
        }
        console.log(vm.smsContent);
        console.log(vm.orderDetailsData);
      });
    };
    //返回时间状态
    vm.returnExtendType = function (type, describe) {
      var timestamp = new Date().getTime();
      var extendContent = describe;
      if (type == 1 || type == 2) {
        var time = describe * 1000 - timestamp;
        if (time <= 0) {
          extendContent = '\u8bf7\u5c3d\u5feb\u4e0e\u7528\u6237\u8054\u7cfb\uff0c\u9884\u7ea6\u4e0a\u95e8';
          return extendContent;
        }
        var hour = Math.floor(time / (3600 * 1000));
        var minute = Math.floor((time / (3600 * 1000) - hour) * 60);
        timeX = hour + '\u5c0f\u65f6' + minute + '\u5206\u949f';
        if (type == 1) {
          extendContent = '\u5c06\u4e8e' + timeX + '\u540e\u8fc7\u65f6';
        } else {
          extendContent = '\u8ddd\u4e0a\u95e8\u8fd8\u6709' + timeX;
        }
      }
      return extendContent;
    };
    //点击上传预约
    vm.uploadClick = function () {
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        console.log(evt);
        if (evt == 1) {
          //多列选择器
          var dateNow = scrollTimeService.dateNow();
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
              vm.appointmentTime = result;
              var dateNow = new Date().getTime();
              //选择时间成功
              //选择时间戳
              var appoint_time = returnTime(vm.appointmentTime);
              if (appoint_time < dateNow) {
                weui.alert('\u9884\u7ea6\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4');
                return false;
              }
              dataService.uploadAppointmentTime = result;
              $state.go('app.order-list.upload-appointment', {
                type: '1',
                orderId: orderId
              });
            },
            id: 'multiPickerBtn'
          });
        } else if (evt > 2) {
          weui.confirm('\u9000\u5355\u4f1a\u5f71\u54cd\u4e2a\u4eba\u4fe1\u8a89\u548c\u540e\u671f\u63a5\u5355\uff0c\u8bf7\u614e\u91cd\u9000\u5355', function () {
            $state.go('app.order-list.upload-appointment', {
              type: evt,
              orderId: orderId
            });
          }, function () {
            console.log('\u53d6\u6d88');
          }, { title: '\u63d0\u793a' });
        } else {
          $state.go('app.order-list.upload-appointment', {
            type: evt,
            orderId: orderId
          });
        }
      });
    };
    //上传报告
    vm.uploadReport = function (products) {
      var is_can = [];
      angular.forEach(products, function (v, k) {
        if (v.wrong_lock_status != 1 && v.detail_is_complete != 1) {
          is_can.push(v);
        }
      });
      dataService.orderId = orderId;
      if (is_can.length > 1) {
        dataService.productsData = is_can;
        console.log(dataService.productsData);
        $state.go('app.product-select');
      } else if (is_can.length == 1) {
        dataService.productsInfo = is_can[0];
        $state.go('app.upload-report');
      } else {
        weui.alert('\u6240\u6709\u670d\u52a1\u6682\u4e0d\u5141\u8bb8\u4e0a\u4f20\u670d\u52a1\u62a5\u544a');
      }
    };
    //配件单进度
    vm.partProgress = function () {
      $state.go('app.order-trace', {
        type: 2,
        orderId: orderId
      });
    };
    //退回配件
    vm.returnPart = function () {
      var params = {};
      var promise = orderModel.getReturnPartList(params, orderId);
      promise.then(function (value) {
        var data = value;
        dataService.returnPartList = data;
        console.log(dataService.returnPartList);
        dataService.orderId = orderId;
        if (data.length > 1) {
          $state.go('app.return-part-select');
        } else {
          $state.go('app.return-part', { partId: data[0].id });
        }
      });
    };
    //签到
    vm.checkIn = function () {
      if (vm.orderDetailsData.appoint_signin_status != 0) {
        return false;
      }
      var params = { token: dataService.userData.token };
      var promise = orderModel.checkIn(params, orderId);
      promise.then(function (value) {
        $timeout(function () {
          vm.getOrderDeatail();
        }, 1500);
        weui.toast('\u7b7e\u5230\u5b8c\u6210', {
          duration: 1500,
          className: 'bears'
        });
      });
    };
    //修改预约 or 再次预约
    vm.updateAppointment = function (signinStatus) {
      var dateNow = scrollTimeService.dateNow();
      //再次预约
      if (signinStatus != 0) {
        //多列选择器
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
            vm.appointmentTime = result;
            var dateNow = new Date().getTime();
            //选择时间时间戳
            var appoint_time = returnTime(vm.appointmentTime);
            if (appoint_time < dateNow) {
              weui.alert('\u9884\u7ea6\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4');
              return false;
            }
            var params = {
                token: dataService.userData.token,
                appoint_time: appoint_time / 1000,
                remarks: ''
              };
            //预约上门
            var promise = orderModel.uploadAppointment(params, orderId);
            promise.then(function (value) {
              weui.alert('\u9884\u7ea6\u8bb0\u5f55\u5df2\u7ecf\u6210\u529f\u63d0\u4ea4\uff0c\u8bf7\u6309\u65f6\u4e0a\u95e8\u4e3a\u7528\u6237\u670d\u52a1', function () {
                // history.go(0);
                vm.getOrderDeatail();
              });
            });
          },
          id: 'multiPickerBtn'
        });
      } else {
        // 修改预约不能退单
        if (vm.orderDetailsData.order_status == 3) {
          timeListSelect(dateNow);
        } else {
          //可以退单
          popupOptionService.popupList(updateOptions, function (evt) {
            // $state.go('app.order-list.update-appointment',{orderId:orderId,status:evt});
            if (evt == 1) {
              //多列选择器
              timeListSelect(dateNow);
            } else {
              weui.confirm('\u9000\u5355\u4f1a\u5f71\u54cd\u4e2a\u4eba\u4fe1\u8a89\u548c\u540e\u671f\u63a5\u5355\uff0c\u8bf7\u614e\u91cd\u9000\u5355', function () {
                // $state.go('app.order-list.update-appointment',{orderId:orderId,status:evt});
                $state.go('app.order-list.update-appointment', {
                  orderId: orderId,
                  status: evt,
                  appointId: vm.orderDetailsData.last_appoint_id
                });
              }, function () {
                console.log('\u53d6\u6d88');
              }, { title: '\u63d0\u793a' });
            }
          });
        }
      }
    };
    //拨打电话
    vm.callShow = function () {
      vm.isCall = true;
    };
    //隐藏电话
    vm.hideCall = function () {
      vm.isCall = false;
    };
    //发送短信
    vm.SMS = function () {
      if (vm.isIphone) {
        window.open('sms:' + '&body=' + vm.smsContent);
      } else {
        window.open('sms:' + '?body=' + vm.smsContent);
      }
    };
    //拨打电话
    vm.callTel = function (tell) {
      window.open('tel:' + tell);
    };
    //选择时间转换时间戳
    function returnTime(date) {
      var dateTime = date;
      var time = '';
      if (dateTime.length) {
        time = dateTime[0] + ' ' + dateTime[1].toString() + ':' + dateTime[2].toString();
      }
      var appoint_time = new Date(time).getTime();
      return appoint_time;
    }
    //多列选择器
    function timeListSelect(dateNow) {
      dataService.orderId = orderId;
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
          vm.appointmentTime = result;
          var dateNow = new Date().getTime();
          //选择时间时间戳
          var appoint_time = returnTime(vm.appointmentTime);
          console.log(appoint_time);
          console.log(dateNow);
          if (appoint_time < dateNow) {
            weui.alert('\u9884\u7ea6\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4');
            return false;
          }
          dataService.uploadAppointmentTime = result;
          $state.go('app.order-list.update-appointment', {
            orderId: orderId,
            status: 1,
            appointId: vm.orderDetailsData.last_appoint_id
          });
        },
        id: 'multiPickerBtn'
      });
    }
    vm.getOrderDeatail();
    console.log(orderId);
  }
]);