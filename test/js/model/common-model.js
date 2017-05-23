app.service('commonModel', [
  'baseModel',
  'apiConfig',
  '$q',
  '$http',
  'dataService',
  function (baseModel, apiConfig, $q, $http, dataService) {
    //获取区域
    this.ckeckPhoneCode = function (code, phone, type) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.common.ckeck_phone_code);
      var params = {
          code: code ? code : '',
          phone: phone ? phone : '',
          type: type ? type : 0
        };
      if (!params.code) {
        weui.alert('\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a');
      } else if (!params.phone) {
        weui.alert('\u624b\u673a\u53f7\u7801\u4e0d\u80fd\u4e3a\u7a7a');
      } else {
        baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
          if (errorCode == apiConfig.errorCode.success) {
            defer.resolve(data);
          }
        });
      }
      return defer.promise;
    };
    //检查银行卡号
    this.checkCreditCard = function (number) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.common.check_creditcard);
      var params = { number: number };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.orderAtCategory = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.common.order_at_category);
      baseModel.request(url, 'GET', {}, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          dataService.lbData = data;
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);