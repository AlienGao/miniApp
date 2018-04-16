'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pay = function (_wepy$page) {
  _inherits(Pay, _wepy$page);

  function Pay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pay.__proto__ || Object.getPrototypeOf(Pay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的订单'
    }, _this.data = {
      order: [],
      total: 0,
      address: null,
      coupons: 0,
      couponsId: '',
      remark: '',
      type: ''
    }, _this.methods = {
      chooseAddress: function chooseAddress() {
        wx.navigateTo({
          url: '/pages/select-address?from=pay'
        });
      },
      onConfirm: function onConfirm(res) {
        this.remark = res.datail.value;
      },
      chooseCoupons: function chooseCoupons() {
        this.total += this.coupons;
        wx.navigateTo({
          url: '/pages/my-ticket'
        });
      },
      submitOrder: function submitOrder() {
        var that = this;
        var array = [];
        that.order.forEach(function (item) {
          array.push({
            goodsId: item.goodsId,
            number: item.number
          });
        });
        var goodsJsonStr = JSON.stringify(array);
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/create',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            token: that.$parent.globalData.token,
            provinceId: that.address.provinceId,
            cityId: that.address.cityId,
            districtId: that.address.districtId,
            address: that.address.address,
            linkMan: that.address.linkMan,
            mobile: that.address.mobile,
            code: that.address.code,
            remark: that.remark,
            couponId: that.couponsId,
            expireMinutes: 30,
            goodsJsonStr: goodsJsonStr
          },
          success: function success(res) {
            if (res.data.code == 0) {
              wx.setStorage({
                key: that.type,
                data: []
              });
              wx.navigateTo({
                url: '/pages/order-list?index=0'
              });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              });
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pay, [{
    key: 'onLoad',
    value: function onLoad(e) {
      var that = this;
      if (e.from == 'shop-cart') {
        that.type = 'addGoods';
        wx.getStorage({
          key: 'addGoods',
          success: function success(res) {
            that.total = 0;
            var array = [];
            res.data.forEach(function (item) {
              if (item.isChoosed) {
                that.total += item.number > 2 ? Number((item.minPrice * item.number).toFixed(1)) : Number((item.originalPrice * item.number).toFixed(1));
                array.push(item);
              }
            });
            that.order = array;
            that.$apply();
          }
        });
      } else {
        that.type = 'buyNow';
        wx.getStorage({
          key: 'buyNow',
          success: function success(res) {
            that.order = [res.data];
            that.total = 0;
            that.total = res.data.number > 2 ? (res.data.minPrice * res.data.number).toFixed(1) : (res.data.originalPrice * res.data.number).toFixed(1);
            that.$apply();
          }
        });
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/user/shipping-address/default',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code !== 0) {
            wx.showModal({
              title: '增加地址',
              content: '系统检测暂无默认地址，是否现在添加？',
              showCancel: false,
              success: function success() {
                wx.navigateTo({
                  url: '/pages/address-add'
                });
              }
            });
          } else {
            that.address = res.data.data;
            that.$apply();
          }
        }
      });
      wx.getStorage({
        key: 'couponsId',
        success: function success(res) {
          if (res.data !== '') {
            that.couponsId = res.data;
            that.$apply();
            wx.getStorage({
              key: 'couponsMoney',
              success: function success(mon) {
                that.coupons = mon.data;
                that.total -= mon.data;
                that.$apply();
                wx.setStorage({
                  key: 'couponsId',
                  data: ''
                });
                wx.setStorage({
                  key: 'couponsMoney',
                  data: 0
                });
              }
            });
          }
        },
        fail: function fail() {
          that.couponsId = '';
          that.$apply();
        }
      });
    }
  }]);

  return Pay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pay , 'pages/pay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJQYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm9yZGVyIiwidG90YWwiLCJhZGRyZXNzIiwiY291cG9ucyIsImNvdXBvbnNJZCIsInJlbWFyayIsInR5cGUiLCJtZXRob2RzIiwiY2hvb3NlQWRkcmVzcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIm9uQ29uZmlybSIsInJlcyIsImRhdGFpbCIsInZhbHVlIiwiY2hvb3NlQ291cG9ucyIsInN1Ym1pdE9yZGVyIiwidGhhdCIsImFycmF5IiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiZ29vZHNJZCIsIm51bWJlciIsImdvb2RzSnNvblN0ciIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXF1ZXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJzdWJEb21haW4iLCJtZXRob2QiLCJoZWFkZXIiLCJ0b2tlbiIsInByb3ZpbmNlSWQiLCJjaXR5SWQiLCJkaXN0cmljdElkIiwibGlua01hbiIsIm1vYmlsZSIsImNvZGUiLCJjb3Vwb25JZCIsImV4cGlyZU1pbnV0ZXMiLCJzdWNjZXNzIiwic2V0U3RvcmFnZSIsImtleSIsInNob3dUb2FzdCIsInRpdGxlIiwibXNnIiwiaWNvbiIsImR1cmF0aW9uIiwiZSIsImZyb20iLCJnZXRTdG9yYWdlIiwiaXNDaG9vc2VkIiwiTnVtYmVyIiwibWluUHJpY2UiLCJ0b0ZpeGVkIiwib3JpZ2luYWxQcmljZSIsIiRhcHBseSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwibW9uIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsYUFBTyxDQUZGO0FBR0xDLGVBQVMsSUFISjtBQUlM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QyxVQUFILENBQWM7QUFDWkMsdUJBQUssY0FETztBQUVaOUMsd0JBQU07QUFGTSxpQkFBZDtBQUlEO0FBZFcsYUFBZDtBQWdCRDtBQUNGLFNBdkJXO0FBd0JaaUUsY0FBTSxnQkFBVztBQUNmOUMsZUFBS2QsU0FBTCxHQUFpQixFQUFqQjtBQUNBYyxlQUFLeUMsTUFBTDtBQUNEO0FBM0JXLE9BQWQ7QUE2QkQ7Ozs7RUFuRzhCLGVBQUtNLEk7O2tCQUFqQnJFLEciLCJmaWxlIjoicGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlSdcbiAgfVxuICBkYXRhID0ge1xuICAgIG9yZGVyOiBbXSxcbiAgICB0b3RhbDogMCxcbiAgICBhZGRyZXNzOiBudWxsLFxuICAgIGNvdXBvbnM6IDAsXG4gICAgY291cG9uc0lkOiAnJyxcbiAgICByZW1hcms6ICcnLFxuICAgIHR5cGU6ICcnXG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmKGUuZnJvbSA9PSAnc2hvcC1jYXJ0Jykge1xuICAgICAgdGhhdC50eXBlID0gJ2FkZEdvb2RzJ1xuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2FkZEdvb2RzJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHRoYXQudG90YWwgPSAwXG4gICAgICAgICAgbGV0IGFycmF5ID0gW11cbiAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZihpdGVtLmlzQ2hvb3NlZCkge1xuICAgICAgICAgICAgICB0aGF0LnRvdGFsICs9IGl0ZW0ubnVtYmVyID4gMiA/IE51bWJlcigoaXRlbS5taW5QcmljZSAqIGl0ZW0ubnVtYmVyKS50b0ZpeGVkKDEpKSA6IE51bWJlcigoaXRlbS5vcmlnaW5hbFByaWNlICogaXRlbS5udW1iZXIpLnRvRml4ZWQoMSkpXG4gICAgICAgICAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoYXQub3JkZXIgPSBhcnJheVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC50eXBlID0gJ2J1eU5vdydcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdidXlOb3cnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICB0aGF0Lm9yZGVyID0gW3Jlcy5kYXRhXVxuICAgICAgICAgIHRoYXQudG90YWwgPSAwXG4gICAgICAgICAgdGhhdC50b3RhbCA9IHJlcy5kYXRhLm51bWJlciA+IDIgPyAocmVzLmRhdGEubWluUHJpY2UgKiByZXMuZGF0YS5udW1iZXIpLnRvRml4ZWQoMSkgOiAocmVzLmRhdGEub3JpZ2luYWxQcmljZSAqIHJlcy5kYXRhLm51bWJlcikudG9GaXhlZCgxKVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25TaG93KCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3VzZXIvc2hpcHBpbmctYWRkcmVzcy9kZWZhdWx0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICflop7liqDlnLDlnYAnLFxuICAgICAgICAgICAgY29udGVudDogJ+ezu+e7n+ajgOa1i+aaguaXoOm7mOiupOWcsOWdgO+8jOaYr+WQpueOsOWcqOa3u+WKoO+8nycsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvYWRkcmVzcy1hZGQnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmFkZHJlc3MgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleTogJ2NvdXBvbnNJZCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYocmVzLmRhdGEgIT09ICcnKSB7XG4gICAgICAgICAgdGhhdC5jb3Vwb25zSWQgPSByZXMuZGF0YVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTogJ2NvdXBvbnNNb25leScsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihtb24pIHtcbiAgICAgICAgICAgICAgdGhhdC5jb3Vwb25zID0gbW9uLmRhdGFcbiAgICAgICAgICAgICAgdGhhdC50b3RhbCAtPSBtb24uZGF0YVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIGtleTogJ2NvdXBvbnNJZCcsXG4gICAgICAgICAgICAgICAgZGF0YTogJydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnY291cG9uc01vbmV5JyxcbiAgICAgICAgICAgICAgICBkYXRhOiAwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNvdXBvbnNJZCA9ICcnXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlQWRkcmVzcygpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvc2VsZWN0LWFkZHJlc3M/ZnJvbT1wYXknXG4gICAgICB9KVxuICAgIH0sXG4gICAgb25Db25maXJtKHJlcykge1xuICAgICAgdGhpcy5yZW1hcmsgPSByZXMuZGF0YWlsLnZhbHVlXG4gICAgfSxcbiAgICBjaG9vc2VDb3Vwb25zKCkge1xuICAgICAgdGhpcy50b3RhbCArPSB0aGlzLmNvdXBvbnNcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvbXktdGlja2V0J1xuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdE9yZGVyKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIGxldCBhcnJheSA9IFtdXG4gICAgICB0aGF0Lm9yZGVyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgYXJyYXkucHVzaCh7XG4gICAgICAgICAgZ29vZHNJZDogaXRlbS5nb29kc0lkLFxuICAgICAgICAgIG51bWJlcjogaXRlbS5udW1iZXJcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICBjb25zdCBnb29kc0pzb25TdHIgPSBKU09OLnN0cmluZ2lmeShhcnJheSlcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL29yZGVyL2NyZWF0ZScsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbixcbiAgICAgICAgICBwcm92aW5jZUlkOiB0aGF0LmFkZHJlc3MucHJvdmluY2VJZCxcbiAgICAgICAgICBjaXR5SWQ6IHRoYXQuYWRkcmVzcy5jaXR5SWQsXG4gICAgICAgICAgZGlzdHJpY3RJZDogdGhhdC5hZGRyZXNzLmRpc3RyaWN0SWQsXG4gICAgICAgICAgYWRkcmVzczogdGhhdC5hZGRyZXNzLmFkZHJlc3MsXG4gICAgICAgICAgbGlua01hbjogdGhhdC5hZGRyZXNzLmxpbmtNYW4sXG4gICAgICAgICAgbW9iaWxlOiB0aGF0LmFkZHJlc3MubW9iaWxlLFxuICAgICAgICAgIGNvZGU6IHRoYXQuYWRkcmVzcy5jb2RlLFxuICAgICAgICAgIHJlbWFyazogdGhhdC5yZW1hcmssXG4gICAgICAgICAgY291cG9uSWQ6IHRoYXQuY291cG9uc0lkLFxuICAgICAgICAgIGV4cGlyZU1pbnV0ZXM6IDMwLFxuICAgICAgICAgIGdvb2RzSnNvblN0cjogZ29vZHNKc29uU3RyXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgIGtleTogdGhhdC50eXBlLFxuICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvb3JkZXItbGlzdD9pbmRleD0wJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=