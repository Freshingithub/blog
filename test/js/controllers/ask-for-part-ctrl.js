app.controller('askForPartCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'orderModel',
  'dataService',
  'jssdkModel',
  function ($scope, $state, $stateParams, orderModel, dataService, jssdkModel) {
    var vm = $scope;
    vm.showView = false;
    vm.num = 1;
    vm.images = [];
    vm.images_url = [];
    var uploadNum = 3;
    // 父级接收
    vm.$on('address', function (event, data) {
      vm.addressData = data;
    });
    $('input,textarea').on('click', function () {
      var target = this;
      setTimeout(function () {
        // console.log(target);
        target.scrollIntoView(true);
      }, 100);
    });
    //工单ID
    var orderId = $stateParams.orderId;
    //工单详情ID
    var orderDetailId = $stateParams.orderDetailId;
    //表单数据
    vm.formData = {};
    //收件地址
    vm.addressData = {};
    //获取用户地址
    var getPartAddress = function (orderId) {
      var params = { token: dataService.userData.token };
      var promise = orderModel.orderPartAddress(params, orderId);
      promise.then(function (value) {
        vm.addressDataObject = value;
        vm.addressData = value.user_address;
        vm.addressData.area = '';
        if (vm.addressData.area_desc) {
          var area_desc = vm.addressData.area_desc.split(',');
          for (var i = 0; i < area_desc.length; i++) {
            if (i == 0) {
              vm.addressData.area += area_desc[i] + '\u7701';
            } else {
              vm.addressData.area += area_desc[i];
            }
          }
        }
        console.log(value);
      });
    };
    //提交配件申请
    vm.submitPartEntry = function () {
      var params = vm.formData;
      params.token = dataService.userData.token;
      params.applicant = vm.addressData.full_name;
      params.applicant_tell = vm.addressData.tell;
      params.receive_area = vm.addressData.area_full;
      params.receiving_address = vm.addressData.address;
      params.nums = vm.num;
      params.acce_photos = JSON.stringify(vm.images_url);
      var promise = orderModel.submitPartEntry(params, orderDetailId);
      promise.then(function (value) {
        weui.toast('\u64cd\u4f5c\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        setTimeout(function () {
          $state.go('app.order-details', { orderId: dataService.orderId });  // $state.go('app.order-list',{type:2})
        }, 1500);
      });
    };
    //数量操作
    vm.numCount = function (type) {
      if (type == 1) {
        if (vm.num < 9) {
          vm.num += 1;
        } else {
          weui.alert('\u7533\u8bf7\u6570\u91cf\u6700\u591a\u4e3a9');
        }
      } else {
        if (vm.num > 1) {
          vm.num = vm.num - 1;
        } else {
          weui.alert('\u7533\u8bf7\u6570\u91cf\u81f3\u5c11\u4e3a1');
        }
      }
    };
    //获取jssdk配置
    vm.getSDKConfig = function () {
      var promise = jssdkModel.getConfig();
      promise.then(function (value) {
        var config = JSON.parse(value.json ? value.json : '{}');
        // config.debug = true;
        wx.config(config);
      });
    };
    //选择上传图片
    vm.selectPartImg = function () {
      media_ids = [];
      wx.ready(function () {
        wx.chooseImage({
          count: uploadNum,
          sizeType: ['compressed'],
          sourceType: [
            'album',
            'camera'
          ],
          success: function (res) {
            vm.$apply(function () {
              // angular.forEach(res.localIds, function(v, k) {
              // 	vm.images.push(v);
              // });
              //               uploadNum = 3 - vm.images.length;
              vm.syncUpload(res.localIds);
            });
          }
        });
      });
    };
    //上传图片到服务器
    vm.syncUpload = function (localIds) {
      var localId = localIds.pop();
      wx.uploadImage({
        localId: localId,
        isShowProgressTips: 1,
        success: function (res) {
          // var serverId = res.serverId; // 返回图片的服务器端ID
          media_ids.push(res.serverId);
          //其他对serverId做处理的代码
          if (localIds.length > 0) {
            vm.syncUpload(localIds);
          } else {
            var promise = jssdkModel.mediaidsUrl(media_ids);
            promise.then(function (value) {
              angular.forEach(value, function (v, k) {
                vm.images_url.push(v);
                vm.images.push(v.url_full);
              });
              uploadNum = 3 - vm.images.length;
              vm.$apply();
            });
          }
        }
      });
    };
    //删除图片
    vm.closeImg = function (index) {
      weui.confirm('\u662f\u5426\u5220\u9664\u8be5\u56fe\u7247', function () {
        vm.images.splice(index, 1);
        vm.images_url.splice(index, 1);
        uploadNum = 3 - vm.images.length;
        vm.$apply();
      }, function () {
        console.log('no');
      }, { title: '\u63d0\u793a' });
    };
    getPartAddress(orderId);
  }
]);