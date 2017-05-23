app.controller('lbPriceCtrl', [
  '$scope',
  'dataService',
  'commonModel',
  function ($scope, dataService, commonModel) {
    var vm = $scope;
    vm.ln_data = {
      'category_first': [],
      'category_second': {},
      'standard': {},
      'price_readly': {},
      'price': {}
    };
    vm.getOrderAtCategory = function () {
      var promise = commonModel.orderAtCategory();
      promise.then(function (value) {
        dataInits();
      });
    };
    if (dataService.lbData == undefined) {
      vm.getOrderAtCategory();
    } else {
      dataInits();
    }
    vm.category_first = [];
    vm.category_second = {};
    vm.standard = [];
    vm.price = [];
    var fault_type = {
        0: '\u7ef4\u4fee',
        1: '\u5b89\u88c5',
        2: '\u7ef4\u62a4'
      };
    // 处理数据 用于页面显示
    function dataInits() {
      vm.ln_data.category_first = dataService.lbData.category_first;
      vm.category_first = dataService.lbData.category_first;
      angular.forEach(dataService.lbData.category_second, function (v, k) {
        if (!vm.ln_data.category_second[v.item_parent]) {
          vm.ln_data.category_second[v.item_parent] = [];
        }
        vm.ln_data.category_second[v.item_parent].push(v);
      });
      angular.forEach(dataService.lbData.price, function (v, k) {
        var key = v.product_category + '_' + v.standard_id;
        if (!vm.ln_data.price_readly[key]) {
          vm.ln_data.price_readly[key] = {};
        }
        if (!vm.ln_data.price_readly[key][v.fault_type]) {
          vm.ln_data.price_readly[key][v.fault_type] = [];
        }
        vm.ln_data.price_readly[key][v.fault_type].push(v);
      });
      angular.forEach(vm.ln_data.price_readly, function (v, k) {
        if (!vm.ln_data.price[k] || vm.ln_data.price[k] == undefined) {
          vm.ln_data.price[k] = [];
        }
        angular.forEach(v, function (vk, type_id) {
          var type_name = fault_type[type_id];
          if (type_name) {
            var vk_length = 0;
            angular.forEach(vk, function (item, item_k) {
              var strings = '';
              var check_ids = dataService.lbData.category_second_fault ? dataService.lbData.category_second_fault[item.product_category] : false;
              check_ids && (strings = ',' + check_ids + ',');
              if (strings && strings.indexOf(',' + item.id + ',') != -1) {
                var length = vm.ln_data.price[k].length;
                if (length == 0 || vm.ln_data.price[k][length - 1]['category'] != type_name) {
                  vk_length = length;
                  item.num = 1;
                } else {
                  item.num = 0;
                  vm.ln_data.price[k][vk_length]['num'] += 1;
                }
                item.category = type_name;
                vm.ln_data.price[k].push(item);
              }
            });
          }
        });
      });
      angular.forEach(dataService.lbData.standard, function (v, k) {
        var key = v.product_category;
        if (!vm.ln_data.standard[key]) {
          vm.ln_data.standard[key] = [];
        }
        vm.ln_data.standard[key].push(v);
      });
    }
    vm.ngShowFault = function (fault_id) {
      var strings = '';
      var check_ids = dataService.lbData.category_second_fault ? dataService.lbData.category_second_fault[item.product_category] : false;
      check_ids && (strings = ',' + check_ids + ',');
      if (strings && strings.indexOf(',' + fault_id + ',') >= 0) {
        return true;
      }
      return false;
    };
    // 弹出框
    vm.dialog = false;
    // 选择的类型名
    vm.fChoose = '';
    vm.fChooseId = '';
    vm.sChoose = '';
    vm.sChooseId = '';
    vm.tChoose = '';
    vm.tChooseId = '';
    vm.firIsChoose = 'fir-is-choose';
    vm.secIsChoose = 'sec-is-choose';
    vm.thiIsChoose = 'th-is-choose';
    vm.thiShow = false;
    // 第一次选泽打开判断
    vm.productFirOpen = function () {
      vm.fChoose = '';
      vm.sChoose = '';
      vm.tChoose = '';
      vm.tChooseId = '';
      vm.thiShow = false;
    };
    // 第一次选择关闭判断
    vm.productFirClose = function (select_1) {
      vm.fChoose = limitWord(select_1.item_desc);
      vm.fChooseId = select_1.list_item_id;
      vm.category_second = vm.ln_data.category_second[select_1.list_item_id] ? vm.ln_data.category_second[select_1.list_item_id] : [];
    };
    // 第二次选择打开判断
    vm.productSecOpen = function () {
      if (vm.fChoose) {
        vm.sChoose = '';
        vm.tChoose = '';
        vm.tChooseId = '';
        vm.thiShow = false;
      } else {
        vm.dialogShow();
      }
    };
    // 第二次选择关闭判断
    vm.productSecClose = function (select_2) {
      vm.sChoose = limitWord(select_2.item_desc);
      vm.sChooseId = select_2.list_item_id;
      vm.standard = vm.ln_data.standard[select_2.list_item_id] ? vm.ln_data.standard[select_2.list_item_id] : [];
      vm.thiShow = true;
    };
    // 第三次选择打开判断
    vm.productStandardOpen = function () {
      if (this.sChoose) {
        vm.tChoose = '';
        vm.thiShow = true;
      } else {
        vm.dialogShow();
      }
      vm.tChooseId = '';
    };
    // 第三次选择关闭判断
    vm.productStandardClose = function (standard, ele) {
      if (vm.tChooseId == standard.standard_id) {
        vm.tChoose = limitWord(standard.standard_name);
        vm.tChooseId = '';
        document.body.scrollTop = 0;
      } else {
        document.body.scrollTop = ele.target.offsetTop;
        setTimeout(function () {
          document.body.scrollTop = ele.target.offsetTop;
        }, 10);
        vm.tChooseId = standard.standard_id;
      }  // =======
         //     vm.productStandardClose = function (standard) {
         //         if (vm.tChooseId == standard.standard_id) {
         //             vm.tChoose = '';
         //             vm.tChooseId = false;
         //         } else {
         //             vm.tChoose = limitWord(standard.standard_name);
         //             vm.tChooseId = standard.standard_id;
         //         }
         //
         // >>>>>>>
    };
    // 选择上一级弹出框
    vm.dialogShow = function () {
      vm.dialog = true;
    };
    vm.dialogHide = function () {
      vm.dialog = false;
    };
    // 字数限制
    function limitWord(text) {
      if (text.length > 5) {
        return text.substring(0, 5) + '...';
      } else {
        return text;
      }
    }
  }
]);