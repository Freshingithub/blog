/**
 * Created by Administrator on 2016/6/22 0022.
 */
angular.module('smart_home.myroutes',[])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
        // setup an abstract state for the tabs directive

            //智能家居默认起始页
            .state('Home',{
                url:'/Home',
                templateUrl:'templates/Home.html',
                //controller:'HomeeCtrl'
            })
            //安防管理
            .state('SecurityManage',{
                url:'/SecurityManage',
                cache: false,
                templateUrl:'templates/SecurityManage/SecurityManage.html',
                controller:'SecurityManageCtrl'
            })

            //楼宇管理
            .state('BuildingManage',{
                url:'/BuildingManage',
                templateUrl:'templates/BuildingManage/BuildingManage.html',
                //controller:'HomeeCtrl'
            })

            //类型管理
            .state('TypeManage',{
                url:'/TypeManage',
                templateUrl:'templates/TypeManage/TypeManage.html',
                //controller:'HomeeCtrl'
            })

            //灯光
            .state('Light',{
                url:'/Light',
                templateUrl:'templates/TypeManage/Light.html',
                //controller:'HomeeCtrl'
            })

            //客厅--灯带
            .state('LRoom_light',{
                url:'/LRoom_light',
                templateUrl:'templates/TypeManage/LRoom_light.html',
                //controller:'HomeeCtrl'
            })

            //餐厅--双向调光
            .state('DRoom_light',{
                url:'/DRoom_light',
                templateUrl:'templates/TypeManage/DRoom_light.html',
                controller:'DRoomlightCtr'
            })

            //客厅-调光顶灯
            .state('LRoom_color',{
                url:'/LRoom_color',
                templateUrl:'templates/TypeManage/LRoom_color.html',
                controller:'LRoomColorCtr'
            })

            //插座
            .state('Socket',{
                url:'/Socket',
                templateUrl:'templates/TypeManage/Socket.html',
                //controller:'HomeeCtrl'
            })

            //主卧--排气扇
            .state('MRoom',{
                url:'/MRoom',
                templateUrl:'templates/TypeManage/MRoom.html',
                controller:'MRoomCtrl'
            })

            //窗帘
            .state('Curtain',{
                url:'/Curtain',
                cache: false,
                templateUrl:'templates/TypeManage/Curtain.html',
                controller:'CurtainCtr'
            })

            //主卧--打开窗帘
            .state('MR_Curtain',{
                url:'/MR_Curtain',
                templateUrl:'templates/TypeManage/MR_Curtain.html',
                controller:'MR_CurtainCtr'
            })

            //餐厅--单向内置电机
            .state('DR_Curtain',{
                url:'/DR_Curtain',
                templateUrl:'templates/TypeManage/DR_Curtain.html',
                controller:'diningRoomCurtainCtr'
            })

            //办公区--单向内置电机
            .state('WR_Curtain',{
                url:'/WR_Curtain',
                templateUrl:'templates/TypeManage/WR_Curtain.html',
                controller:'WR_CurtainCtr'
            })

            //洗衣间--窗帘
            .state('CR_Curtain',{
                url:'/CR_Curtain',
                templateUrl:'templates/TypeManage/CR_Curtain.html',
                controller:'CR_CurtainCtr'
            })

            //电器
            .state('Electric',{
                url:'/Electric',
                cache: false,
                templateUrl:'templates/TypeManage/Electric.html',
                controller:'ElectricCtr'
            })

            //办公区--电视机
            .state('W_TV',{
                url:'/W_TV',
                templateUrl:'templates/TypeManage/W_TV.html',
                //controller:'HomeeCtrl'
            })

            //客厅--电视机
            .state('LR_TV',{
                url:'/LR_TV',
                templateUrl:'templates/TypeManage/LR_TV.html',
                //controller:'HomeeCtrl'
            })

            //组合命令
            .state('Group_cmd',{
                url:'/Group_cmd',
                templateUrl:'templates/TypeManage/Group_cmd.html',
                //controller:'HomeeCtrl'
            })

            //客厅--空调
            .state('LR_Air',{
                url:'/LR_Air',
                templateUrl:'templates/TypeManage/LR_Air.html',
                //controller:'HomeeCtrl'
            })

            //主卧--空调
            .state('MR_Air',{
                url:'/MR_Air',
                templateUrl:'templates/TypeManage/MR_Air.html',
                controller:'MR_AirCtr'
            })

            // 客厅--DVD
            .state('LR_DVD',{
                url:'/LR_DVD',
                templateUrl:'templates/TypeManage/LR_DVD.html',
                //controller:'HomeeCtrl'
            })

            // 主卧--DVD
            .state('MR_DVD',{
                url:'/MR_DVD',
                templateUrl:'templates/TypeManage/MR_DVD.html',
                //controller:'HomeeCtrl'
            })

            // 客厅--净水器
            .state('LR_Water',{
                url:'/LR_Water',
                templateUrl:'templates/TypeManage/LR_Water.html',
                //controller:'HomeeCtrl'
            })

            // 监控
            .state('Monitor',{
                url:'/Monitor',
                templateUrl:'templates/TypeManage/Monitor.html',
                //controller:'HomeeCtrl'
            })

            // 传感器
            .state('Sensor',{
                url:'/Sensor',
                templateUrl:'templates/TypeManage/Sensor.html',
                //controller:'HomeeCtrl'
            })
            // 安防
            .state('Security',{
                url:'/Security',
                templateUrl:'templates/TypeManage/Security.html',
                //controller:'HomeeCtrl'
            })

            // 音乐
            .state('Music',{
                url:'/Music',
                templateUrl:'templates/TypeManage/Music.html',
                //controller:'HomeeCtrl'
            })

            // 阳台--音乐
            .state('Balcony_Music',{
                url:'/Balcony_Music',
                templateUrl:'templates/TypeManage/Balcony_Music.html',
                //controller:'HomeeCtrl'
            })

            // 其他
            .state('Other',{
                url:'/Other',
                templateUrl:'templates/TypeManage/Other.html',
                //controller:'HomeeCtrl'
            })

            // 设置
            .state('Setting',{
                url:'/Setting',
                templateUrl:'templates/SettingManage/Setting.html',
                controller:'SettingCtrl'
            })

            // 主机参数
            .state('Host',{
                url:'/Host',
                templateUrl:'templates/SettingManage/Host.html',
                //controller:'HomeeCtrl'
            })

            // 服务器地址
            .state('ServiceAddress',{
                url:'/ServiceAddress',
                templateUrl:'templates/SettingManage/ServiceAddress.html',
                //controller:'HomeeCtrl'
            })

            // 关于我们
            .state('AboutUs',{
                url:'/AboutUs',
                templateUrl:'templates/SettingManage/AboutUs.html',
                //controller:'HomeeCtrl'
            })

            // 推送设置
            .state('Push',{
                url:'/Push',
                templateUrl:'templates/SettingManage/Push.html',
                //controller:'HomeeCtrl'
            })

            // 手势管理
            .state('GesturePSW',{
                url:'/GesturePSW',
                templateUrl:'templates/SettingManage/GesturePSW.html',
                //controller:'HomeeCtrl'
            })
        $urlRouterProvider.otherwise('/Home');
    })