app.service('orderModel', [
  'baseModel',
  'apiConfig',
  '$q',
  'dataService',
  function (baseModel, apiConfig, $q, dataService) {
    //获取订单列表
    this.getOrderList = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.order.list);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //订单费用明细
    this.getOrderCostes = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.order.costes).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //工单预约上门
    this.uploadAppointment = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.appoints).replace(':id', orderId);
      console.log(url);
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //工单预约记录
    this.getAppointments = function (orderId, params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.appoints).replace(':id', orderId);
      console.log(url);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //延长预约时间
    this.delayAppointmentTime = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.extend).replace(':id', orderId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //关闭工单
    this.closeOrder = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.order.return).replace(':id', orderId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        } else {
          weui.alert(errorMsg);
        }
      });
      return defer.promise;
    };
    //工单某详情信息
    this.ordersDetails = function (orderDetailId) {
      var params = {};
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.service.order_deail).replace(':id', orderDetailId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //设置选择服务项目
    this.selectServiceProject = function (params, orderDetailId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.service.setserver).replace(':id', orderDetailId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //提交服务报告
    this.submitServiceReport = function (params, orderDetailId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.service.upload).replace(':id', orderDetailId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //订单配件收货人地址
    this.orderPartAddress = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.parts.address).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //提交配件申请
    this.submitPartEntry = function (params, orderDetailId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.parts.accessories).replace(':id', orderDetailId);
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //申请费用
    this.submitApplyCosts = function (params, orderDetailId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.costs.accecost).replace(':id', orderDetailId);
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //获取某订单费用单列表
    this.getCostsList = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.costs.list).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //费用单详情
    this.getCostsDetails = function (params, costsId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.costs.details).replace(':id', costsId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //获取工单详情
    this.getOrderDeatail = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.order.detail).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //某订单配件单列表
    this.getPartList = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.parts.list).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //某订单配件单详情
    this.getPartDetails = function (params, partId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.parts.details).replace(':id', partId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //订单操作记录
    this.getOrderLogs = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.order.logs).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 物流记录查询
    this.getExpressTracking = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.express.index);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 物流记录查询
    this.getOrderExpressTracking = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.express.order_index);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 回寄配件单列表
    this.getReturnPartList = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.returnPart.list).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 厂家收件地址
    this.getFactoryAddress = function (params, id, type) {
      var defer = $q.defer();
      if (type === 1) {
        var url = baseModel.structureApiUrl(apiConfig.factory.address_for_accessories).replace(':id', id);
      } else {
        var url = baseModel.structureApiUrl(apiConfig.factory.address).replace(':id', id);
      }
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 回寄配件单
    this.submitPart = function (params, partId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.returnPart.submit).replace(':id', partId);
      params.token = dataService.userData.token;
      if (params.worker_sb_paytype == 2) {
        params.worker_sb_cost = 0;
      }
      baseModel.request(url, 'POST', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        } else {
          weui.alert(errorMsg);
        }
      });
      return defer.promise;
    };
    // 快递公司列表
    this.getExpressComList = function (params) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.express.com_list);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 技工预约签到
    this.checkIn = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.signin).replace(':id', orderId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    this.updateOrder = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.update_appoints).replace(':id', orderId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    // 预约记录
    this.appointsHistory = function (params, orderId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.appoints.appoints).replace(':id', orderId);
      baseModel.request(url, 'GET', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
    //配件单签收
    this.partSign = function (params, partId) {
      var defer = $q.defer();
      var url = baseModel.structureApiUrl(apiConfig.parts.sign).replace(':id', partId);
      baseModel.request(url, 'PUT', params, function (data, errorCode, errorMsg) {
        if (errorCode == apiConfig.errorCode.success) {
          defer.resolve(data);
        }
      });
      return defer.promise;
    };
  }
]);