app.controller('myCardCtrl', [
  '$scope',
  'dataService',
  'workerModel',
  '$state',
  function ($scope, dataService, workerModel, $state) {
    var vm = $scope;
    vm.card_info = dataService.bankCardInfo;
    vm.is_other_bank = false;
    vm.getCardDetails = function () {
      var promise = workerModel.getWorkerCardDetail();
      promise.then(function (value) {
        vm.card_info = value;
        vm.card_info.credit_card = value.credit_card.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        vm.bankChange();
      });
    };
    vm.bankChange = function () {
      // 659004728
      if (vm.card_info.bank_id == 659004728) {
        vm.is_other_bank = true;
      } else {
        vm.is_other_bank = false;
      }
    };
    vm.goAddCardInfo = function () {
      dataService.verify_pre_url = 'updateWorkerCardInfo';
      if (!vm.card_info.is_pay_password) {
        weui.confirm('\u4f60\u672a\u8bbe\u7f6e\u63d0\u73b0\u5bc6\u7801\uff0c\u662f\u5426\u524d\u5f80\u8bbe\u7f6e\uff1f', function () {
          $state.go('app.setting-password', { type: 1 });
        }, function () {
        }, { title: '\u63d0\u793a' });
      } else {
        $state.go('app.verify-password', { type: 2 });
      }
    };
    if (vm.card_info == undefined) {
      vm.getCardDetails();
    } else {
      vm.bankChange();
      vm.card_info.credit_card = vm.card_info.credit_card.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }
  }
]);