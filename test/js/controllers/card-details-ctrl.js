app.controller('cardDetailsCtrl', [
  '$scope',
  '$state',
  '$location',
  'dataService',
  'workerModel',
  '$location',
  'areaModel',
  'scrollAreasService',
  'commonModel',
  function ($scope, $state, $location, dataService, workerModel, $location, areaModel, scrollAreasService, commonModel) {
    var vm = $scope;
    var check_updatecard_password = dataService.check_updatecard_password;
    dataService.check_updatecard_password = undefined;
    vm.is_verify = false;
    vm.worker = dataService.workerInfo;
    vm.card_info = dataService.bankCardInfo;
    vm.showAddress = {};
    vm.banks = [];
    vm.bank_info = {};
    vm.card_number = '';
    vm.is_other_bank = false;
    vm.getCardDetails = function (is_addCardInfo) {
      var promise = workerModel.getWorkerCardDetail();
      promise.then(function (value) {
        vm.card_info = value;
        if (dataService.updateCardInfoType == 5) {
          dataService.updateCardInfoType = undefined;
          $state.go('app.verify-password', { type: 5 });
        } else if (dataService.check_crash_password) {
          //  || dataService.verify_pre_url == 'applyCrash'
          $state.go('app.apply-crash');
        } else if (is_addCardInfo) {
          $state.go('app.my-card');
        } else {
          inits();
        }
      });
    };
    vm.selectBank = function () {
      var promise = workerModel.getBanks();
      promise.then(function (value) {
        vm.banks = value;
      });
    };
    //获取区域
    var getAreas = function () {
      var promise = areaModel.getAreas();
      promise.then(function (value) {
        dataService.areasData = value;
      });
    };
    vm.selectBankCity = function () {
      if (!vm.card_info.had_card) {
        //多列选择器
        weui.picker(dataService.areasData, {
          defaultValue: [
            '110000',
            '110100'
          ],
          depth: 2,
          onChange: function (result) {
          },
          onConfirm: function (result) {
            if (result && result.length > 2) {
              result.pop();
            }
            var returnAreas = scrollAreasService.returnAreas(result, ',');
            vm.showAddress.area_ids_desc = returnAreas;
            vm.showAddress.area_ids = result.join(',');
            vm.$apply();
          },
          id: 'doubleLinePicker'
        });
      }
    };
    function inits() {
      // console.log(vm.card_info.credit_card);
      // console.log(check_updatecard_password);
      if (!vm.card_info.is_pay_password) {
        weui.confirm('\u5c1a\u672a\u8bbe\u7f6e\u63d0\u73b0\u5bc6\u7801,\u662f\u5426\u7ee7\u7eed\uff1f', function () {
          dataService.verify_pre_url = 'updateWorkerCardInfo';
          $state.go('app.setting-password', { type: 1 });
        }, function () {
          $state.go('app.my-card');
        });
      } else if (!vm.card_info.credit_card && !check_updatecard_password) {
        weui.confirm('\u672a\u9a8c\u8bc1\u5bc6\u7801,\u662f\u5426\u7ee7\u7eed\uff1f', function () {
          dataService.verify_pre_url = 'updateWorkerCardInfo';
          $state.go('app.verify-password', { type: '2' });
        }, function () {
          $state.go('app.my-card');
        });
      } else {
        vm.bank_id = vm.card_info.bank_id;
        vm.other_bank_name = vm.card_info.other_bank_name;
        vm.bankChange();
        vm.card_number = vm.card_info.credit_card;
        vm.showAddress.area_ids = vm.card_info.bank_city_ids;
        vm.showAddress.area_ids_desc = vm.card_info.bank_city ? vm.card_info.bank_city.replace('-', ',') : '';
        getAreas();
        vm.selectBank();
      }
    }
    vm.deleteCard = function () {
      if (!vm.card_info.is_pay_password) {
        weui.confirm('\u4f60\u672a\u8bbe\u7f6e\u63d0\u73b0\u5bc6\u7801\uff0c\u662f\u5426\u524d\u5f80\u8bbe\u7f6e\uff1f', function () {
          dataService.verify_pre_url = 'deleteWorkerCardInfo';
          $state.go('app.setting-password', { type: 4 });
        }, function () {
        }, { title: '\u63d0\u793a' });
      } else {
        weui.confirm('\u5220\u9664\u94f6\u884c\u5361\u540e\uff0c\u4f60\u9700\u8981\u91cd\u65b0\u6dfb\u52a0\u94f6\u884c\u5361\u624d\u53ef\u63d0\u73b0\uff0c\u662f\u5426\u786e\u8ba4\u5220\u9664?', function () {
          dataService.verify_pre_url = 'deleteWorkerCardInfo';
          $state.go('app.verify-password', { type: 4 });
        });
      }
    };
    vm.notVerify = function () {
      vm.is_verify = false;
    };
    vm.bankChange = function () {
      // 659004728
      if (vm.bank_id == 659004728) {
        vm.is_other_bank = true;
      } else {
        vm.is_other_bank = false;
      }
    };
    function verifyData(post_data) {
      if (!post_data.bank_id) {
        weui.alert('\u8bf7\u9009\u62e9\u5f00\u6237\u94f6\u884c');
      } else if (!post_data.bank_city_ids) {
        weui.alert('\u8bf7\u9009\u62e9\u5f00\u6237\u57ce\u5e02');
      } else if (vm.is_other_bank && !post_data.other_bank_name) {
        weui.alert('\u8bf7\u586b\u5199\u94f6\u884c\u540d\u79f0');
      } else if (!post_data.credit_card) {
        weui.alert('\u8bf7\u586b\u5199\u5361\u53f7');
      } else {
        return true;
      }
      return false;
    }
    vm.isVerify = function () {
      var post_data = {
          pay_password: check_updatecard_password,
          bank_id: vm.bank_id,
          credit_card: vm.card_number,
          bank_city_ids: vm.showAddress.area_ids,
          other_bank_name: vm.other_bank_name
        };
      if (verifyData(post_data)) {
        var promise = commonModel.checkCreditCard(post_data.credit_card);
        promise.then(function (value) {
          vm.is_verify = true;
        });
      }
    };
    vm.postSubmit = function () {
      var post_data = {
          pay_password: check_updatecard_password,
          bank_id: vm.bank_id,
          credit_card: vm.card_number,
          bank_city_ids: vm.showAddress.area_ids,
          other_bank_name: vm.other_bank_name
        };
      if (verifyData(post_data)) {
        var promise = workerModel.workerAddBanks(post_data);
        promise.then(function (value) {
          weui.alert('\u94f6\u884c\u5361\u6dfb\u52a0\u6210\u529f', function () {
            dataService.verify_pre_url == 'updateWorkerCardInfo' && (dataService.verify_pre_url = '');
            vm.notVerify();
            vm.getCardDetails(true);
          });
        });
      }
    };
    if (vm.card_info == undefined) {
      vm.getCardDetails();
    } else {
      inits();
    }
    vm.account = function () {
      vm.card_number = vm.card_number.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    };
  }
]);