app.controller('uploadReportCtrl', [
  '$scope',
  '$state',
  'popupOptionService',
  'dataService',
  'orderModel',
  'jssdkModel',
  function ($scope, $state, popupOptionService, dataService, orderModel, jssdkModel) {
    var vm = $scope;
    vm.serviceProject = '\u8bf7\u9009\u62e9\u670d\u52a1\u9879\u76ee';
    vm.serviceResult = '\u8bf7\u9009\u62e9\u670d\u52a1\u7ed3\u679c';
    vm.images = [];
    // vm.images = [
    // 	"weixin://resourceid/66fed33a8a76ea0bbb80581be427d301",
    // 	"weixin://resourceid/13a0eff4eff45e1092403c573338c6e0",
    // 	"weixin://resourceid/441127362234ca3d27b0d12e5b653a74",
    // ];
    vm.images_url = [];
    var media_ids = [];
    var uploadNum = 8;
    //获取产品信息
    vm.getProduct = function () {
      vm.productInfo = dataService.productsInfo;
      vm.detailsOrderId = vm.productInfo.order_detail_id;
    };
    //获取详细信息
    vm.getDetailsInfo = function (orderDetailsId) {
      var promise = orderModel.ordersDetails(orderDetailsId);
      promise.then(function (value) {
        vm.detailsInfoData = value;
        if (vm.detailsInfoData.fault_desc) {
          vm.serviceProject = vm.detailsInfoData.fault_desc;
        }
        console.log(value);
      });
    };
    //选择服务项
    vm.selectService = function () {
      var options = [];
      for (var i = 0; i < vm.detailsInfoData.service_list.length; i++) {
        var data = {
            id: i,
            text: vm.detailsInfoData.service_list[i].fault_name,
            desc: vm.detailsInfoData.service_list[i].fault_desc,
            sid: vm.detailsInfoData.service_list[i].id
          };
        options.push(data);
      }
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        console.log(options[evt]);
        var content = '<p class="confirmContent">' + options[evt].desc + '</p><p class="confirmContent">\u6ce8\uff1a</p><p class="confirmContent">\u670d\u52a1\u9879\u662f\u4e3a\u60a8\u7ed3\u7b97\u8d39\u7528\u7684\u91cd\u8981\u6807\u51c6\uff0c\u5728\u63d0\u4ea4\u670d\u52a1\u62a5\u544a\u540e\u5c06\u65e0\u6cd5\u4fee\u6539\u3002\u4e3a\u4fdd\u8bc1\u901a\u8fc7\u5ba1\u6838\uff0c\u8bf7\u6309\u771f\u5b9e\u60c5\u51b5\u9009\u62e9\u3002\u5982\u5bf9\u670d\u52a1\u9879\u76ee\u5185\u5bb9\u6709\u7591\u95ee\uff0c\u8bf7\u4e0e\u6211\u4eec\u7684\u5ba2\u670d\u8054\u7cfb\u786e\u8ba4\u3002</p>';
        weui.confirm(content, function () {
          var params = {
              token: dataService.userData.token,
              service_id: options[evt].sid
            };
          var promise = orderModel.selectServiceProject(params, vm.detailsOrderId);
          promise.then(function (value) {
            console.log(value);
          });
          vm.serviceProject = options[evt].text;
          vm.$apply();
        }, function () {
          console.log('\u53d6\u6d88');
        }, { title: options[evt].text + '\u8bf4\u660e' });
      });
    };
    //选择服务结果
    vm.selectServiceResult = function () {
      if (vm.serviceProject == '\u8bf7\u9009\u62e9\u670d\u52a1\u9879\u76ee') {
        weui.alert('\u8bf7\u5148\u9009\u62e9\u670d\u52a1\u9879\u76ee');
        return false;
      }
      var options = [
          {
            id: 0,
            text: '\u5b8c\u6210\u670d\u52a1\uff0c\u6211\u8981\u7ed3\u7b97'
          },
          {
            id: 1,
            text: '\u9700\u8981\u66f4\u6362\u914d\u4ef6\uff0c\u63d0\u4ea4\u7533\u8bf7'
          },
          {
            id: 2,
            text: '\u9700\u8981\u589e\u52a0\u8d39\u7528\uff0c\u63d0\u4ea4\u7533\u8bf7'
          },
          {
            id: 3,
            text: '\u65e0\u6cd5\u5b8c\u6210\u7ef4\u4fee'
          }
        ];
      //弹窗列表
      popupOptionService.popupList(options, function (evt) {
        if (evt == 0 || evt == 3) {
          vm.reportEnd = true;
          if (evt == 0) {
            vm.isComplete = 1;
          } else {
            vm.isComplete = 2;
          }
          vm.serviceResult = options[evt].text;
          vm.$apply();
        } else if (evt == 1) {
          $state.go('app.ask-for-part', {
            orderId: vm.detailsInfoData.worker_order_id,
            orderDetailId: vm.detailsInfoData.order_detail_id
          });
        } else if (evt == 2) {
          $state.go('app.apply-costs', { orderDetailId: vm.detailsInfoData.order_detail_id });
        }
      });
    };
    //获取jssdk配置
    vm.getSDKConfig = function () {
      var promise = jssdkModel.getConfig();
      promise.then(function (value) {
        var config = JSON.parse(value.json);
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
              //               uploadNum = 8 - vm.images.length;
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
              uploadNum = 8 - vm.images.length;
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
        uploadNum = 8 - vm.images.length;
        vm.$apply();
      }, function () {
        console.log('no');
      }, { title: '\u63d0\u793a' });
    };
    //提交服务报告
    vm.submitReport = function () {
      if (!vm.isComplete) {
        weui.alert('\u8bf7\u9009\u62e9\u670d\u52a1\u7ed3\u679c');
        return false;
      }
      // orderModel.submitServiceReport();
      var params = {
          token: dataService.userData.token,
          is_complete: vm.isComplete,
          report_desc: vm.txtReport,
          report_imgs_json: JSON.stringify(vm.images_url)
        };
      var promise = orderModel.submitServiceReport(params, vm.detailsOrderId);
      promise.then(function (value) {
        weui.toast('\u63d0\u4ea4\u6210\u529f', {
          duration: 1500,
          className: 'bears'
        });
        setTimeout(function () {
          $state.go('app.order-list', { type: 4 });
        }, 1500);
      });
    };
    vm.getProduct();
    vm.getDetailsInfo(vm.detailsOrderId);
    vm.getSDKConfig();
  }
]);