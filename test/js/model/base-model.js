app.service('baseModel', [
  '$http',
  'apiConfig',
  '$log',
  function ($http, apiConfig, $log) {
    /**
     * 构建接口请求url
     * @param  {string} path 接口地址
     * @return {string}      构建后的完整接口url
     */
    this.structureApiUrl = function (path) {
      var url = apiConfig.protocol + '://' + apiConfig.host + path;
      return url;
    };
    /**
     * 通用调用接口方法
     * @param  {string} url             	接口url
     * @param  {string} method          	请求方法
     * @param  {object} params            	请求参数JS对象
     * @param  {function} successCallback 	请求成功回调
     * @return {void}
     */
    this.request = function (url, method, params, successCallback) {
      $log.debug('[api]request url: ' + url);
      $log.debug('[api]params: ');
      $log.debug(params);
      if (method == 'GET') {
        $http.get(url, { params: params }).then(function (res) {
          handleResponse(res, function (data, errorCode, errorMsg) {
            successCallback(data, errorCode, errorMsg);
          });
        });
      } else if (method == 'POST') {
        $http.post(url, params).then(function (res) {
          handleResponse(res, function (data, errorCode, errorMsg) {
            successCallback(data, errorCode, errorMsg);
          });
        });
      } else if (method == 'PUT') {
        $http.put(url, $.param(params)).then(function (res) {
          handleResponse(res, function (data, errorCode, errorMsg) {
            successCallback(data, errorCode, errorMsg);
          });
        });
      } else if (method == 'DELETE') {
        $http.delete(url, { data: params }).then(function (res) {
          handleResponse(res, function (data, errorCode, errorMsg) {
            successCallback(data, errorCode, errorMsg);
          });
        });
      }
    };
    /**
     * 接口请求返回处理
     * @param  {object} res            接口请求返回对象
     * @param  {function} handleCallback 处理回调
     * @return {void}
     */
    var handleResponse = function (res, handleCallback) {
      var errorCode = res.data.error_code;
      var errorMsg = res.data.error_msg;
      var data = res.data.data;
      $log.debug('[api]errorCode: ' + errorCode + '\n[api]errorMsg: ' + errorMsg);
      $log.debug('[api]data: ');
      $log.debug(data);
      handleCallback(data, errorCode, errorMsg);
    };
  }
]);