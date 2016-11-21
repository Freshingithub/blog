angular.module('smart_home.ncontroller', [])
	.directive('areaManage', [function() {
		function link(scope, element, attrs) {

		}
	}])

.service('areaLivingColorChange', function() {
	var color, percent, dc_value, airc_value, bc_value, bac_value, lc_value, oc_value;

	return {
		getColor: function() {
			return color;
		},
		setColor: function(value) {
			color = value;
		},
		getLightPercent: function() {
			return percent;
		},
		setLightPercent: function(value) {
			percent = value;
		},
		getDinCurtainVal: function() {
			return dc_value;
		},
		setDinCurtainVal: function(value) {
			dc_value = value;
		},
		getBalAirVal: function() {
			return airc_value;
		},
		setBalAirVal: function(value) {
			airc_value = value;
		},
		getBedroomCurVal: function() {
			return bc_value;
		},
		setBedroomCurVal: function(value) {
			bc_value = value;
		},
		getBedroomAircVal: function() {
			return bac_value;
		},
		setBedroomAircVal: function(value) {
			bac_value = value;
		},
		getLaundryCurVal: function() {
			return lc_value;
		},
		setLaundryCurVal: function(value) {
			lc_value = value;
		},
		getOfficeCurVal: function() {
			return oc_value;
		},
		setOfficeCurVal: function(value) {
			oc_value = value;
		}
	};
})



//区域管理首页控制器
.controller('areaIndexCtr', ['$scope', function($scope) {

	var index = {
		'f1': 'ion-arrow-down-b area-m-index-icon',
		'flag1': 'true',
		'tap1': function() {
			if (index.flag1 == false) {
				index.flag1 = true;
				index.f1 = "ion-arrow-down-b area-m-index-icon";
			} else {
				index.flag1 = false;
				index.f1 = "ion-arrow-right-b area-m-index-icon";
			}
		},
		'f2': 'ion-arrow-down-b area-m-index-icon',
		'flag2': 'true',
		'tap2': function() {
			if (index.flag2 == false) {
				index.flag2 = true;
				index.f2 = "ion-arrow-down-b area-m-index-icon";
			} else {
				index.flag2 = false;
				index.f2 = "ion-arrow-right-b area-m-index-icon";
			}
		},
		'f3': 'ion-arrow-down-b area-m-index-icon',
		'flag3': 'true',
		'tap3': function() {
			if (index.flag3 == false) {
				index.flag3 = true;
				index.f3 = "ion-arrow-down-b area-m-index-icon";
			} else {
				index.flag3 = false;
				index.f3 = "ion-arrow-right-b area-m-index-icon";
			}
		}
	};

	$scope.index = index;

	$scope.firstFloors = [{
		'link': 'arealiving',
		'bg': 'scene-m-cafe',
		'room': '客厅'
	}, {
		'link': 'areadining',
		'bg': 'scene-m-eat',
		'room': '餐厅'
	}, {
		'link': 'areabalcony',
		'bg': 'scene-m-study',
		'room': '阳台'
	}, {
		'link': 'areagym',
		'bg': 'scene-m-run',
		'room': '健身房'
	}, {
		'link': 'areabedsit',
		'bg': 'scene-m-meeting',
		'room': '客卧'
	}];

	// $scope.areaTap1 = function() {
	// 	if ($scope.index.1flag == true) {
	// 		$scope.index.1flag = false;
	// 		$scope.index.1stf = "ion-arrow-right-b area-m-index-icon";
	// 	} else {
	// 		$scope.index.1flag = true;
	// 		$scope.index.1stf = "ion-arrow-down-b area-m-index-icon";
	// 	}
	// 	doTap1();
	// 	var fir_floor = document.querySelector("#first_floor");
	// 	var fir_floor_icon = document.querySelector("#first_floor_icon");
	// 	var status = fir_floor.style.display;
	// 	if (status == "none") {
	// 		fir_floor.style.display = "block";
	// 		fir_floor_icon.className = "ion-arrow-down-b area-m-index-icon"
	// 	} else {
	// 		fir_floor.style.display = "none";
	// 		fir_floor_icon.className = "ion-arrow-right-b area-m-index-icon"
	// 	}
	// };
	// $scope.areaTap2 = function() {
	// 	// doTap2();
	// 	var sec_floor = document.querySelector("#second_floor");
	// 	var sec_floor_icon = document.querySelector("#second_floor_icon");
	// 	var status = sec_floor.style.display;
	// 	if (status == "none") {
	// 		sec_floor.style.display = "block";
	// 		sec_floor_icon.className = "ion-arrow-down-b area-m-index-icon"
	// 	} else {
	// 		sec_floor.style.display = "none";
	// 		sec_floor_icon.className = "ion-arrow-right-b area-m-index-icon"
	// 	}
	// };
	// $scope.areaTap3 = function() {
	// 	// doTap3();
	// 	var thi_floor = document.querySelector("#third_floor");
	// 	var thi_floor_icon = document.querySelector("#third_floor_icon");
	// 	var status = thi_floor.style.display;
	// 	if (status == "none") {
	// 		thi_floor.style.display = "block";
	// 		thi_floor_icon.className = "ion-arrow-down-b area-m-index-icon"
	// 	} else {
	// 		thi_floor.style.display = "none";
	// 		thi_floor_icon.className = "ion-arrow-right-b area-m-index-icon"
	// 	}
	// };
}])



//餐厅调色灯页面控制器
.controller('LRoomColorCtr', ['$scope', '$rootScope', 'areaLivingColorChange', function($scope, $rootScope, areaLivingColorChange) {

	$scope.color_show = "#fff";

	var lcd = document.querySelector(".lroom-color-displaycolor");

	var setColor = function(x) {
		areaLivingColorChange.setColor(x);
	};
	var color = {
		'bg': '#fff',
		'value': '#000',
		'rangevalue': 0,
		'colorChange': function(value) {
			// alert(typeof value);
			// alert(value);
			color.bg = value;
			setColor(color.value);
		},
		'valueChange': function(value) {
			value = parseInt(value);
			lcd.style.opacity = (100 - value) / 100;
		},
		'red': function() {
			color.bg = "#ef473a"
			setColor(color.bg);
		},
		'yellow': function() {
			color.bg = "#ff0"
			setColor(color.bg);
		},
		'balanced': function() {
			color.bg = "#33cd5f"
			setColor(color.bg);
		},
		'lightblue': function() {
			color.bg = "#add8e6"
			setColor(color.bg);
		},
		'positive': function() {
			color.bg = "#387ef5"
			setColor(color.bg);
		},
		'pink': function() {
			color.bg = "#ffc0cb"
			setColor(color.bg);
		},

	};

	$scope.color = color;
}])



//区域管理-餐厅控制器
.controller('areadiningCtr', ['$scope', '$rootScope', 'areaLivingColorChange', function($scope, $rootScope, areaLivingColorChange) {

	$scope.color_show = areaLivingColorChange.getColor();
	$scope.diningroom_light_percent = areaLivingColorChange.getLightPercent();
	$scope.diningroom_curtain_value = areaLivingColorChange.getDinCurtainVal();
}])



//区域管理-阳台控制器
.controller('areabalconyCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.airc_value = areaLivingColorChange.getBalAirVal();
}])



//区域管理-主卧控制器
.controller('areabedroomCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.bedroom_curtain_value = areaLivingColorChange.getBedroomCurVal();
	$scope.bedroom_airc_value = areaLivingColorChange.getBedroomAircVal();
}])



//区域管理-洗衣间控制器
.controller('arealaundryCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.laundry_cur_value = areaLivingColorChange.getLaundryCurVal();
}])



//区域管理-办公区控制器
.controller('areaofficeCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.curtain_value = areaLivingColorChange.getOfficeCurVal();
}])



//餐厅双向调光页面控制器
.controller('DRoomlightCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setLightPercent(x);
	}

	var light = {
		'value': 0,
		'valueChange': function(value) {
			value = parseInt(value);
			setValue(value);
		},
		'button1': function() {
			light.value = 0;
			setValue(light.value);
		},
		'button2': function() {
			light.value = 50;
			setValue(light.value);
		},
		'button3': function() {
			light.value = 100;
			setValue(light.value);
		},
		'minus': function() {
			light.value = parseInt(light.value);
			if (light.value > 0) {
				light.value -= 1;
				setValue(light.value);
			} else {
				return;
			}
		},
		'plus': function() {
			light.value = parseInt(light.value);
			if (light.value < 100) {
				light.value += 1;
				setValue(light.value);
			}
		}
	};

	$scope.light = light;
}])



//餐厅窗帘页面控制器
.controller('diningRoomCurtainCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setDinCurtainVal(x);
	};

	var curtain = {
		'value': 0,
		'valueChanged': function(x) {
			setValue(x);
		}
	};

	$scope.curtain = curtain;
}])



//阳台-空调控制器
.controller('balconyAirCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setBalAirVal(x);
	};

	var airc = {
		'value': 18,
		'plus': function() {
			if (this.value < 26) {
				this.value += 1;
				setValue(this.value);
			}
		},
		'minus': function() {
			if (this.value > 16) {
				this.value -= 1;
				setValue(this.value);
			}
		}
	};

	$scope.airc = airc;
}])



//主卧-对开窗帘控制器
.controller('MR_CurtainCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setBedroomCurVal(x);
	}

	var curtain = {
		'value': 0,
		'valueChanged': function(x) {
			setValue(x);
		}
	};

	$scope.curtain = curtain;
}])



//主卧-空调控制器
.controller('MR_AirCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setBedroomAircVal(x);
	};

	var airc = {
		'value': 18,
		'plus': function() {
			if (this.value < 26) {
				this.value += 1;
				setValue(this.value);
			}
		},
		'minus': function() {
			if (this.value > 16) {
				this.value -= 1;
				setValue(this.value);
			}
		}
	};

	$scope.airc = airc;
}])



//洗衣间-窗帘控制器
.controller('CR_CurtainCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setLaundryCurVal(x);
	};

	var cur = {
		'value': 0,
		'valueChanged': function(x) {
			setValue(x);
		}
	};

	$scope.cur = cur;
}])



//办公区-窗帘控制器
.controller('WR_CurtainCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	var setValue = function(x) {
		areaLivingColorChange.setOfficeCurVal(x);
	};

	var cur = {
		'value': 0,
		'valChanged': function(x) {
			setValue(x);
		}
	};

	$scope.cur = cur;
}])



//类型管理-窗帘控制器
.controller('CurtainCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.MR_cur_value = areaLivingColorChange.getBedroomCurVal();
	$scope.Laundry_cur_value = areaLivingColorChange.getLaundryCurVal();
	$scope.DR_cur_value = areaLivingColorChange.getDinCurtainVal();
	$scope.WR_cur_value = areaLivingColorChange.getOfficeCurVal();
}])



//类型管理-电器控制器
.controller('ElectricCtr', ['$scope', 'areaLivingColorChange', function($scope, areaLivingColorChange) {

	$scope.bedroom_airc_value = areaLivingColorChange.getBedroomAircVal();
}])