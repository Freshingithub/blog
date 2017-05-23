app.controller('returnPartCtrl', [
  '$scope',
  '$stateParams',
  'dataService',
  'orderModel',
  '$location',
  '$window',
  'jssdkModel',
  function ($scope, $stateParams, dataService, orderModel, $location, $window, jssdkModel) {
    var vm = $scope;
    var orderId = dataService.orderId;
    var partId = $stateParams.partId;
    var pre_num = 0;
    vm.formData = {
      worker_sb_express_num: '',
      worker_sb_com: '',
      worker_sb_paytype: 1,
      worker_sb_cost: null
    };
    vm.worker_sb_com = {};
    vm.com_list = [];
    vm.worker_sb_com_is_change = false;
    // vm.$watch(vm.formData.worker_sb_cost,function(nowVal,oldVal){
    //     if(nowVal){
    //         if(!reg.test(nowVal)){
    //             vm.formData.worker_sb_cost = oldVal;
    //         }
    //     }
    // })
    vm.tishiClick = function () {
      weui.alert('\u4e3a\u65b9\u4fbf\u5382\u5bb6\u786e\u8ba4\u914d\u4ef6\u5165\u5e93\u548c\u8d39\u7528\u7ed3\u7b97\uff0c\u56de\u5bc4\u914d\u4ef6\u65f6\u8bf7\u5728\u5feb\u9012\u5355\u4e0a\u6ce8\u660e\u672c\u5355\u7684\u5de5\u5355\u53f7');
    };
    //获取厂家
    var getFactoryAddress = function () {
      var params = { token: dataService.userData.token };
      var promise = orderModel.getFactoryAddress(params, partId, 1);
      promise.then(function (value) {
        var data = value;
        var str = data.factory_address ? data.factory_address : '';
        data.factory_address = str.replace(/-/g, '');
        vm.factoryData = data;
      });
    };
    //获取快递列表
    vm.getExpressComList = function (check) {
      var cp_num = vm.formData.worker_sb_express_num;
      if (!check || vm.worker_sb_com_is_change) {
        // 只要修改就会查询
        // if (!check || (vm.formData.worker_sb_express_num && vm.formData.worker_sb_express_num != pre_num)) { // 更准
        vm.worker_sb_com_is_change = false;
        var params = {
            express_num: vm.formData.worker_sb_express_num,
            page_size: 0
          };
        var promise = orderModel.getExpressComList(params);
        promise.then(function (value) {
          vm.com_list = value.data_list;
          if (vm.com_list && vm.com_list.length == 1) {
            vm.worker_sb_com = vm.com_list[0];
          }
        });
        pre_num = cp_num;
      }
    };
    vm.isChange = function () {
      vm.worker_sb_com_is_change = true;
    };
    vm.keyups = function () {
      vm.formData.worker_sb_express_num = vm.formData.worker_sb_express_num.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g, '');
    };
    //切换支付方式
    vm.selectPayType = function (type) {
      vm.formData.worker_sb_paytype = type;
    };
    //提交数据
    vm.submit = function () {
      var params = {
          worker_sb_com: vm.worker_sb_com.comcode ? vm.worker_sb_com.comcode : '',
          worker_sb_express_num: vm.formData.worker_sb_express_num,
          worker_sb_paytype: vm.formData.worker_sb_paytype,
          worker_sb_cost: vm.formData.worker_sb_cost
        };
      if (!params.worker_sb_express_num) {
        weui.alert('\u8bf7\u586b\u5199\u7269\u6d41\u5355\u53f7');
      } else if (!params.worker_sb_com) {
        weui.alert('\u8bf7\u9009\u62e9\u7269\u6d41\u516c\u53f8');
      } else {
        var promise = orderModel.submitPart(params, partId);
        promise.then(function (value) {
          weui.toast('\u63d0\u4ea4\u6210\u529f', {
            duration: 1500,
            className: 'bears'
          });
          setTimeout(function () {
            $window.history.back();
          }, 1500);
        });
      }  // var promise = orderModel.submitPart(params, partId);
         // promise.then(function(value){
         //     console.log(value);
         // })
    };
    function weixinJssdk() {
      var promise = jssdkModel.getConfig();
      promise.then(function (value) {
        var config = JSON.parse(value.json ? value.json : '{}');
        // config.debug = true;
        wx.config(config);
        wx.ready(function () {
          weixinSys();
        });
      });
    }
    function weixinSys() {
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1,
        scanType: [
          'qrCode',
          'barCode'
        ],
        success: function (res) {
          var str = res.resultStr ? res.resultStr : '';
          var str_arr = str.split(',');
          var number = str_arr.length > 1 ? str_arr[str_arr.length - 1] : str_arr[0];
          vm.formData.worker_sb_express_num = number;
          vm.getExpressComList();
          vm.$apply();
        },
        error: function (res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('\u7248\u672c\u8fc7\u4f4e\u8bf7\u5347\u7ea7');
          }
        }
      });
    }
    vm.weixinSys = function () {
      weixinJssdk();
    };
    getFactoryAddress();
    vm.getExpressComList(false);
  }
]);