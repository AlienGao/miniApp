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
        var nextAction = {};
        var remark = '';
        if (order.id != 0) {
          remark = "支付订单 ：" + order.id;
          nextAction = JSON.stringify({ "type": 0, "id": order.id });
        }
        _wepy2.default.request({
          url: 'https://api.it120.cc/' + that.$parent.globalData.subDomain + '/pay/wxapp/get-pay-data',
          data: {
            token: that.$parent.globalData.token,
            money: order.amountReal,
            remark: remark,
            payName: "在线支付",
            nextAction: nextAction
          },
          //method:'POST',
          success: function success(res) {
            // console.log(res.data)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLWxpc3QuanMiXSwibmFtZXMiOlsiT3JkZXJMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImRhdGEiLCJ0YWJzIiwib3JkZXJzIiwiZ29vZHMiLCJsb2dpc3RpY3NNYXAiLCJhY3RpdmVJbmRleCIsImFjdGl2ZUFycmF5IiwibWV0aG9kcyIsImNhbmNsZU9yZGVyIiwib3JkZXIiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3ViRG9tYWluIiwidG9rZW4iLCJvcmRlcklkIiwiaWQiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIm9yZGVyQXJyYXkiLCJnb29kQXJyYXkiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCIkYXBwbHkiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwicmVxdWVzdEFsbCIsInBheU9yZGVyIiwibmV4dEFjdGlvbiIsInJlbWFyayIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb25leSIsImFtb3VudFJlYWwiLCJwYXlOYW1lIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJwcmVwYXlJZCIsInNpZ25UeXBlIiwicGF5U2lnbiIsInNpZ24iLCJmYWlsIiwiYWFhIiwic2hvdyIsImNoYW5nZUluZGV4IiwiaW5kZXgiLCJzaG93TG9hZGluZyIsInJlY29tbWVuZE9yZGVyIiwibmF2aWdhdGVUbyIsImUiLCJ0eXBlIiwic3RhdHVzIiwib3JkZXJMaXN0IiwiZ29vZHNNYXAiLCJoaWRlTG9hZGluZyIsImNvbnNvbGUiLCJsb2ciLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpC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QUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBbEQsR0FBOEQsYUFEeEQ7QUFFWGYsY0FBTTtBQUNKZ0IsaUJBQU9OLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkU7QUFEM0IsU0FGSztBQUtYRyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGNBQUdBLElBQUlwQixJQUFKLENBQVNxQixJQUFULElBQWlCLENBQXBCLEVBQXVCO0FBQ3JCRCxnQkFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjNkQsU0FBZCxDQUF3QnJDLE9BQXhCLENBQWdDLFVBQUNDLElBQUQsRUFBVTtBQUN4Q2YsbUJBQUtKLFdBQUwsQ0FBaUJtQixLQUFLbUMsTUFBdEIsSUFBZ0MsSUFBaEM7QUFDRCxhQUZEO0FBR0FsRCxpQkFBS0osV0FBTCxDQUFpQixDQUFqQixJQUFzQixLQUF0QjtBQUNBSSxpQkFBS2lCLE1BQUw7QUFDRDtBQUNGO0FBYlUsT0FBYjtBQWVEOzs7O0VBeEpvQyxlQUFLMkMsSTs7a0JBQXZCMUUsUyIsImZpbGUiOiJvcmRlci1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXliJfooagnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy10YWInOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy10YWIvZGlzdC9pbmRleCcsXG4gICAgICAnd3hjLXRhYi1wYW5lbCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRhYi9kaXN0L3BhbmVsJ1xuICAgIH1cbiAgfVxuICBkYXRhID0ge1xuICAgIHRhYnM6IFsn5Luj5LuY5qy+JywgJ+W+heWPkei0pycsICflvoXmlLbotKcnLCAn5b6F6K+E5Lu3JywgJ+W3suWujOaIkCddLFxuICAgIG9yZGVyczogW10sIC8v5q+P5Liq6K6i5Y2V5L+h5oGvXG4gICAgZ29vZHM6IG51bGwsICAvLyDmr4/kuKrorqLljZXlr7nlupTnmoTllYblk4Hkv6Hmga9cbiAgICBsb2dpc3RpY3NNYXA6IG51bGwsIC8vIOeJqea1geS/oeaBr1xuICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgIGFjdGl2ZUFycmF5OiBbXVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IGUuaW5kZXhcbiAgICB3eC5zaG93TG9hZGluZyh7fSlcbiAgICB0aGlzLnNob3coZS5pbmRleClcbiAgICB0aGlzLnJlcXVlc3RBbGwoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2FuY2xlT3JkZXIob3JkZXIpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9jbG9zZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0b2tlbjogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudG9rZW4sXG4gICAgICAgICAgb3JkZXJJZDogb3JkZXIuaWRcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlckFycmF5ID0gW11cbiAgICAgICAgICAgIGNvbnN0IGdvb2RBcnJheSA9IFtdXG4gICAgICAgICAgICB0aGF0Lm9yZGVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGl0ZW0uaWQgIT09IG9yZGVyLmlkKSB7XG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKGl0ZW0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkZWxldGUgdGhhdC5nb29kc1tyZXMuaWRdXG4gICAgICAgICAgICB0aGF0Lm9yZGVycyA9IG9yZGVyQXJyYXlcbiAgICAgICAgICAgIHRoYXQuZ29vZHMgPSB0aGF0Lmdvb2RzXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOiuouWNleaIkOWKnycsXG4gICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoYXQucmVxdWVzdEFsbCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgcGF5T3JkZXIob3JkZXIpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICBsZXQgbmV4dEFjdGlvbiA9IHt9O1xuICAgICAgbGV0IHJlbWFyayA9ICcnO1xuICAgICAgaWYgKG9yZGVyLmlkICE9IDApIHtcbiAgICAgICAgcmVtYXJrID0gXCLmlK/ku5jorqLljZUg77yaXCIgKyBvcmRlci5pZDtcbiAgICAgICAgbmV4dEFjdGlvbiA9IEpTT04uc3RyaW5naWZ5KHsgXCJ0eXBlXCI6IDAsIFwiaWRcIjogb3JkZXIuaWQgfSk7XG4gICAgICB9XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9wYXkvd3hhcHAvZ2V0LXBheS1kYXRhJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS50b2tlbixcbiAgICAgICAgICBtb25leTogb3JkZXIuYW1vdW50UmVhbCxcbiAgICAgICAgICByZW1hcms6IHJlbWFyayxcbiAgICAgICAgICBwYXlOYW1lOlwi5Zyo57q/5pSv5LuYXCIsXG4gICAgICAgICAgbmV4dEFjdGlvbjogbmV4dEFjdGlvblxuICAgICAgICB9LFxuICAgICAgICAvL21ldGhvZDonUE9TVCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKXtcbiAgICAgICAgICAgIC8vIOWPkei1t+aUr+S7mFxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgICB0aW1lU3RhbXA6cmVzLmRhdGEuZGF0YS50aW1lU3RhbXAsXG4gICAgICAgICAgICAgIG5vbmNlU3RyOnJlcy5kYXRhLmRhdGEubm9uY2VTdHIsXG4gICAgICAgICAgICAgIHBhY2thZ2U6J3ByZXBheV9pZD0nICsgcmVzLmRhdGEuZGF0YS5wcmVwYXlJZCxcbiAgICAgICAgICAgICAgc2lnblR5cGU6J01ENScsXG4gICAgICAgICAgICAgIHBheVNpZ246cmVzLmRhdGEuZGF0YS5zaWduLFxuICAgICAgICAgICAgICBmYWlsOmZ1bmN0aW9uIChhYWEpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5pSv5LuY5aSx6LSlOicgKyBhYWF9KVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5pSv5LuY5oiQ5YqfJ30pXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93KDEpXG4gICAgICAgICAgICAgICAgdGhhdC5yZXF1ZXN0QWxsKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfmnI3liqHlmajlv5knICsgcmVzLmRhdGEuY29kZX0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlSW5kZXgoaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleFxuICAgICAgd3guc2hvd0xvYWRpbmcoe30pXG4gICAgICB0aGlzLnNob3coaW5kZXgpXG4gICAgfSxcbiAgICByZWNvbW1lbmRPcmRlcihvcmRlcikge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9vcmRlci1yZXB1dGF0aW9uP29yZGVyPScgKyBKU09OLnN0cmluZ2lmeShvcmRlcikgKyAnJmdvb2RzPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmdvb2RzW29yZGVyLmlkXSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHNob3cgKHR5cGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgICBzdGF0dXM6IHR5cGVcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAgICAgICAgIHRoYXQub3JkZXJzID0gcmVzLmRhdGEuZGF0YS5vcmRlckxpc3RcbiAgICAgICAgICB0aGF0Lmdvb2RzID0gcmVzLmRhdGEuZGF0YS5nb29kc01hcFxuICAgICAgICAgIHRoYXQubG9naXN0aWNzTWFwID0gcmVzLmRhdGEuZGF0YS5sb2dpc3RpY3NNYXBcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoe30pXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5vcmRlcnMgPSBbXVxuICAgICAgICAgIHRoYXQuZ29vZHMgPSBudWxsXG4gICAgICAgICAgdGhhdC5sb2dpc3RpY3NNYXAgPSBudWxsXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKHt9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZXF1ZXN0QWxsICgpIHtcbiAgICB0aGlzLmFjdGl2ZUFycmF5ID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiA1fSkuZmlsbChmYWxzZSlcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuc3ViRG9tYWluICsgJy9vcmRlci9saXN0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW46IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnRva2VuLFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgcmVzLmRhdGEuZGF0YS5vcmRlckxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhhdC5hY3RpdmVBcnJheVtpdGVtLnN0YXR1c10gPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGF0LmFjdGl2ZUFycmF5WzRdID0gZmFsc2VcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=