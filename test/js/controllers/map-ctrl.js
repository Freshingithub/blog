app.controller('mapCtrl', [
  '$scope',
  '$stateParams',
  function ($scope, $stateParams) {
    var vm = $scope;
    vm.showView = true;
    // 百度地图API功能
    var map = new BMap.Map('allmap');
    var point = new BMap.Point($stateParams.lng, $stateParams.lat);
    map.centerAndZoom(point, 15);
    // 编写自定义函数,创建标注
    function addMarker(point) {
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }
    // 用户坐标
    var point = new BMap.Point($stateParams.lng, $stateParams.lat);
    addMarker(point);
    // 定义自定义覆盖物的构造函数
    function SquareOverlay(center, length, color) {
      this._center = center;
      this._length = length;
      this._color = color;
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      var div = document.createElement('div');
      div.style.position = 'absolute';
      // 可以根据参数设置元素外观
      //  div.style.background = this._color;
      div.className = 'mapFlag';
      div.innerHTML = '\u5730\u5740\uff1a' + $stateParams.content;
      // 将div添加到覆盖物容器中
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
      // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
      return div;
    };
    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
      // 根据地理坐标转换为像素坐标，并设置给容器
      var position = this._map.pointToOverlayPixel(this._center);
      this._div.style.left = position.x - this._length / 2 + 'px';
      this._div.style.top = position.y - 80 + 'px';
    };
    // 添加自定义覆盖物
    var mySquare = new SquareOverlay(map.getCenter(), 220, 'red');
    map.addOverlay(mySquare);
    // 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        enableGeolocation: true
      });
    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener('locationSuccess', function (e) {
      // 定位成功事件
      var address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
    });
    geolocationControl.addEventListener('locationError', function (e) {
      // 定位失败事件
      alert(e.message);
    });
    map.addControl(geolocationControl);
  }
]);