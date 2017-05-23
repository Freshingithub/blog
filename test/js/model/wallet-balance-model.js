app.service('walletBalanceModel', [
  'baseModel',
  'apiConfig',
  '$q',
  'dataService',
  function (baseModel, apiConfig, $q, dataService) {
    // 账户余额
    this.accountBalance = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.wallet.balance);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 余额变动明细
    this.balanceClear = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.wallet.balance_clear);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 余额变动详情
    this.balanceDetails = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.wallet.balance_details).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 申请提现
    this.extractCash = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.wallet.extract_cash);
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 质保金
    this.safeMoney = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.wallet.safe_money);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);