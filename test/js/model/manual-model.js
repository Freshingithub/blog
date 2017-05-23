app.service('manualModel', [
  'baseModel',
  'apiConfig',
  '$q',
  'dataService',
  function (baseModel, apiConfig, $q, dataService) {
    //获取操作指南列表
    this.getManualList = function (params) {
      var defer = $q.defer();
      var url = '';
      url = baseModel.structureApiUrl(apiConfig.manual.list);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //获取操作指南内容
    this.getManualContent = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.manual.content).replace(':id', params.content_id);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);