app.controller('feedbackCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'dataService',
  'workerModel',
  'popupOptionService',
  function ($scope, $state, $stateParams, dataService, workerModel, popupOptionService) {
    var vm = $scope;
    var options = [
        {
          id: 1,
          text: '\u6295\u8bc9\u5ba2\u670d'
        },
        {
          id: 2,
          text: '\u6295\u8bc9\u5382\u5bb6'
        },
        {
          id: 3,
          text: '\u6295\u8bc9\u4f01\u4e1a\u53f7'
        },
        {
          id: 4,
          text: '\u5176\u4ed6'
        }
      ];
    vm.type = 0;
    vm.type_text = '\u8bf7\u9009\u62e9\u7c7b\u578b';
    vm.content = '';
    vm.showList = function () {
      //弹窗列表
      popupOptionService.popupList(options, function (evt, val) {
        var select = options[evt - 1];
        vm.type = evt;
        vm.type_text = select.text;
        vm.$apply();
      });
    };
    vm.addWorkerFeedbacks = function () {
      if (!vm.type) {
        weui.alert('\u8bf7\u9009\u62e9\u7c7b\u578b');
        return;
      } else if (!vm.content) {
        weui.alert('\u8bf7\u586b\u5199\u53cd\u9988\u5185\u5bb9');
        return;
      } else {
        var parss = {
            type: vm.type,
            content: vm.content
          };
        var promise = workerModel.addWorkerFeedbacks(parss);
        promise.then(function (value) {
          weui.alert('\u63d0\u4ea4\u6210\u529f', function () {
            $state.go('app.return-history');
          });
        });
      }
    };
  }
]);