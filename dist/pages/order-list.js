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

var OrderList = function (_wepy$page) {
  _inherits(OrderList, _wepy$page);

  function OrderList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单列表',
      usingComponents: {
        'wxc-tab': '../../packages/@minui/wxc-tab/dist/index',
        'wxc-tab-panel': '../../packages/@minui/wxc-tab/dist/panel'
      }
    }, _this.data = {
      tabs: ['代付款', '待发货', '待收货', '待评价', '已完成'],
      orders: [], //每个订单信息
      goods: null, // 每个订单对应的商品信息
      logisticsMap: null, // 物流信息
      activeIndex: 0,
      activeArray: []
    }, _this.methods = {
      cancleOrder: function cancleOrder(order) {
        var that = this;
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/close',
          data: {
            token: that.$parent.globalData.token,
            orderId: order.id
          },
          success: function success(res) {
            if (res.data.code == 0) {
              var orderArray = [];
              var goodArray = [];
              that.orders.forEach(function (item) {
                if (item.id !== order.id) {
                  orderArray.push(item);
                }
              });
              delete that.goods[res.id];
              that.orders = orderArray;
              that.goods = that.goods;
              that.$apply();
              wx.showToast({
                title: '删除订单成功',
                icon: 'success',
                duration: 500
              });
              that.requestAll();
            }
          }
        });
      },
      payOrder: function payOrder(order) {
        var that = this;
        var remark = "在线充值";
        var nextAction = {};
        if (order.id != 0) {
          remark = "支付订单 ：" + order.id;
          nextAction = { type: 0, id: order.id };
        }
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/pay/wxapp/get-pay-data',
          data: {
            token: that.$parent.globalData.token,
            money: order.money,
            remark: remark,
            payName: "在线支付",
            nextAction: nextAction
          },
          //method:'POST',
          success: function success(res) {
            console.log(res.data);
            if (res.data.code == 0) {
              // 发起支付
              wx.requestPayment({
                timeStamp: res.data.data.timeStamp,
                nonceStr: res.data.data.nonceStr,
                package: 'prepay_id=' + res.data.data.prepayId,
                signType: 'MD5',
                paySign: res.data.data.sign,
                fail: function fail(aaa) {
                  wx.showToast({ title: '支付失败:' + aaa });
                },
                success: function success() {
                  wx.showToast({ title: '支付成功' });
                  that.show(1);
                  that.requestAll();
                }
              });
            } else {
              wx.showToast({ title: '服务器忙' + res.data.code });
            }
          }
        });
      },
      changeIndex: function changeIndex(index) {
        this.activeIndex = index;
        wx.showLoading({});
        this.show(index);
      },
      recommendOrder: function recommendOrder(order) {
        wx.navigateTo({
          url: '/pages/order-reputation?order=' + JSON.stringify(order) + '&goods=' + JSON.stringify(this.goods[order.id])
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderList, [{
    key: 'onLoad',
    value: function onLoad(e) {
      this.activeIndex = e.index;
      wx.showLoading({});
      this.show(e.index);
      this.requestAll();
    }
  }, {
    key: 'show',
    value: function show(type) {
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/list',
        data: {
          token: that.$parent.globalData.token,
          status: type
        },
        success: function success(res) {
          if (res.data.code == 0) {
            that.orders = res.data.data.orderList;
            that.goods = res.data.data.goodsMap;
            that.logisticsMap = res.data.data.logisticsMap;
            that.$apply();
            wx.hideLoading({});
            console.log(res.data);
          } else {
            that.orders = [];
            that.goods = null;
            that.logisticsMap = null;
            that.$apply();
            wx.hideLoading({});
          }
        }
      });
    }
  }, {
    key: 'requestAll',
    value: function requestAll() {
      this.activeArray = Array.from({ length: 5 }).fill(false);
      var that = this;
      _wepy2.default.request({
        url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/order/list',
        data: {
          token: that.$parent.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 0) {
            res.data.data.orderList.forEach(function (item) {
              that.activeArray[item.status] = true;
            });
            that.activeArray[4] = false;
            that.$apply();
          }
        }
      });
    }
  }]);

  return OrderList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderList , 'pages/order-list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLWxpc3QuanMiXSwibmFtZXMiOlsiT3JkZXJMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImRhdGEiLCJ0YWJzIiwib3JkZXJzIiwiZ29vZHMiLCJsb2dpc3RpY3NNYXAiLCJhY3RpdmVJbmRleCIsImFjdGl2ZUFycmF5IiwibWV0aG9kcyIsImNhbmNsZU9yZGVyIiwib3JkZXIiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJvcmRlcklkIiwiaWQiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIm9yZGVyQXJyYXkiLCJnb29kQXJyYXkiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCIkYXBwbHkiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwicmVxdWVzdEFsbCIsInBheU9yZGVyIiwicmVtYXJrIiwibmV4dEFjdGlvbiIsInR5cGUiLCJtb25leSIsInBheU5hbWUiLCJjb25zb2xlIiwibG9nIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJwcmVwYXlJZCIsInNpZ25UeXBlIiwicGF5U2lnbiIsInNpZ24iLCJmYWlsIiwiYWFhIiwic2hvdyIsImNoYW5nZUluZGV4IiwiaW5kZXgiLCJzaG93TG9hZGluZyIsInJlY29tbWVuZE9yZGVyIiwibmF2aWdhdGVUbyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlIiwic3RhdHVzIiwib3JkZXJMaXN0IiwiZ29vZHNNYXAiLCJoaWRlTG9hZGluZyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlC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LE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBbEQsR0FBOEQsYUFEeEQ7QUFFWGYsY0FBTTtBQUNKZ0IsaUJBQU9OLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkU7QUFEM0IsU0FGSztBQUtYRyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGNBQUdBLElBQUlwQixJQUFKLENBQVNxQixJQUFULElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCRCxnQkFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjOEQsU0FBZCxDQUF3QnRDLE9BQXhCLENBQWdDLFVBQUNDLElBQUQsRUFBVTtBQUN4Q2YsbUJBQUtKLFdBQUwsQ0FBaUJtQixLQUFLb0MsTUFBdEIsSUFBZ0MsSUFBaEM7QUFDRCxhQUZEO0FBR0FuRCxpQkFBS0osV0FBTCxDQUFpQixDQUFqQixJQUFzQixLQUF0QjtBQUNBSSxpQkFBS2lCLE1BQUw7QUFDRDtBQUNGO0FBYlUsT0FBYjtBQWVEOzs7O0VBeEpvQyxlQUFLMEMsSTs7a0JBQXZCekUsUyIsImZpbGUiOiJvcmRlci1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy10YWInOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10YWIvZGlzdC9pbmRleCcsXG4gICAgICAnd3hjLXRhYi1wYW5lbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRhYi9kaXN0L3BhbmVsJ1xuICAgIH1cbiAgfVxuICBkYXRhID0ge1xuICAgIHRhYnM6IFsn5Luj5LuY5qy+JywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5b6F6K+E5Lu3JywgJ+W3suWujOaIkCddLFxuICAgIG9yZGVyczogW10sIC8v5q+P5Liq6K6i5Y2V5L+h5oGvXG4gICAgZ29vZHM6IG51bGwsICAvLyDmr4/kuKrorqLljZXlr7nlupTnmoTllYblk4Hkv6Hmga9cbiAgICBsb2dpc3RpY3NNYXA6IG51bGwsIC8vIOeJqea1geS/oeaBr1xuICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgIGFjdGl2ZUFycmF5OiBbXVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IGUuaW5kZXhcbiAgICB3eC5zaG93TG9hZGluZyh7fSlcbiAgICB0aGlzLnNob3coZS5pbmRleClcbiAgICB0aGlzLnJlcXVlc3RBbGwoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2FuY2xlT3JkZXIob3JkZXIpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9jbG9zZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgICAgb3JkZXJJZDogb3JkZXIuaWRcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlckFycmF5ID0gW11cbiAgICAgICAgICAgIGNvbnN0IGdvb2RBcnJheSA9IFtdXG4gICAgICAgICAgICB0aGF0Lm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGl0ZW0uaWQgIT09IG9yZGVyLmlkKSB7XG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKGl0ZW0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkZWxldGUgdGhhdC5nb29kc1tyZXMuaWRdXG4gICAgICAgICAgICB0aGF0Lm9yZGVycyA9IG9yZGVyQXJyYXlcbiAgICAgICAgICAgIHRoYXQuZ29vZHMgPSB0aGF0Lmdvb2RzXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOiuouWNleaIkOWKnycsXG4gICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoYXQucmVxdWVzdEFsbCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgcGF5T3JkZXIob3JkZXIpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICBsZXQgcmVtYXJrID0gXCLlnKjnur/lhYXlgLxcIjtcbiAgICAgIGxldCBuZXh0QWN0aW9uID0ge307XG4gICAgICBpZiAob3JkZXIuaWQgIT0gMCkge1xuICAgICAgICByZW1hcmsgPSBcIuaUr+S7mOiuouWNlSDvvJpcIiArIG9yZGVyLmlkO1xuICAgICAgICBuZXh0QWN0aW9uID0geyB0eXBlOiAwLCBpZDogb3JkZXIuaWQgfTtcbiAgICAgIH1cbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycgKyB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3BheS93eGFwcC9nZXQtcGF5LWRhdGEnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICAgIG1vbmV5OiBvcmRlci5tb25leSxcbiAgICAgICAgICByZW1hcms6IHJlbWFyayxcbiAgICAgICAgICBwYXlOYW1lOlwi5Zyo57q/5pSv5LuYXCIsXG4gICAgICAgICAgbmV4dEFjdGlvbjogbmV4dEFjdGlvblxuICAgICAgICB9LFxuICAgICAgICAvL21ldGhvZDonUE9TVCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKXtcbiAgICAgICAgICAgIC8vIOWPkei1t+aUr+S7mFxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICB0aW1lU3RhbXA6cmVzLmRhdGEuZGF0YS50aW1lU3RhbXAsXG4gICAgICAgICAgICAgIG5vbmNlU3RyOnJlcy5kYXRhLmRhdGEubm9uY2VTdHIsXG4gICAgICAgICAgICAgIHBhY2thZ2U6J3ByZXBheV9pZD0nICsgcmVzLmRhdGEuZGF0YS5wcmVwYXlJZCxcbiAgICAgICAgICAgICAgc2lnblR5cGU6J01ENScsXG4gICAgICAgICAgICAgIHBheVNpZ246cmVzLmRhdGEuZGF0YS5zaWduLFxuICAgICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChhYWEpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5pSv5LuY5aSx6LSlOicgKyBhYWF9KVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5pSv5LuY5oiQ5YqfJ30pXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93KDEpXG4gICAgICAgICAgICAgICAgdGhhdC5yZXF1ZXN0QWxsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfmnI3liqHlmajlv5knICsgcmVzLmRhdGEuY29kZX0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlSW5kZXgoaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleFxuICAgICAgd3guc2hvd0xvYWRpbmcoe30pXG4gICAgICB0aGlzLnNob3coaW5kZXgpXG4gICAgfSxcbiAgICByZWNvbW1lbmRPcmRlcihvcmRlcikge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9vcmRlci1yZXB1dGF0aW9uP29yZGVyPScgKyBKU09OLnN0cmluZ2lmeShvcmRlcikgKyAnJmdvb2RzPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmdvb2RzW29yZGVyLmlkXSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNob3cgKHR5cGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICBzdGF0dXM6IHR5cGVcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHRoYXQub3JkZXJzID0gcmVzLmRhdGEuZGF0YS5vcmRlckxpc3RcbiAgICAgICAgICB0aGF0Lmdvb2RzID0gcmVzLmRhdGEuZGF0YS5nb29kc01hcFxuICAgICAgICAgIHRoYXQubG9naXN0aWNzTWFwID0gcmVzLmRhdGEuZGF0YS5sb2dpc3RpY3NNYXBcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoe30pXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5vcmRlcnMgPSBbXVxuICAgICAgICAgIHRoYXQuZ29vZHMgPSBudWxsXG4gICAgICAgICAgdGhhdC5sb2dpc3RpY3NNYXAgPSBudWxsXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKHt9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZXF1ZXN0QWxsICgpIHtcbiAgICB0aGlzLmFjdGl2ZUFycmF5ID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA1fSkuZmlsbChmYWxzZSlcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgcmVzLmRhdGEuZGF0YS5vcmRlckxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhhdC5hY3RpdmVBcnJheVtpdGVtLnN0YXR1c10gPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGF0LmFjdGl2ZUFycmF5WzRdID0gZmFsc2VcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=