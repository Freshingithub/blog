app.controller('manualContentCtrl', [
  '$scope',
  '$state',
  '$http',
  '$stateParams',
  '$compile',
  '$sce',
  'manualModel',
  'dataService',
  function ($scope, $state, $http, $stateParams, $compile, $sce, manualModel, dataService) {
    var vm = $scope;
    var id = $stateParams.id;
    //访问的类型，1：操作指南  2：业务通告
    var visitType = $stateParams.type;
    // if(visitType==1){ 
    // 	document.title = "操作指南正文";
    // }else if(visitType==2){
    // 	document.title = "业务通告正文";
    // }
    //获取用户参数
    var params = {
        content_id: id,
        visitType: visitType,
        token: dataService.userData.token
      };
    //获取操作指南、业务通告详情
    var getManualContentShow = function () {
      var promise = manualModel.getManualContent(params);
      ;
      promise.then(function (val) {
        vm.datas = val;
      });
    };
    getManualContentShow();
  }
]);