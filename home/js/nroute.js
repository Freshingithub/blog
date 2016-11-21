angular.module('smart_home.nroute', [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider

		//场景管理
		.state('scenemanage', {
			url: '/scenemanage',
			templateUrl: 'templates/SceneManage/scene-manage.html',
		})

		//任务管理
		.state('taskmanage', {
			url: '/taskmanage',
			templateUrl: 'templates/TaskManage/task-manage.html',
		})

		//区域管理首页
		.state('areaindex', {
			url: '/areaindex',
			templateUrl: 'templates/AreaManage/area-manage-index.html',
			controller: 'areaIndexCtr'
		})

		//1楼客厅
		.state('arealiving', {
			url: '/arealiving',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-livingroom.html',
			// controller: 'areaIndexCtr'
		})

		//1楼餐厅
		.state('areadining', {
			url: '/areadining',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-diningroom.html',
			controller: 'areadiningCtr'
		})

		//1楼阳台
		.state('areabalcony', {
			url: '/areabalcony',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-balcony.html',
			controller: 'areabalconyCtr'
		})

		//1楼健身房
		.state('areagym', {
			url: '/areagym',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-gym.html',
		})

		//1楼客卧
		.state('areabedsit', {
			url: '/areabedsit',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-bedsit.html',
		})

		//2楼主卧
		.state('areabedroom', {
			url: '/areabedroom',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-bedroom.html',
			controller: 'areabedroomCtr'
		})

		//2楼洗手间
		.state('areawashingroom', {
			url: '/areawashingroom',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-washingroom.html',
		})

		//3楼书房
		.state('areastudy', {
			url: '/areastudy',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-study.html',
			// controller: 'areaIndexCtr'
		})

		//3楼办公区
		.state('areaoffice', {
			url: '/areaoffice',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-office.html',
			controller: 'areaofficeCtr'
		})

		//洗衣间
		.state('arealaundry', {
			url: '/arealaundry',
			cache: false,
			templateUrl: 'templates/AreaManage/area-manage-laundry.html',
			controller: 'arealaundryCtr'
		})

		//阳台-空调
		.state('BAL_Air', {
			url: '/BAL_Air',
			templateUrl: 'templates/AreaManage/area-manage-bal-air.html',
			controller: 'balconyAirCtr'
		})
	})