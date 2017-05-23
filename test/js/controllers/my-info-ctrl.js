app.controller('myInfoCtrl', [
  '$scope',
  '$location',
  'dataService',
  'areaModel',
  'scrollAreasService',
  'workerModel',
  'jssdkModel',
  '$window',
  function ($scope, $location, dataService, areaModel, scrollAreasService, workerModel, jssdkModel, $window) {
    var vm = $scope;
    var userData = dataService.userData;
    console.log(userData);
    vm.is_hash = false;
    vm.update = { worker_area_arr: [] };
    vm.showAddress = {};
    vm.images = ['img/postid01.png'];
    vm.images2 = ['img/postid02.png'];
    vm.images_url = [];
    var media_ids = [];
    vm.myInfo = function () {
      var promise = workerModel.getInfo();
      promise.then(function (value) {
        if (value.worker_id && value.is_qianzai == 1) {
          value.worker_area_arr = value.worker_area_ids.split(',');
          dataService.workerInfo = value;
          vm.update = value;
        } else {
          vm.is_hash = true;
        }
        if (!vm.is_hash && vm.update.card_front) {
          vm.images = [vm.update.card_front_full];
          vm.images2 = [vm.update.card_back_full];
          vm.card_front = vm.update.card_front;
          vm.card_back = vm.update.card_back;
        }
      });
    };
    //获取区域
    var getAreas = function () {
      var promise = areaModel.getAreas();
      promise.then(function (value) {
        dataService.areasData = value;
        console.log(dataService.areasData);
      });
    };
    //选择地区
    vm.selectAreas = function () {
      //多列选择器
      if (vm.update.is_complete_info != 1) {
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
            vm.update.worker_address = returnAreas;
            // vm.update.worker_area_ids = result.join(',');
            vm.update.worker_area_arr = result;
            vm.$apply();
          },
          id: 'doubleLinePicker'
        });
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
    vm.selectImg = function () {
      media_ids = [];
      wx.ready(function () {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: [
            'album',
            'camera'
          ],
          success: function (res) {
            vm.$apply(function () {
              vm.images = [];
              // angular.forEach(res.localIds, function(v, k) {
              // 	vm.images.push(v);
              // });
              vm.syncUpload(res.localIds, 1);
            });
          }
        });
      });
    };
    //选择上传图片
    vm.selectImg2 = function () {
      media_ids = [];
      wx.ready(function () {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: [
            'album',
            'camera'
          ],
          success: function (res) {
            vm.$apply(function () {
              vm.images2 = [];
              // angular.forEach(res.localIds, function(v, k) {
              // 	vm.images2.push(v);
              // });
              vm.syncUpload(res.localIds, 2);
            });
          }
        });
      });
    };
    vm.syncUpload = function (localIds, type) {
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
              if (type == 1) {
                //正面
                vm.card_front = value[0]['url'];
                vm.images = [value[0]['url']];
              } else {
                //反面
                vm.card_back = value[0]['url'];
                vm.images2 = [value[0]['url']];
              }
              // vm.images_url = value;
              vm.$apply();
            });
          }
        }
      });
    };
    vm.submitWorker = function () {
      if (!vm.update.nickname) {
        weui.alert('\u8f93\u5165\u59d3\u540d');
      } else if (vm.update.worker_area_arr.length < 3) {
        weui.alert('\u8bf7\u5b8c\u6210\u6240\u5728\u533a\u57df\u7684\u9009\u62e9');
      } else if (!vm.update.worker_detail_address) {
        weui.alert('\u8f93\u5165\u8be6\u7ec6\u5730\u5740');
      } else if (!vm.update.card_no) {
        weui.alert('\u8f93\u5165\u8eab\u4efd\u8bc1\u53f7\u7801');
      }
      if (!vm.card_front) {
        weui.alert('\u8bf7\u4e0a\u4f20\u8eab\u4efd\u8bc1\u6b63\u9762');
      } else if (!vm.card_back) {
        weui.alert('\u8bf7\u4e0a\u4f20\u8eab\u4efd\u8bc1\u53cd\u9762');
      } else if (!dataService.userData.token) {
        vm.update.card_front = vm.card_front;
        vm.update.card_back = vm.card_back;
        var promise = workerModel.fillWorkerInfo(vm.update);
        promise.then(function (value) {
          if (value.token) {
            dataService.userData = value;
          }
          weui.alert('\u64cd\u4f5c\u6210\u529f', function () {
            if (dataService.orderPath) {
              $window.location.href = '#' + dataService.orderPath;
            } else {
              $window.location.href = '#/app/user-main';
            }
          });
        });
      } else {
        vm.update.card_front = vm.card_front;
        vm.update.card_back = vm.card_back;
        var promise = workerModel.updateWorkerInfo(vm.update);
        promise.then(function (value) {
          weui.alert('\u64cd\u4f5c\u6210\u529f', function () {
            if (dataService.orderPath) {
              $window.location.href = '#' + dataService.orderPath;  // $location.path(''+dataService.orderPath);
            } else {
              $window.location.href = '#/app/user-main';  // $location.path('/app/user-main');
            }
          });
        });
      }
    };
    // $location.path('/app', dataService.userData);
    getAreas();
    vm.getSDKConfig();
    if (userData.hash || $location.search().hash) {
      vm.is_hash = true;
    } else if (!dataService.workerInfo.worker_id) {
      vm.myInfo();
    } else {
      vm.update = dataService.workerInfo;
      if (!vm.is_hash && vm.update.card_front) {
        vm.images = [vm.update.card_front_full];
        vm.images2 = [vm.update.card_back_full];
        vm.card_back = vm.update.card_back;
        vm.card_front = vm.update.card_front;
      }
    }
  }
]);