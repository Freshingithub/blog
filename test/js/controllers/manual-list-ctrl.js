app.controller('manualListCtrl', [
  '$scope',
  '$state',
  '$http',
  '$stateParams',
  'manualModel',
  'dataService',
  function ($scope, $state, $http, $stateParams, manualModel, dataService) {
    var vm = $scope;
    var num = 1;
    //访问的类型，1：操作指南  2：业务通告
    var visitType = $stateParams.type;
    // if(visitType==1){ 
    // 	document.title = "业务通告";
    // }else if(visitType==2){
    // 	document.title = "接单必读";
    // }else if(visitType==3){
    // 	document.title = "活动消息";
    // }
    //获取用户参数
    var params = {
        worker_id: dataService.userData.id,
        type: visitType
      };
    //获取操作指南列表
    var getManualListShow = function () {
      //如果是1:操作指南,2:业务通告
      var promise = manualModel.getManualList(params);
      promise.then(function (val) {
        vm.data = val;
        vm.datalist = val.data_list;
        if (!vm.datalist) {
          vm.defaultList = true;
        } else {
          vm.defaultList = false;
        }  // console.log(val);
      });
    };
    //下滑加载分页
    vm.loadMore = function () {
      //测试翻页功能，接口成型后要去掉
      //alert("load");
      if (Math.ceil(vm.data.count / 10) == num) {
        return false;
      }
      vm.busy = true;
      num += 1;
      params.page_no = num;
      var promise;
      //如果是1:操作指南,2:业务通告
      promise = manualModel.getManualList(params);
      promise.then(function (val) {
        Array.prototype.push.apply(vm.datalist, val.data_list);
        vm.busy = false;
      });
    };
    getManualListShow();
    //跳转到操作指南或业务通告的具体内容
    vm.gotoContent = function (id) {
      $state.go('app.manual-content', {
        type: visitType,
        id: id
      });
    };
  }
]);