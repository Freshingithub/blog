/**
 * Created by Administrator on 2016/6/22 0022.
 */
angular.module("smart_home.mycontroller", [])

    .controller('SettingCtrl',function($scope,$ionicPopup){
        $scope.Exit=function(){
            var confirmPopup=$ionicPopup.confirm({
                cssClass:'SettingPopup',
                title:'<span>提示</span>',
                template:'<span>确定要退出吗？</span>',
                cancelText:'取消',
                okText:'确定',
                type:'button-light'
            });
            confirmPopup.then(function(res){
                if(res){
                    console.log(res);
                }
                else {
                    console.log(res);
                }
            })
        }
    })

    .controller('MRoomCtrl',function($scope){
        $scope.myDate = new Date();
      /*  $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());
        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };*/
    })

    .controller('SecurityManageCtrl',function($scope){
        $scope.flag=true;
        $scope.imgsrc="img/Security-02.jpg";
        $scope.addSecurity=function(){
            $scope.flag=false;
            $scope.imgsrc="img/Security-01.jpg";
        }
        $scope.removeSecurity=function(){
            $scope.flag=true;
            $scope.imgsrc="img/Security-02.jpg";
        }
    })