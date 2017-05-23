app.controller('orderListCtrl', [
  '$scope',
  '$filter',
  '$stateParams',
  '$state',
  'orderModel',
  'dataService',
  'popupOptionService',
  'scrollTimeService',
  function ($scope, $filter, $stateParams, $state, orderModel, dataService, popupOptionService, scrollTimeService) {
    var vm = $scope;
    // weui.alert('退单会影响个人信誉和接单量，请慎重退单！',{ title:'温馨提示',buttons:[{label:'知道了'}]});
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
    var num = 1;
    vm.showView = false;
    vm.txtSearch = '';
    vm.orderStatus = $stateParams.type;
    if (!vm.orderStatus) {
      vm.orderStatus = 1;
    }
    vm.ptNum = 'padding-top:95px;';
    if (vm.orderStatus == 5 || vm.orderStatus == 7) {
      vm.ptNum = 'padding-top:35px;';
    }
    //获取订单参数
    var params = {
        member_id: dataService.userData.id,
        member_type: dataService.userData.type,
        type: vm.orderStatus,
        address: ''
      };
    //获取订单列表
    var getOrderList = function () {
      var promise = orderModel.getOrderList(params);
      promise.then(function (val) {
        vm.data = val;
        vm.datalist = val.data_list;
        if (!vm.datalist) {
          if (vm.txtSearch) {
            vm.defaultList = false;
            vm.defaultSearchList = true;
          } else {
            vm.defaultSearchList = false;
            vm.defaultList = true;
          }
        } else {
          vm.defaultList = false;
          vm.defaultSearchList = false;
        }  // console.log(val);
      });
    };
    //点击上传预约
    vm.uploadClick = function (orderId) {
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        console.log(evt);
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
              console.log(result);
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
    vm.uploadReport = function (products, orderId) {
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
      }  // if(products.length > 1){
         // 	dataService.productsData = products;
         // 	console.log(dataService.productsData);
         // 	$state.go('app.product-select');
         // }else{
         // 	dataService.productsInfo = products[0];
         // 	$state.go('app.upload-report');
         // }
    };
    //返回时间状态
    vm.returnExtendType = function (type, describe) {
      var timestamp = new Date().getTime();
      var extendContent = describe;
      if (type == 1 || type == 2) {
        var time = describe * 1000 - timestamp;
        // if(time <= 0){
        if (time <= 59) {
          if (type == 1) {
            extendContent = '\u8bf7\u5c3d\u5feb\u4e0e\u7528\u6237\u8054\u7cfb\uff0c\u9884\u7ea6\u4e0a\u95e8';
          } else {
            extendContent = '\u8bf7\u6309\u7167\u9884\u7ea6\u7684\u65f6\u95f4\u4e0a\u95e8\u670d\u52a1';
          }
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
    //切换列表
    vm.selectTab = function (type) {
      // vm.orderStatus = type;
      // params.type = type;
      // num = 1;
      // getOrderList();
      $state.go('app.order-list', { type: type });
    };
    //搜索
    vm.search = function () {
      params.address = vm.txtSearch;
      num = 1;
      getOrderList();
    };
    //回车事件
    vm.myKeyup = function (e) {
      var keycode = window.event ? e.keyCode : e.which;
      if (keycode == 13) {
        vm.search();
      }
    };
    //下滑加载分页
    vm.loadMore = function () {
      if (Math.ceil(vm.data.count / 10) == num) {
        return false;
      }
      vm.busy = true;
      num += 1;
      params.page_no = num;
      var promise = orderModel.getOrderList(params);
      promise.then(function (val) {
        Array.prototype.push.apply(vm.datalist, val.data_list);
        vm.busy = false;
      });
    };
    //返回详细区域字符串
    vm.areaDesc = function (desc) {
      // var desc = desc.replace(/-/g,"");
      var desc = desc.split('-')[2];
      return desc;
    };
    getOrderList();
  }
]);