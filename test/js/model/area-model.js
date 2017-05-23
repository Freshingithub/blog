app.service('areaModel', [
  'baseModel',
  'apiConfig',
  '$q',
  '$http',
  function (baseModel, apiConfig, $q, $http) {
    //获取区域
    this.getAreas = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.area.data);
      var params = { page_size: 0 };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);