app.controller('applyCostsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'popupOptionService',
  'orderModel',
  'dataService',
  'jssdkModel',
  function ($scope, $state, $stateParams, popupOptionService, orderModel, dataService, jssdkModel) {
    var vm = $scope;
    //表单数据
    vm.formData = {};
    vm.images = [];
    vm.images_url = [];
    var uploadNum = 3;
    //工单详情ID
    var orderDetailId = $stateParams.orderDetailId;
    //选择费用类型
    vm.selectCostsType = function () {
      var options = [
          {
            id: 0,
            text: '\u8fdc\u7a0b\u4e0a\u95e8\u8d39\u7528'
          },
          {
            id: 1,
            text: '\u8d2d\u4e70\u914d\u4ef6\u8d39\u7528'
          },
          {
            id: 2,
            text: '\u65e7\u673a\u62c6\u673a\u548c\u6253\u5305\u8d39\u7528'
          },
          {
            id: 3,
            text: '\u65e7\u673a\u8fd4\u5382\u8fd0\u8d39'
          },
          {
            id: 4,
            text: '\u5176\u4ed6'
          }
        ];
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        vm.formData.costsType = options[evt].text;
        vm.formData.costsTypeId = parseInt(evt) + 1;
        vm.$apply();
        console.log(evt);
      });
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
    //提交
    vm.submit = function () {
      var params = {
          token: dataService.userData.token,
          money: vm.formData.money,
          cost_type: vm.formData.costsTypeId,
          worker_remarks: vm.formData.worker_remarks ? vm.formData.worker_remarks : '',
          cost_img: JSON.stringify(vm.images_url)
        };
      var promise = orderModel.submitApplyCosts(params, orderDetailId);
      promise.then(function (value) {
        weui.toast('\u63d0\u4ea4\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        setTimeout(function () {
          $state.go('app.order-details', { orderId: dataService.orderId });
        }, 1500);
      });
    };
  }
]);