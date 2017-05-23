app.service('jssdkModel', [
  'baseModel',
  'apiConfig',
  '$q',
  function (baseModel, apiConfig, $q) {
    //获取配置
    this.getConfig = function () {
      var params = { url: encodeURIComponent(location.href.split('#')[0]) };
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.jssdk.option);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 通过临时素材文件id获取文件并保存至服务器并返回在服务器里的url
    this.mediaidsUrl = function (media_ids) {
      if (media_ids.length) {
        var params = { ids: media_ids.join(',') };
        var defer = $q.defer();
        var url = baseModel.structureApiUrl(apiConfig.jssdk.mediaids_url);
        baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
          if (errorCode == apiConfig.errorCode.success) {
            defer.resolve(data);
          }
        });
        return defer.promise;
      } else {
        return [];
      }
    };
  }
]);