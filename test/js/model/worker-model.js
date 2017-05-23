app.service('workerModel', [
  'baseModel',
  'apiConfig',
  '$q',
  'dataService',
  function (baseModel, apiConfig, $q, dataService) {
    this.updateWorkerInfo = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.update);
      params.token = dataService.userData.token;
      params.worker_area_ids = params.worker_area_arr.join(',');
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.fillWorkerInfo = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.fill);
      params.hash = dataService.userData.hash;
      params.worker_area_ids = params.worker_area_arr.join(',');
      params.name = params.nickname;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getInfo = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.myinfo);
      var params = { token: dataService.userData.token };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          data.worker_area_arr = data.worker_area_ids ? data.worker_area_ids.split(',') : [];
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getWorkerAcceAddress = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.worker_acce_address);
      var params = { token: dataService.userData.token };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          // data.worker_area_arr = data.worker_area_ids.split(',');
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.editWorkerAcceAddress = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.worker_acce_address);
      params.token = dataService.userData.token;
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.addWorkerFeedbacks = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.add_feedbacks);
      params.token = dataService.userData.token;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getWorkerFeedbacks = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.get_feedbacks);
      params.worker_id = dataService.userData.id;
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getWorkerFeedbacksDetail = function (params, id) {
      id = id ? id : 0;
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.get_feedbacks_detail).replace(':id', id);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getWorkerCardDetail = function () {
      var params = { token: dataService.userData.token };
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.get_bankcard);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          dataService.bankCardInfo = data;
          if (data.credit_card != '' && data.credit_card) {
            dataService.bankCardInfo = data;
            dataService.bankCardInfo.had_card = true;
          } else {
            dataService.bankCardInfo.had_card = false;
          }
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.setPayPassword = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.set_pay_password);
      params.token = dataService.userData.token;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.chackPayPassword = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.check_pay_password);
      params.token = dataService.userData.token;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getBanks = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.bank_card.get_banks);
      var params = { token: dataService.userData.token };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.workerAddBanks = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.bank_card.add_banks);
      params.token = dataService.userData.token;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.workerDeleteBanks = function (password) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.bank_card.delete_banks) + '?token=' + dataService.userData.token;
      url += '&pay_password=' + password;
      baseModel.request(url, 'DELETE', {}, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          dataService.verify_pre_url == 'deleteWorkerCardInfo' && (dataService.verify_pre_url = '');
          dataService.bankCardInfo = undefined;
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getPayPasswordCode = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.get_pay_password_code);
      params.type = 11;
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.getSatisFiesnum = function () {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.worker.get_satis_fiesnum);
      var params = { token: dataService.userData.token };
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);